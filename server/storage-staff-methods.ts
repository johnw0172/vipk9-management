// Additional storage methods for staff management
// Add these methods to your existing DatabaseStorage class

import { eq, and } from "drizzle-orm";
import { staff, timeEntries, kennelLogs, dailyReports, jobs } from "@shared/schema";

export class StaffStorageMethods {
  
  // Staff management methods
  async updateStaff(staffId: number, updates: any) {
    const [updatedStaff] = await db
      .update(staff)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(staff.id, staffId))
      .returning();
    return updatedStaff;
  }

  async updateStaffStatus(staffId: number, status: string) {
    const [updatedStaff] = await db
      .update(staff)
      .set({ 
        status,
        clockInTime: status === 'clocked_in' ? new Date() : undefined,
        lastClockOut: status === 'clocked_out' ? new Date() : undefined,
        updatedAt: new Date()
      })
      .where(eq(staff.id, staffId))
      .returning();
    return updatedStaff;
  }

  async getStaff(staffId: number) {
    const [staffMember] = await db
      .select()
      .from(staff)
      .where(eq(staff.id, staffId));
    return staffMember;
  }

  // Time tracking methods
  async clockInStaff(staffId: number) {
    const now = new Date();
    
    // Update staff status
    await this.updateStaffStatus(staffId, 'clocked_in');
    
    // Create time entry
    const [timeEntry] = await db
      .insert(timeEntries)
      .values({
        staffId,
        clockInTime: now,
        date: now
      })
      .returning();
    
    return { success: true, timeEntry };
  }

  async clockOutStaff(staffId: number) {
    const now = new Date();
    
    // Update staff status
    await this.updateStaffStatus(staffId, 'clocked_out');
    
    // Update most recent time entry
    const [timeEntry] = await db
      .update(timeEntries)
      .set({ clockOutTime: now })
      .where(
        and(
          eq(timeEntries.staffId, staffId),
          eq(timeEntries.clockOutTime, null)
        )
      )
      .returning();
    
    return { success: true, timeEntry };
  }

  async startBreak(staffId: number) {
    const now = new Date();
    
    await this.updateStaffStatus(staffId, 'on_break');
    
    const [timeEntry] = await db
      .update(timeEntries)
      .set({ breakStartTime: now })
      .where(
        and(
          eq(timeEntries.staffId, staffId),
          eq(timeEntries.clockOutTime, null)
        )
      )
      .returning();
    
    return { success: true, timeEntry };
  }

  async endBreak(staffId: number) {
    const now = new Date();
    
    await this.updateStaffStatus(staffId, 'clocked_in');
    
    const [timeEntry] = await db
      .update(timeEntries)
      .set({ breakEndTime: now })
      .where(
        and(
          eq(timeEntries.staffId, staffId),
          eq(timeEntries.clockOutTime, null),
          eq(timeEntries.breakEndTime, null)
        )
      )
      .returning();
    
    return { success: true, timeEntry };
  }

  // Kennel assignment methods
  async getKennelAssignments(filters: { date?: string; staffId?: number }) {
    let query = db.select().from(kennelLogs);
    
    if (filters.date) {
      const targetDate = new Date(filters.date);
      query = query.where(eq(kennelLogs.scheduledTime, targetDate));
    }
    
    if (filters.staffId) {
      query = query.where(eq(kennelLogs.staffId, filters.staffId));
    }
    
    return await query;
  }

  async createKennelAssignment(data: {
    staffId: number;
    kennelId: number;
    date: Date;
    notes?: string;
  }) {
    const [assignment] = await db
      .insert(kennelLogs)
      .values({
        staffId: data.staffId,
        kennelId: data.kennelId,
        activityType: 'kennel_care',
        scheduledTime: data.date,
        notes: data.notes,
        completed: false
      })
      .returning();
    
    return assignment;
  }

  // Task management methods
  async getStaffTasks(filters: { staffId?: number; date?: string; status?: string }) {
    let query = db.select().from(jobs);
    
    if (filters.staffId) {
      query = query.where(eq(jobs.assignedStaffId, filters.staffId));
    }
    
    if (filters.date) {
      const targetDate = new Date(filters.date);
      query = query.where(eq(jobs.scheduledDate, targetDate));
    }
    
    if (filters.status) {
      query = query.where(eq(jobs.status, filters.status));
    }
    
    return await query;
  }

  async createStaffTask(taskData: {
    type: string;
    description: string;
    assignedStaffId: number;
    scheduledDate: Date;
    dogId?: number;
    kennelId?: number;
    scheduledTime?: string;
  }) {
    const [task] = await db
      .insert(jobs)
      .values({
        ...taskData,
        status: 'pending'
      })
      .returning();
    
    return task;
  }

  async updateStaffTask(taskId: number, updates: any) {
    const [task] = await db
      .update(jobs)
      .set({
        ...updates,
        completedAt: updates.status === 'completed' ? new Date() : undefined
      })
      .where(eq(jobs.id, taskId))
      .returning();
    
    return task;
  }

  // Daily reports methods
  async getDailyReports(filters: { date?: string; dogId?: number; staffId?: number }) {
    let query = db.select().from(dailyReports);
    
    if (filters.date) {
      const targetDate = new Date(filters.date);
      query = query.where(eq(dailyReports.date, targetDate));
    }
    
    if (filters.dogId) {
      query = query.where(eq(dailyReports.dogId, filters.dogId));
    }
    
    if (filters.staffId) {
      query = query.where(eq(dailyReports.createdBy, filters.staffId));
    }
    
    return await query;
  }

  async createDailyReport(reportData: {
    dogId: number;
    date: Date;
    activities?: any;
    feeding?: any;
    exercise?: any;
    medications?: any;
    notes?: string;
    staffNotes?: string;
    behaviorNotes?: string;
    overallWellbeing?: string;
    createdBy: number;
  }) {
    const [report] = await db
      .insert(dailyReports)
      .values(reportData)
      .returning();
    
    return report;
  }

  // Get staff assigned kennels for a specific date
  async getStaffAssignedKennels(staffId: number, date: string) {
    const targetDate = new Date(date);
    
    const assignments = await db
      .select()
      .from(kennelLogs)
      .where(
        and(
          eq(kennelLogs.staffId, staffId),
          eq(kennelLogs.scheduledTime, targetDate)
        )
      );
    
    return assignments;
  }

  // Get staff schedule for a specific date
  async getStaffSchedule(staffId: number, date: string) {
    const targetDate = new Date(date);
    
    const tasks = await db
      .select()
      .from(jobs)
      .where(
        and(
          eq(jobs.assignedStaffId, staffId),
          eq(jobs.scheduledDate, targetDate)
        )
      );
    
    const kennelAssignments = await this.getStaffAssignedKennels(staffId, date);
    
    return {
      tasks,
      kennelAssignments,
      date: targetDate
    };
  }

  // Time tracking report
  async getTimeTrackingReport(filters: {
    startDate?: string;
    endDate?: string;
    staffId?: number;
  }) {
    let query = db.select().from(timeEntries);
    
    if (filters.staffId) {
      query = query.where(eq(timeEntries.staffId, filters.staffId));
    }
    
    // Add date range filtering if needed
    
    return await query;
  }
}