import type { Express } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { storage } from "./storage-database";
import { insertStaffSchema, insertStaffTaskSchema, insertStaffBookingSchema } from "@shared/schema";

const JWT_SECRET = process.env.JWT_SECRET || "staff-portal-secret-key";

// Staff authentication middleware
export const authenticateStaff = (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    req.staff = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export function registerStaffRoutes(app: Express) {
  
  // Staff login with PIN authentication
  app.post("/api/staff/login", async (req, res) => {
    try {
      const { staffId, pin } = req.body;
      
      if (!staffId || !pin) {
        return res.status(400).json({ message: "Staff ID and PIN required" });
      }
      
      const staff = await storage.getStaff(parseInt(staffId));
      if (!staff) {
        return res.status(404).json({ message: "Staff member not found" });
      }
      
      // Compare PIN with hashed PIN
      const validPin = await bcrypt.compare(pin, staff.pin);
      if (!validPin) {
        return res.status(401).json({ message: "Invalid PIN" });
      }
      
      // Generate JWT token
      const token = jwt.sign(
        { staffId: staff.id, name: staff.name, role: staff.role },
        JWT_SECRET,
        { expiresIn: '8h' }
      );
      
      res.json({
        token,
        staff: {
          id: staff.id,
          name: staff.name,
          role: staff.role,
          profilePhoto: staff.profilePhoto,
          status: staff.status
        }
      });
    } catch (error) {
      console.error("Staff login error:", error);
      res.status(500).json({ message: "Login failed" });
    }
  });
  
  // Get staff profile
  app.get("/api/staff/profile", authenticateStaff, async (req: any, res) => {
    try {
      const staff = await storage.getStaff(req.staff.staffId);
      if (!staff) {
        return res.status(404).json({ message: "Staff member not found" });
      }
      
      res.json(staff);
    } catch (error) {
      console.error("Error fetching staff profile:", error);
      res.status(500).json({ message: "Failed to fetch profile" });
    }
  });
  
  // Get tasks assigned to staff member
  app.get("/api/staff/tasks", authenticateStaff, async (req: any, res) => {
    try {
      const tasks = await storage.getStaffTasks(req.staff.staffId);
      res.json(tasks);
    } catch (error) {
      console.error("Error fetching staff tasks:", error);
      res.status(500).json({ message: "Failed to fetch tasks" });
    }
  });
  
  // Update task status and add notes
  app.patch("/api/staff/tasks/:taskId", authenticateStaff, async (req: any, res) => {
    try {
      const { taskId } = req.params;
      const { status, notes } = req.body;
      
      const task = await storage.updateStaffTask(parseInt(taskId), {
        status,
        notes,
        completedDate: status === 'completed' ? new Date() : undefined
      });
      
      res.json(task);
    } catch (error) {
      console.error("Error updating task:", error);
      res.status(500).json({ message: "Failed to update task" });
    }
  });
  
  // Get bookings assigned to staff member
  app.get("/api/staff/bookings", authenticateStaff, async (req: any, res) => {
    try {
      const bookings = await storage.getStaffBookings(req.staff.staffId);
      res.json(bookings);
    } catch (error) {
      console.error("Error fetching staff bookings:", error);
      res.status(500).json({ message: "Failed to fetch bookings" });
    }
  });
  
  // Admin routes for staff management
  
  // Create new staff member (Admin only)
  app.post("/api/admin/staff", async (req, res) => {
    try {
      const validatedData = insertStaffSchema.parse(req.body);
      
      // Hash the PIN
      const hashedPin = await bcrypt.hash(validatedData.pin, 10);
      
      const staff = await storage.createStaff({
        ...validatedData,
        pin: hashedPin
      });
      
      res.json(staff);
    } catch (error) {
      console.error("Error creating staff:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create staff" });
    }
  });
  
  // Update staff member (Admin only)
  app.patch("/api/admin/staff/:staffId", async (req, res) => {
    try {
      const { staffId } = req.params;
      const updates = req.body;
      
      // Hash PIN if provided
      if (updates.pin) {
        updates.pin = await bcrypt.hash(updates.pin, 10);
      }
      
      const staff = await storage.updateStaff(parseInt(staffId), updates);
      res.json(staff);
    } catch (error) {
      console.error("Error updating staff:", error);
      res.status(500).json({ message: "Failed to update staff" });
    }
  });
  
  // Assign task to staff member (Admin only)
  app.post("/api/admin/staff/tasks", async (req, res) => {
    try {
      const validatedData = insertStaffTaskSchema.parse(req.body);
      const task = await storage.createStaffTask(validatedData);
      res.json(task);
    } catch (error) {
      console.error("Error creating staff task:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create task" });
    }
  });
  
  // Assign staff to booking (Admin only)
  app.post("/api/admin/staff/bookings", async (req, res) => {
    try {
      const validatedData = insertStaffBookingSchema.parse(req.body);
      const assignment = await storage.assignStaffToBooking(validatedData);
      res.json(assignment);
    } catch (error) {
      console.error("Error assigning staff to booking:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to assign staff" });
    }
  });
  
  // Get all staff tasks for admin overview
  app.get("/api/admin/staff/tasks", async (req, res) => {
    try {
      const tasks = await storage.getAllStaffTasks();
      res.json(tasks);
    } catch (error) {
      console.error("Error fetching all staff tasks:", error);
      res.status(500).json({ message: "Failed to fetch tasks" });
    }
  });
}