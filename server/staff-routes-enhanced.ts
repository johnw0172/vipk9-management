import { Express } from "express";
import bcrypt from "bcrypt";
import { storage } from "./storage-database";

export function registerStaffRoutes(app: Express) {
  
  // PIN Authentication endpoint
  app.post("/api/staff/authenticate", async (req, res) => {
    try {
      const { staffId, pin } = req.body;
      
      if (!staffId || !pin) {
        return res.status(400).json({ message: "Staff ID and PIN required" });
      }

      const staff = await storage.getStaff(staffId);
      if (!staff) {
        return res.status(404).json({ message: "Staff member not found" });
      }

      // Compare PIN (assuming PINs are hashed in database)
      const pinMatch = await bcrypt.compare(pin, staff.pin || '');
      if (!pinMatch) {
        return res.status(401).json({ message: "Invalid PIN" });
      }

      // Update staff status to clocked_in
      await storage.updateStaffStatus(staffId, 'clocked_in');
      
      res.json({ 
        success: true, 
        staff: { ...staff, pin: undefined } // Don't send PIN back
      });
    } catch (error) {
      console.error("PIN authentication error:", error);
      res.status(500).json({ message: "Authentication failed" });
    }
  });

  // Update staff information including PIN
  app.patch("/api/staff/:id", async (req, res) => {
    try {
      const staffId = parseInt(req.params.id);
      const updates = req.body;

      // Hash PIN if provided
      if (updates.pin) {
        updates.pin = await bcrypt.hash(updates.pin, 10);
      }

      // Convert hourly rate to pence if provided
      if (updates.hourlyRate) {
        updates.hourlyRate = Math.round(updates.hourlyRate * 100);
      }

      const updatedStaff = await storage.updateStaff(staffId, updates);
      res.json(updatedStaff);
    } catch (error) {
      console.error("Update staff error:", error);
      res.status(500).json({ message: "Failed to update staff" });
    }
  });

  // Clock in/out endpoints
  app.post("/api/staff/:id/clock-in", async (req, res) => {
    try {
      const staffId = parseInt(req.params.id);
      const result = await storage.clockInStaff(staffId);
      res.json(result);
    } catch (error) {
      console.error("Clock in error:", error);
      res.status(500).json({ message: "Failed to clock in" });
    }
  });

  app.post("/api/staff/:id/clock-out", async (req, res) => {
    try {
      const staffId = parseInt(req.params.id);
      const result = await storage.clockOutStaff(staffId);
      res.json(result);
    } catch (error) {
      console.error("Clock out error:", error);
      res.status(500).json({ message: "Failed to clock out" });
    }
  });

  app.post("/api/staff/:id/break-start", async (req, res) => {
    try {
      const staffId = parseInt(req.params.id);
      const result = await storage.startBreak(staffId);
      res.json(result);
    } catch (error) {
      console.error("Start break error:", error);
      res.status(500).json({ message: "Failed to start break" });
    }
  });

  app.post("/api/staff/:id/break-end", async (req, res) => {
    try {
      const staffId = parseInt(req.params.id);
      const result = await storage.endBreak(staffId);
      res.json(result);
    } catch (error) {
      console.error("End break error:", error);
      res.status(500).json({ message: "Failed to end break" });
    }
  });

  // Kennel assignment endpoints
  app.get("/api/kennel-assignments", async (req, res) => {
    try {
      const { date, staffId } = req.query;
      const assignments = await storage.getKennelAssignments({
        date: date as string,
        staffId: staffId ? parseInt(staffId as string) : undefined
      });
      res.json(assignments);
    } catch (error) {
      console.error("Get kennel assignments error:", error);
      res.status(500).json({ message: "Failed to get assignments" });
    }
  });

  app.post("/api/kennel-assignments", async (req, res) => {
    try {
      const { staffId, kennelId, date, notes } = req.body;
      const assignment = await storage.createKennelAssignment({
        staffId,
        kennelId,
        date: new Date(date),
        notes
      });
      res.json(assignment);
    } catch (error) {
      console.error("Create kennel assignment error:", error);
      res.status(500).json({ message: "Failed to create assignment" });
    }
  });

  // Staff task endpoints
  app.get("/api/staff-tasks", async (req, res) => {
    try {
      const { staffId, date, status } = req.query;
      const tasks = await storage.getStaffTasks({
        staffId: staffId ? parseInt(staffId as string) : undefined,
        date: date as string,
        status: status as string
      });
      res.json(tasks);
    } catch (error) {
      console.error("Get staff tasks error:", error);
      res.status(500).json({ message: "Failed to get tasks" });
    }
  });

  app.post("/api/staff-tasks", async (req, res) => {
    try {
      const taskData = req.body;
      const task = await storage.createStaffTask(taskData);
      res.json(task);
    } catch (error) {
      console.error("Create staff task error:", error);
      res.status(500).json({ message: "Failed to create task" });
    }
  });

  app.patch("/api/staff-tasks/:id", async (req, res) => {
    try {
      const taskId = parseInt(req.params.id);
      const updates = req.body;
      const task = await storage.updateStaffTask(taskId, updates);
      res.json(task);
    } catch (error) {
      console.error("Update staff task error:", error);
      res.status(500).json({ message: "Failed to update task" });
    }
  });

  // Daily reports endpoints
  app.get("/api/daily-reports", async (req, res) => {
    try {
      const { date, dogId, staffId } = req.query;
      const reports = await storage.getDailyReports({
        date: date as string,
        dogId: dogId ? parseInt(dogId as string) : undefined,
        staffId: staffId ? parseInt(staffId as string) : undefined
      });
      res.json(reports);
    } catch (error) {
      console.error("Get daily reports error:", error);
      res.status(500).json({ message: "Failed to get reports" });
    }
  });

  app.post("/api/daily-reports", async (req, res) => {
    try {
      const reportData = req.body;
      const report = await storage.createDailyReport(reportData);
      res.json(report);
    } catch (error) {
      console.error("Create daily report error:", error);
      res.status(500).json({ message: "Failed to create report" });
    }
  });

  // Get staff assigned kennels for a specific date
  app.get("/api/staff/:id/assigned-kennels", async (req, res) => {
    try {
      const staffId = parseInt(req.params.id);
      const { date } = req.query;
      
      const assignedKennels = await storage.getStaffAssignedKennels(
        staffId, 
        date as string || new Date().toISOString().split('T')[0]
      );
      
      res.json(assignedKennels);
    } catch (error) {
      console.error("Get assigned kennels error:", error);
      res.status(500).json({ message: "Failed to get assigned kennels" });
    }
  });

  // Get staff schedule for today
  app.get("/api/staff/:id/schedule", async (req, res) => {
    try {
      const staffId = parseInt(req.params.id);
      const { date } = req.query;
      
      const schedule = await storage.getStaffSchedule(
        staffId,
        date as string || new Date().toISOString().split('T')[0]
      );
      
      res.json(schedule);
    } catch (error) {
      console.error("Get staff schedule error:", error);
      res.status(500).json({ message: "Failed to get schedule" });
    }
  });

  // Time tracking report
  app.get("/api/staff/time-tracking", async (req, res) => {
    try {
      const { startDate, endDate, staffId } = req.query;
      const timeData = await storage.getTimeTrackingReport({
        startDate: startDate as string,
        endDate: endDate as string,
        staffId: staffId ? parseInt(staffId as string) : undefined
      });
      res.json(timeData);
    } catch (error) {
      console.error("Get time tracking error:", error);
      res.status(500).json({ message: "Failed to get time tracking data" });
    }
  });
}