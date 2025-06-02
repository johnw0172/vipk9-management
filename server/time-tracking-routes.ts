import type { Express } from "express";
import { z } from "zod";
import { storage } from "./storage-database";
import { insertStaffTimeTrackingSchema } from "@shared/schema";
import { authenticateStaff } from "./staff-routes";

export function registerTimeTrackingRoutes(app: Express) {
  
  // Clock in
  app.post("/api/staff/clock-in", authenticateStaff, async (req: any, res) => {
    try {
      const { taskId } = req.body;
      const staffId = req.staff.staffId;
      
      // Check if staff is already clocked in
      const currentStatus = await storage.getStaffStatus(staffId);
      if (currentStatus?.status === 'clocked_in') {
        return res.status(400).json({ message: "Already clocked in" });
      }
      
      // Update staff status to clocked in
      await storage.updateStaffStatus(staffId, {
        status: 'clocked_in',
        clockInTime: new Date()
      });
      
      // Create time tracking entry
      const timeEntry = await storage.createTimeEntry({
        staffId,
        clockIn: new Date(),
        associatedTaskId: taskId || null
      });
      
      res.json({ message: "Clocked in successfully", timeEntry });
    } catch (error) {
      console.error("Clock in error:", error);
      res.status(500).json({ message: "Failed to clock in" });
    }
  });
  
  // Clock out
  app.post("/api/staff/clock-out", authenticateStaff, async (req: any, res) => {
    try {
      const staffId = req.staff.staffId;
      
      // Get current time entry
      const currentEntry = await storage.getCurrentTimeEntry(staffId);
      if (!currentEntry) {
        return res.status(400).json({ message: "No active time entry found" });
      }
      
      const clockOutTime = new Date();
      const clockInTime = new Date(currentEntry.clockIn);
      
      // Calculate total hours worked (in minutes)
      const totalMinutes = Math.floor((clockOutTime.getTime() - clockInTime.getTime()) / (1000 * 60));
      const breakDuration = currentEntry.breakDuration || 0;
      const totalWorkedMinutes = totalMinutes - breakDuration;
      
      // Get staff hourly rate for wage calculation
      const staff = await storage.getStaff(staffId);
      const hourlyRatePence = staff?.hourlyRate || 0;
      const wageCalculated = Math.floor((totalWorkedMinutes / 60) * hourlyRatePence);
      
      // Update time entry
      const updatedEntry = await storage.updateTimeEntry(currentEntry.id, {
        clockOut: clockOutTime,
        totalHours: totalWorkedMinutes,
        wageCalculated
      });
      
      // Update staff status
      await storage.updateStaffStatus(staffId, {
        status: 'clocked_out',
        lastClockOut: clockOutTime,
        clockInTime: null,
        breakStartTime: null
      });
      
      res.json({ 
        message: "Clocked out successfully", 
        timeEntry: updatedEntry,
        totalHours: (totalWorkedMinutes / 60).toFixed(2),
        wageEarned: (wageCalculated / 100).toFixed(2)
      });
    } catch (error) {
      console.error("Clock out error:", error);
      res.status(500).json({ message: "Failed to clock out" });
    }
  });
  
  // Start break
  app.post("/api/staff/break-start", authenticateStaff, async (req: any, res) => {
    try {
      const staffId = req.staff.staffId;
      
      // Update staff status to on break
      await storage.updateStaffStatus(staffId, {
        status: 'on_break',
        breakStartTime: new Date()
      });
      
      res.json({ message: "Break started" });
    } catch (error) {
      console.error("Break start error:", error);
      res.status(500).json({ message: "Failed to start break" });
    }
  });
  
  // End break
  app.post("/api/staff/break-end", authenticateStaff, async (req: any, res) => {
    try {
      const staffId = req.staff.staffId;
      
      // Get current staff status
      const currentStatus = await storage.getStaffStatus(staffId);
      if (!currentStatus?.breakStartTime) {
        return res.status(400).json({ message: "No active break found" });
      }
      
      const breakEndTime = new Date();
      const breakStartTime = new Date(currentStatus.breakStartTime);
      const breakDurationMinutes = Math.floor((breakEndTime.getTime() - breakStartTime.getTime()) / (1000 * 60));
      
      // Update current time entry with break duration
      const currentEntry = await storage.getCurrentTimeEntry(staffId);
      if (currentEntry) {
        const totalBreakDuration = (currentEntry.breakDuration || 0) + breakDurationMinutes;
        await storage.updateTimeEntry(currentEntry.id, {
          breakDuration: totalBreakDuration
        });
      }
      
      // Update staff status back to clocked in
      await storage.updateStaffStatus(staffId, {
        status: 'clocked_in',
        breakStartTime: null
      });
      
      res.json({ 
        message: "Break ended", 
        breakDuration: breakDurationMinutes 
      });
    } catch (error) {
      console.error("Break end error:", error);
      res.status(500).json({ message: "Failed to end break" });
    }
  });
  
  // Get staff time entries
  app.get("/api/staff/time-entries", authenticateStaff, async (req: any, res) => {
    try {
      const staffId = req.staff.staffId;
      const { startDate, endDate } = req.query;
      
      const timeEntries = await storage.getStaffTimeEntries(staffId, {
        startDate: startDate ? new Date(startDate as string) : undefined,
        endDate: endDate ? new Date(endDate as string) : undefined
      });
      
      res.json(timeEntries);
    } catch (error) {
      console.error("Error fetching time entries:", error);
      res.status(500).json({ message: "Failed to fetch time entries" });
    }
  });
  
  // Get current staff status
  app.get("/api/staff/status", authenticateStaff, async (req: any, res) => {
    try {
      const staffId = req.staff.staffId;
      const status = await storage.getStaffStatus(staffId);
      const currentEntry = await storage.getCurrentTimeEntry(staffId);
      
      res.json({
        status: status?.status || 'clocked_out',
        clockInTime: status?.clockInTime,
        breakStartTime: status?.breakStartTime,
        currentTimeEntry: currentEntry
      });
    } catch (error) {
      console.error("Error fetching staff status:", error);
      res.status(500).json({ message: "Failed to fetch status" });
    }
  });
  
  // Admin routes for wage management
  
  // Calculate wages for date range (Admin only)
  app.get("/api/admin/wages/calculate", async (req, res) => {
    try {
      const { staffId, startDate, endDate } = req.query;
      
      if (!staffId || !startDate || !endDate) {
        return res.status(400).json({ message: "Staff ID, start date, and end date required" });
      }
      
      const wages = await storage.calculateWages(
        parseInt(staffId as string),
        new Date(startDate as string),
        new Date(endDate as string)
      );
      
      res.json(wages);
    } catch (error) {
      console.error("Error calculating wages:", error);
      res.status(500).json({ message: "Failed to calculate wages" });
    }
  });
  
  // Get all staff time entries for admin overview
  app.get("/api/admin/time-entries", async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      
      const timeEntries = await storage.getAllTimeEntries({
        startDate: startDate ? new Date(startDate as string) : undefined,
        endDate: endDate ? new Date(endDate as string) : undefined
      });
      
      res.json(timeEntries);
    } catch (error) {
      console.error("Error fetching all time entries:", error);
      res.status(500).json({ message: "Failed to fetch time entries" });
    }
  });
}