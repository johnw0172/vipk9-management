import { z } from "zod";

// Enhanced validation schemas for VIP Elite K9s
export const secureLoginSchema = z.object({
  username: z.string()
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username too long")
    .regex(/^[a-zA-Z0-9_-]+$/, "Username can only contain letters, numbers, underscores, and hyphens"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password too long")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain uppercase, lowercase, and number"),
});

export const staffPinSchema = z.object({
  pin: z.string()
    .length(4, "PIN must be exactly 4 digits")
    .regex(/^\d{4}$/, "PIN must contain only numbers"),
});

export const clientRegistrationSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name too long")
    .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, apostrophes, and hyphens"),
  email: z.string()
    .email("Please enter a valid email address")
    .max(255, "Email too long"),
  phone: z.string()
    .regex(/^(\+44|0)[1-9]\d{8,10}$/, "Please enter a valid UK phone number")
    .optional(),
  address: z.string()
    .min(10, "Please enter a complete address")
    .max(500, "Address too long")
    .optional(),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password too long")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain uppercase, lowercase, and number"),
});

export const dogProfileSchema = z.object({
  name: z.string()
    .min(1, "Dog name is required")
    .max(50, "Name too long")
    .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, apostrophes, and hyphens"),
  breed: z.string()
    .min(2, "Breed is required")
    .max(100, "Breed name too long"),
  age: z.number()
    .int()
    .min(0, "Age cannot be negative")
    .max(30, "Please verify the age")
    .optional(),
  weight: z.string()
    .regex(/^\d+(\.\d{1,2})?\s*(kg|lbs?)$/i, "Weight must be in format '25.5 kg' or '55 lbs'")
    .optional(),
  feedingInstructions: z.string()
    .max(1000, "Feeding instructions too long")
    .optional(),
  medication: z.string()
    .max(1000, "Medication details too long")
    .optional(),
  allergies: z.string()
    .max(500, "Allergy information too long")
    .optional(),
  behaviorNotes: z.string()
    .max(1000, "Behavior notes too long")
    .optional(),
  vetInfo: z.string()
    .max(500, "Vet information too long")
    .optional(),
  emergencyContact: z.string()
    .max(200, "Emergency contact too long")
    .optional(),
  exerciseRequirements: z.string()
    .max(500, "Exercise requirements too long")
    .optional(),
});

export const bookingSchema = z.object({
  serviceType: z.enum(["training", "walking", "boarding"], {
    errorMap: () => ({ message: "Please select a valid service type" })
  }),
  startDate: z.date({
    required_error: "Start date is required",
    invalid_type_error: "Please enter a valid date",
  }).refine((date) => date >= new Date(), {
    message: "Start date cannot be in the past",
  }),
  endDate: z.date().optional(),
  notes: z.string()
    .max(1000, "Notes too long")
    .optional(),
  dogId: z.number()
    .int()
    .positive("Please select a valid dog"),
}).refine((data) => {
  if (data.serviceType === "boarding" && data.endDate) {
    return data.endDate > data.startDate;
  }
  return true;
}, {
  message: "End date must be after start date",
  path: ["endDate"],
});

export const invoiceSchema = z.object({
  clientId: z.number()
    .int()
    .positive("Please select a valid client"),
  amount: z.number()
    .positive("Amount must be greater than 0")
    .max(10000, "Amount seems unusually high - please verify"),
  description: z.string()
    .min(5, "Please provide a description")
    .max(500, "Description too long"),
  dueDate: z.date({
    required_error: "Due date is required",
    invalid_type_error: "Please enter a valid date",
  }).refine((date) => date >= new Date(), {
    message: "Due date cannot be in the past",
  }),
});

export const jobSchema = z.object({
  type: z.string()
    .min(2, "Job type is required")
    .max(50, "Job type too long"),
  description: z.string()
    .min(5, "Please provide a description")
    .max(500, "Description too long"),
  scheduledDate: z.date({
    required_error: "Scheduled date is required",
    invalid_type_error: "Please enter a valid date",
  }),
  assignedStaffId: z.number()
    .int()
    .positive("Please assign to a valid staff member")
    .optional(),
  dogId: z.number()
    .int()
    .positive("Please select a valid dog")
    .optional(),
  notes: z.string()
    .max(1000, "Notes too long")
    .optional(),
});

// Security utilities
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>\"'&]/g, '') // Remove potentially dangerous characters
    .slice(0, 1000); // Limit length
};

export const validateFileUpload = (file: File): { valid: boolean; error?: string } => {
  // File size limit: 5MB
  if (file.size > 5 * 1024 * 1024) {
    return { valid: false, error: "File size must be less than 5MB" };
  }

  // Allowed image types
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: "Only JPEG, PNG, and WebP images are allowed" };
  }

  return { valid: true };
};

export const generateSecureId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

// Rate limiting helper
export const createRateLimiter = (maxRequests: number, windowMs: number) => {
  const requests = new Map<string, number[]>();
  
  return (identifier: string): boolean => {
    const now = Date.now();
    const userRequests = requests.get(identifier) || [];
    
    // Remove expired requests
    const validRequests = userRequests.filter(time => now - time < windowMs);
    
    if (validRequests.length >= maxRequests) {
      return false; // Rate limit exceeded
    }
    
    validRequests.push(now);
    requests.set(identifier, validRequests);
    return true;
  };
};