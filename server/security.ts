import type { Request, Response, NextFunction } from "express";
import { z } from "zod";

// Rate limiting storage
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Security middleware for VIP Elite K9s
export const securityMiddleware = {
  // Role-based authentication middleware
  validateAuth: (allowedRoles: string[] = []) => {
    return (req: Request, res: Response, next: NextFunction) => {
      const authHeader = req.headers.authorization;
      
      if (!authHeader) {
        return res.status(401).json({ message: "Authorization header required" });
      }
      
      try {
        const token = authHeader.split(' ')[1];
        if (!token || token === 'null' || token === 'undefined') {
          return res.status(401).json({ message: "Invalid token" });
        }
        
        // Decode token (simplified - in production use JWT)
        const userData = JSON.parse(Buffer.from(token, 'base64').toString());
        
        // Check if user role is allowed
        if (allowedRoles.length > 0 && !allowedRoles.includes(userData.role)) {
          return res.status(403).json({ 
            message: "Access denied. Insufficient permissions." 
          });
        }
        
        // Add user context to request
        (req as any).user = userData;
        next();
      } catch (error) {
        return res.status(401).json({ message: "Invalid token format" });
      }
    };
  },
  // Rate limiting
  rateLimit: (maxRequests: number = 100, windowMs: number = 15 * 60 * 1000) => {
    return (req: Request, res: Response, next: NextFunction) => {
      const clientId = req.ip || 'unknown';
      const now = Date.now();
      const windowStart = now - windowMs;
      
      let clientData = rateLimitStore.get(clientId);
      
      if (!clientData || clientData.resetTime <= now) {
        clientData = { count: 0, resetTime: now + windowMs };
      }
      
      // Clean up old entries
      if (clientData.resetTime <= windowStart) {
        clientData = { count: 0, resetTime: now + windowMs };
      }
      
      clientData.count++;
      rateLimitStore.set(clientId, clientData);
      
      if (clientData.count > maxRequests) {
        return res.status(429).json({
          error: "Too many requests",
          message: "Please wait before making more requests",
          retryAfter: Math.ceil((clientData.resetTime - now) / 1000)
        });
      }
      
      next();
    };
  },

  // Input sanitization
  sanitizeInput: (req: Request, res: Response, next: NextFunction) => {
    const sanitize = (obj: any): any => {
      if (typeof obj === 'string') {
        return obj.trim().slice(0, 10000); // Limit string length
      }
      if (Array.isArray(obj)) {
        return obj.slice(0, 100).map(sanitize); // Limit array size
      }
      if (obj && typeof obj === 'object') {
        const sanitized: any = {};
        for (const [key, value] of Object.entries(obj)) {
          if (typeof key === 'string' && key.length <= 100) {
            sanitized[key] = sanitize(value);
          }
        }
        return sanitized;
      }
      return obj;
    };

    if (req.body) {
      req.body = sanitize(req.body);
    }
    if (req.query) {
      req.query = sanitize(req.query);
    }
    
    next();
  },

  // Validate request body against schema
  validateBody: (schema: z.ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = schema.safeParse(req.body);
        if (!result.success) {
          return res.status(400).json({
            error: "Validation failed",
            details: result.error.errors.map(err => ({
              field: err.path.join('.'),
              message: err.message
            }))
          });
        }
        req.body = result.data;
        next();
      } catch (error) {
        res.status(400).json({
          error: "Invalid request data",
          message: "Please check your input and try again"
        });
      }
    };
  },

  // Security headers
  securityHeaders: (req: Request, res: Response, next: NextFunction) => {
    // Prevent clickjacking
    res.setHeader('X-Frame-Options', 'DENY');
    
    // Prevent MIME type sniffing
    res.setHeader('X-Content-Type-Options', 'nosniff');
    
    // XSS protection
    res.setHeader('X-XSS-Protection', '1; mode=block');
    
    // Referrer policy
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    // Content Security Policy
    res.setHeader('Content-Security-Policy', 
      "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
      "style-src 'self' 'unsafe-inline'; " +
      "img-src 'self' data: https:; " +
      "font-src 'self' data:; " +
      "connect-src 'self';"
    );
    
    next();
  },

  // Error handling
  errorHandler: (err: any, req: Request, res: Response, next: NextFunction) => {
    // Log error (in production, use proper logging service)
    console.error('VIP Elite K9s Error:', {
      error: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
      url: req.url,
      method: req.method,
      timestamp: new Date().toISOString()
    });

    // Don't leak error details in production
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        error: "Validation Error",
        message: "Please check your input and try again",
        details: isDevelopment ? err.message : undefined
      });
    }
    
    if (err.name === 'UnauthorizedError') {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Please log in to access this resource"
      });
    }
    
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({
        error: "File Too Large",
        message: "Please upload a smaller file (max 5MB)"
      });
    }

    // Generic error response
    res.status(500).json({
      error: "Internal Server Error",
      message: "Something went wrong. Please try again or contact support.",
      details: isDevelopment ? err.message : undefined,
      timestamp: new Date().toISOString()
    });
  }
};

// Validation schemas for API endpoints
export const apiSchemas = {
  createStaff: z.object({
    name: z.string().min(2).max(100),
    role: z.string().min(2).max(50),
    pin: z.string().regex(/^\d{4}$/, "PIN must be 4 digits"),
    profilePhoto: z.string().url().optional()
  }),

  createClient: z.object({
    name: z.string().min(2).max(100),
    email: z.string().email().max(255),
    phone: z.string().regex(/^(\+44|0)[1-9]\d{8,10}$/).optional(),
    address: z.string().min(10).max(500).optional(),
    password: z.string().min(8).max(128)
  }),

  createDog: z.object({
    clientId: z.number().int().positive(),
    name: z.string().min(1).max(50),
    breed: z.string().min(2).max(100),
    age: z.number().int().min(0).max(30).optional(),
    weight: z.string().max(20).optional(),
    feedingInstructions: z.string().max(1000).optional(),
    medication: z.string().max(1000).optional(),
    allergies: z.string().max(500).optional(),
    behaviorNotes: z.string().max(1000).optional(),
    vetInfo: z.string().max(500).optional(),
    emergencyContact: z.string().max(200).optional(),
    exerciseRequirements: z.string().max(500).optional()
  }),

  createBooking: z.object({
    clientId: z.number().int().positive(),
    dogId: z.number().int().positive(),
    serviceType: z.enum(["training", "walking", "boarding"]),
    startDate: z.string().datetime(),
    endDate: z.string().datetime().optional(),
    notes: z.string().max(1000).optional(),
    totalAmount: z.number().positive().max(10000).optional()
  }),

  createJob: z.object({
    type: z.string().min(2).max(50),
    description: z.string().min(5).max(500),
    scheduledDate: z.string().datetime(),
    assignedStaffId: z.number().int().positive().optional(),
    dogId: z.number().int().positive().optional(),
    kennelId: z.number().int().positive().optional(),
    notes: z.string().max(1000).optional()
  }),

  createInvoice: z.object({
    clientId: z.number().int().positive(),
    amount: z.number().positive().max(10000),
    description: z.string().min(5).max(500),
    dueDate: z.string().datetime(),
    bookingId: z.number().int().positive().optional()
  }),

  updateKennel: z.object({
    status: z.enum(["available", "occupied", "cleaning"]).optional(),
    dogId: z.number().int().positive().nullable().optional(),
    checkInDate: z.string().datetime().nullable().optional(),
    checkOutDate: z.string().datetime().nullable().optional()
  }),

  staffLogin: z.object({
    pin: z.string().regex(/^\d{4}$/, "PIN must be 4 digits")
  }),

  updateStaffStatus: z.object({
    status: z.enum(["clocked_in", "on_break", "clocked_out"]),
    clockInTime: z.string().datetime().optional(),
    breakStartTime: z.string().datetime().optional(),
    lastClockOut: z.string().datetime().optional()
  })
};

// Utility functions
export const securityUtils = {
  // Generate secure random PIN
  generateSecurePin: (): string => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  },

  // Validate UK phone number
  isValidUKPhone: (phone: string): boolean => {
    return /^(\+44|0)[1-9]\d{8,10}$/.test(phone);
  },

  // Validate email format
  isValidEmail: (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 255;
  },

  // Clean filename for uploads
  sanitizeFilename: (filename: string): string => {
    return filename
      .replace(/[^a-zA-Z0-9.-]/g, '_')
      .replace(/_{2,}/g, '_')
      .slice(0, 100);
  },

  // Generate tracking ID
  generateTrackingId: (): string => {
    return 'VIP' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  }
};