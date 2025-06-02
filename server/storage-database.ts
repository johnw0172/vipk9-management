import {
  users, staff, clients, dogs, kennels, jobs, bookings, dailyReports, estimates, invoices, timeEntries, kennelLogs, servicePricing, groupTrainingSessions, groupTrainingBookings, staffTasks, staffTimeTracking, staffBookings,
  type User, type Staff, type Client, type Dog, type Kennel, type Job, type Booking, type DailyReport, type Estimate, type Invoice, type TimeEntry, type KennelLog, type ServicePricing, type GroupTrainingSession, type GroupTrainingBooking, type StaffTask, type StaffTimeTracking, type StaffBooking,
  type InsertUser, type InsertStaff, type InsertClient, type InsertDog, type InsertKennel, type InsertJob, type InsertBooking, type InsertDailyReport, type InsertEstimate, type InsertInvoice, type InsertTimeEntry, type InsertKennelLog, type InsertServicePricing, type InsertGroupTrainingSession, type InsertGroupTrainingBooking, type InsertStaffTask, type InsertStaffTimeTracking, type InsertStaffBooking
} from "@shared/schema";
import { db } from "./db";
import { eq, and, sql } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Staff
  getAllStaff(): Promise<Staff[]>;
  getStaff(id: number): Promise<Staff | undefined>;
  getStaffByPin(pin: string): Promise<Staff | undefined>;
  createStaff(staff: InsertStaff): Promise<Staff>;
  updateStaff(id: number, updates: Partial<Staff>): Promise<Staff | undefined>;
  
  // Staff Management Extensions
  getStaffStatus(staffId: number): Promise<Staff | undefined>;
  updateStaffStatus(staffId: number, status: string, options?: { createTimeEntry?: boolean }): Promise<Staff | undefined>;
  getStaffTasks(filters: { staffId?: number; date?: string; status?: string }): Promise<any[]>;
  createStaffTask(task: InsertStaffTask): Promise<StaffTask>;
  updateStaffTask(taskId: number, updates: Partial<StaffTask>): Promise<StaffTask | undefined>;
  getAllStaffTasks(): Promise<StaffTask[]>;
  getStaffBookings(staffId: number): Promise<StaffBooking[]>;
  assignStaffToBooking(assignment: InsertStaffBooking): Promise<StaffBooking>;
  
  // Time Tracking
  createTimeEntry(entry: InsertStaffTimeTracking): Promise<StaffTimeTracking>;
  updateTimeEntry(entryId: number, updates: Partial<StaffTimeTracking>): Promise<StaffTimeTracking | undefined>;
  getCurrentTimeEntry(staffId: number): Promise<StaffTimeTracking | undefined>;
  getStaffTimeEntries(staffId: number, filters?: { startDate?: Date; endDate?: Date }): Promise<StaffTimeTracking[]>;
  getAllTimeEntries(filters?: { startDate?: Date; endDate?: Date }): Promise<StaffTimeTracking[]>;
  calculateWages(staffId: number, startDate: Date, endDate: Date): Promise<any>;

  // Clients
  getAllClients(): Promise<Client[]>;
  getClient(id: number): Promise<Client | undefined>;
  getClientByEmail(email: string): Promise<Client | undefined>;
  createClient(client: InsertClient): Promise<Client>;
  updateClient(id: number, updates: Partial<Client>): Promise<Client | undefined>;
  deleteClient(id: number): Promise<boolean>;

  // Dogs
  getAllDogs(): Promise<Dog[]>;
  getDog(id: number): Promise<Dog | undefined>;
  getDogsByClient(clientId: number): Promise<Dog[]>;
  createDog(dog: InsertDog): Promise<Dog>;
  updateDog(id: number, updates: Partial<Dog>): Promise<Dog | undefined>;
  deleteDog(id: number): Promise<boolean>;

  // Kennels
  getAllKennels(): Promise<Kennel[]>;
  getKennel(id: number): Promise<Kennel | undefined>;
  getKennelByNumber(number: number): Promise<Kennel | undefined>;
  createKennel(kennel: InsertKennel): Promise<Kennel>;
  updateKennel(id: number | string, updates: Partial<Kennel>): Promise<Kennel | undefined>;
  getKennelsWithBookings(): Promise<any[]>;

  // Jobs
  getAllJobs(): Promise<Job[]>;
  getJob(id: number): Promise<Job | undefined>;
  getJobsByStaff(staffId: number): Promise<Job[]>;
  getJobsByDate(date: string): Promise<Job[]>;
  createJob(job: InsertJob): Promise<Job>;
  updateJob(id: number, updates: Partial<Job>): Promise<Job | undefined>;

  // Bookings
  getAllBookings(): Promise<Booking[]>;
  getBooking(id: number): Promise<Booking | undefined>;
  getBookingsByClient(clientId: number): Promise<Booking[]>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBooking(id: number, updates: Partial<Booking>): Promise<Booking | undefined>;

  // Daily Reports
  getDailyReport(dogId: number, date: string): Promise<DailyReport | undefined>;
  createDailyReport(report: InsertDailyReport): Promise<DailyReport>;
  updateDailyReport(id: number, updates: Partial<DailyReport>): Promise<DailyReport | undefined>;

  // Estimates - Auto-generated from calendar bookings
  getAllEstimates(): Promise<Estimate[]>;
  getEstimate(id: number): Promise<Estimate | undefined>;
  getEstimatesByClient(clientId: number): Promise<Estimate[]>;
  getEstimatesByBooking(bookingId: number): Promise<Estimate[]>;
  createEstimate(estimate: InsertEstimate): Promise<Estimate>;
  updateEstimate(id: number, updates: Partial<Estimate>): Promise<Estimate | undefined>;
  deleteEstimate(id: number): Promise<boolean>;

  // Invoices - Converted from estimates
  getAllInvoices(): Promise<Invoice[]>;
  getInvoice(id: number): Promise<Invoice | undefined>;
  getInvoicesByClient(clientId: number): Promise<Invoice[]>;
  getInvoicesByEstimate(estimateId: number): Promise<Invoice[]>;
  createInvoice(invoice: InsertInvoice): Promise<Invoice>;
  updateInvoice(id: number, updates: Partial<Invoice>): Promise<Invoice | undefined>;
  convertEstimateToInvoice(estimateId: number, depositAmount?: number): Promise<Invoice>;

  // Time Entries
  getAllTimeEntries(): Promise<TimeEntry[]>;
  getTimeEntry(id: number): Promise<TimeEntry | undefined>;
  getTimeEntriesByStaff(staffId: number): Promise<TimeEntry[]>;
  getTimeEntriesByDate(date: string): Promise<TimeEntry[]>;
  createTimeEntry(timeEntry: InsertTimeEntry): Promise<TimeEntry>;
  updateTimeEntry(id: number, updates: Partial<TimeEntry>): Promise<TimeEntry | undefined>;

  // Kennel Logs
  getAllKennelLogs(): Promise<KennelLog[]>;
  getKennelLog(id: number): Promise<KennelLog | undefined>;
  getKennelLogsByKennel(kennelId: number): Promise<KennelLog[]>;
  getKennelLogsByDog(dogId: number): Promise<KennelLog[]>;
  getKennelLogsByStaff(staffId: number): Promise<KennelLog[]>;
  getKennelLogsByDate(date: string): Promise<KennelLog[]>;
  createKennelLog(kennelLog: InsertKennelLog): Promise<KennelLog>;
  updateKennelLog(id: number, updates: Partial<KennelLog>): Promise<KennelLog | undefined>;

  // Service Pricing
  getAllServicePricing(): Promise<ServicePricing[]>;
  getServicePricing(id: number): Promise<ServicePricing | undefined>;
  getServicePricingByType(serviceType: string): Promise<ServicePricing | undefined>;
  createServicePricing(pricing: InsertServicePricing): Promise<ServicePricing>;
  updateServicePricing(id: number, updates: Partial<ServicePricing>): Promise<ServicePricing | undefined>;
  deleteServicePricing(id: number): Promise<boolean>;

  // Group Training Sessions
  getAllGroupTrainingSessions(): Promise<GroupTrainingSession[]>;
  getGroupTrainingSession(id: number): Promise<GroupTrainingSession | undefined>;
  getActiveGroupTrainingSessions(): Promise<GroupTrainingSession[]>;
  createGroupTrainingSession(session: InsertGroupTrainingSession): Promise<GroupTrainingSession>;
  updateGroupTrainingSession(id: number, updates: Partial<GroupTrainingSession>): Promise<GroupTrainingSession | undefined>;
  deleteGroupTrainingSession(id: number): Promise<boolean>;

  // Group Training Bookings
  getAllGroupTrainingBookings(): Promise<GroupTrainingBooking[]>;
  getGroupTrainingBooking(id: number): Promise<GroupTrainingBooking | undefined>;
  getGroupTrainingBookingsBySession(sessionId: number): Promise<GroupTrainingBooking[]>;
  getGroupTrainingBookingsByClient(clientId: number): Promise<GroupTrainingBooking[]>;
  createGroupTrainingBooking(booking: InsertGroupTrainingBooking): Promise<GroupTrainingBooking>;
  updateGroupTrainingBooking(id: number, updates: Partial<GroupTrainingBooking>): Promise<GroupTrainingBooking | undefined>;
  deleteGroupTrainingBooking(id: number): Promise<boolean>;

  // Dev utilities
  resetDatabase?(): Promise<void>;
}

class DatabaseStorage implements IStorage {
  private initialized = false;

  constructor() {
    this.initializeEssentialData();
  }

  private async initializeEssentialData() {
    if (this.initialized) return;
    this.initialized = true;

    console.log("🚀 Initializing database with sample data...");

    try {
      // Check if admin user exists
      const existingAdmin = await db.select().from(users).where(eq(users.username, "admin")).limit(1);
      
      if (existingAdmin.length === 0) {
        // Create admin user
        await db.insert(users).values({
          username: "admin",
          password: "password123",
          role: "admin"
        });
      }

      // Check if staff exists
      const existingStaff = await db.select().from(staff).limit(1);
      
      if (existingStaff.length === 0) {
        // Create sample staff
        await db.insert(staff).values([
          {
            name: "Emma Thompson",
            role: "Head Trainer",
            pin: "1234",
            profilePhoto: "https://images.unsplash.com/photo-1494790108755-2616b612b1c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
            status: "clocked_out"
          },
          {
            name: "James Wilson",
            role: "Boarding Specialist",
            pin: "5678",
            profilePhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
            status: "clocked_out"
          },
          {
            name: "Sarah Chen",
            role: "Dog Walker",
            pin: "9012",
            profilePhoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
            status: "clocked_out"
          }
        ]);
      }

      // Check if kennels exist
      const existingKennels = await db.select().from(kennels).limit(1);
      
      if (existingKennels.length === 0) {
        // Create 20 kennels
        const kennelData = Array.from({ length: 20 }, (_, i) => ({
          number: i + 1,
          status: "available" as const,
          dogIds: [] as number[]
        }));
        
        await db.insert(kennels).values(kennelData);
      }

      console.log("✅ Database initialized successfully");
    } catch (error) {
      console.error("❌ Error initializing database:", error);
    }
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Staff
  async getAllStaff(): Promise<Staff[]> {
    return await db.select().from(staff);
  }

  async getStaff(id: number): Promise<Staff | undefined> {
    const [staffMember] = await db.select().from(staff).where(eq(staff.id, id)).limit(1);
    return staffMember;
  }

  async getStaffByPin(pin: string): Promise<Staff | undefined> {
    const [staffMember] = await db.select().from(staff).where(eq(staff.pin, pin)).limit(1);
    return staffMember;
  }

  async createStaff(insertStaff: InsertStaff): Promise<Staff> {
    const [staffMember] = await db.insert(staff).values({
      ...insertStaff,
      status: "clocked_out",
    }).returning();
    return staffMember;
  }

  async updateStaff(id: number, updates: Partial<Staff>): Promise<Staff | undefined> {
    const [updated] = await db.update(staff)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(staff.id, id))
      .returning();
    return updated;
  }

  async deleteStaff(id: number): Promise<boolean> {
    try {
      // First, clean up any related data (time entries, tasks, daily reports, etc.)
      await db.delete(staffTasks).where(eq(staffTasks.staffId, id));
      await db.delete(timeEntries).where(eq(timeEntries.staffId, id));
      await db.delete(dailyReports).where(eq(dailyReports.staffId, id));
      
      // Then delete the staff member
      const result = await db.delete(staff).where(eq(staff.id, id));
      return true;
    } catch (error) {
      console.error("Error deleting staff:", error);
      return false;
    }
  }

  // Additional staff management methods for PIN authentication and time tracking
  async getStaffById(staffId: number): Promise<Staff | undefined> {
    const [staffMember] = await db.select().from(staff).where(eq(staff.id, staffId)).limit(1);
    return staffMember;
  }

  async updateStaffStatus(staffId: number, status: string, options: { createTimeEntry?: boolean } = {}): Promise<Staff | undefined> {
    console.log(`🔄 Updating staff ${staffId} status to: ${status}`);
    
    const now = new Date();
    const updateData: any = { 
      status,
      updatedAt: now
    };
    
    // Handle different status transitions
    if (status === 'clocked_in') {
      updateData.clockInTime = now;
      updateData.breakStartTime = null;
      updateData.lastClockOut = null;
      
      // Create time entry for new clock-in
      if (options.createTimeEntry) {
        const today = now.toISOString().split('T')[0];
        await db.insert(timeEntries).values({
          staffId,
          date: new Date(today),
          clockInTime: now,
          clockOutTime: null,
          totalHours: 0,
          totalBreakTime: 0,
          hourlyRate: 0
        });
      }
      
    } else if (status === 'clocked_out') {
      updateData.lastClockOut = now;
      updateData.clockInTime = null;
      updateData.breakStartTime = null;
      
      // Update time entry for clock-out
      if (options.createTimeEntry) {
        const today = now.toISOString().split('T')[0];
        const todayEntries = await db.select().from(timeEntries)
          .where(and(
            eq(timeEntries.staffId, staffId),
            eq(timeEntries.date, new Date(today))
          ));
        
        const currentEntry = todayEntries.find(entry => !entry.clockOutTime);
        if (currentEntry && currentEntry.clockInTime) {
          const totalHours = (now.getTime() - currentEntry.clockInTime.getTime()) / (1000 * 60 * 60);
          await db.update(timeEntries)
            .set({
              clockOutTime: now,
              totalHours: Math.round(totalHours * 100) / 100,
              updatedAt: now
            })
            .where(eq(timeEntries.id, currentEntry.id));
        }
      }
      
    } else if (status === 'on_break') {
      updateData.breakStartTime = now;
    }
    
    // Update staff record
    const [updated] = await db.update(staff)
      .set(updateData)
      .where(eq(staff.id, staffId))
      .returning();
      
    console.log(`✅ Staff status updated successfully:`, {
      id: updated?.id,
      name: updated?.name,
      status: updated?.status,
      clockInTime: updated?.clockInTime,
      lastClockOut: updated?.lastClockOut
    });
    
    return updated;
  }

  async clockInStaff(staffId: number): Promise<{ success: boolean; timeEntry?: any }> {
    const now = new Date();
    
    // Update staff status in staff table
    await db.update(staff)
      .set({ 
        status: 'clocked_in',
        clockInTime: now,
        updatedAt: new Date()
      })
      .where(eq(staff.id, staffId));
    
    // Create time entry in staffTimeTracking table
    const [timeEntry] = await db
      .insert(staffTimeTracking)
      .values({
        staffId,
        clockIn: now,
        date: now
      })
      .returning();
    
    return { success: true, timeEntry };
  }

  async clockOutStaff(staffId: number): Promise<{ success: boolean; timeEntry?: any }> {
    const now = new Date();
    
    // Update staff status in staff table
    await db.update(staff)
      .set({ 
        status: 'clocked_out',
        lastClockOut: now,
        clockInTime: null,
        updatedAt: new Date()
      })
      .where(eq(staff.id, staffId));
    
    // Update most recent time entry
    const [timeEntry] = await db
      .update(staffTimeTracking)
      .set({ clockOut: now })
      .where(
        and(
          eq(staffTimeTracking.staffId, staffId),
          sql`${staffTimeTracking.clockOut} IS NULL`
        )
      )
      .returning();
    
    return { success: true, timeEntry };
  }

  async startBreak(staffId: number): Promise<{ success: boolean; timeEntry?: any }> {
    const now = new Date();
    
    await this.updateStaffStatus(staffId, 'on_break');
    
    // For now, we'll just update the status. Break tracking can be enhanced later
    return { success: true };
  }

  async endBreak(staffId: number): Promise<{ success: boolean; timeEntry?: any }> {
    await this.updateStaffStatus(staffId, 'clocked_in');
    return { success: true };
  }

  async getKennelAssignments(filters: { date?: string; staffId?: number }): Promise<any[]> {
    // This would use kennelLogs table for assignments
    let query = db.select().from(kennelLogs);
    
    const conditions = [];
    
    if (filters.date) {
      const targetDate = new Date(filters.date);
      conditions.push(eq(kennelLogs.scheduledTime, targetDate));
    }
    
    if (filters.staffId) {
      conditions.push(eq(kennelLogs.staffId, filters.staffId));
    }
    
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }
    
    return await query;
  }

  async createKennelAssignment(data: {
    staffId: number;
    kennelId: number;
    date: Date;
    notes?: string;
  }): Promise<any> {
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

  async getStaffTasks(filters: { staffId?: number; date?: string; status?: string }): Promise<any[]> {
    console.log("🎯 ENHANCED getStaffTasks called with filters:", filters);
    // Enhanced query with dog and kennel information
    const query = `
      SELECT 
        st.*,
        d.name as dog_name,
        d.breed as dog_breed,
        d.age as dog_age,
        d.special_notes as dog_special_notes,
        d.behavior_notes as dog_behavior_notes,
        d.feeding_instructions as dog_feeding_instructions,
        d.medication as dog_medication,
        d.exercise_requirements as dog_exercise_requirements,
        k.number as kennel_number,
        c.name as client_name,
        b.start_date as booking_start_date,
        b.end_date as booking_end_date,
        b.status as booking_status
      FROM staff_tasks st
      LEFT JOIN kennels k ON st.associated_kennel_id = k.id
      LEFT JOIN bookings b ON k.number = b.kennel_number 
        AND b.service_type = 'boarding'
        AND b.status IN ('pending', 'confirmed', 'active', 'in_progress')
        AND DATE(st.scheduled_date) >= b.start_date 
        AND (b.end_date IS NULL OR DATE(st.scheduled_date) <= b.end_date)
      LEFT JOIN dogs d ON b.dog_id = d.id
      LEFT JOIN clients c ON d.client_id = c.id
      WHERE 1=1
      ${filters.staffId ? `AND st.staff_id = ${filters.staffId}` : ''}
      ${filters.date ? `AND DATE(st.scheduled_date) = '${filters.date}'` : ''}
      ${filters.status ? `AND st.status = '${filters.status}'` : ''}
      ORDER BY st.scheduled_date DESC, st.created_at DESC
    `;
    
    console.log("🔍 SQL Query for staff tasks:", query);
    const result = await db.execute(sql.raw(query));
    console.log("📊 Staff tasks query result count:", result.rows?.length);
    console.log("🐕 First few results with dog info:", result.rows?.slice(0, 3));
    return result.rows as any[];
  }

  async createStaffTask(taskData: {
    type: string;
    description: string;
    assignedStaffId: number;
    scheduledDate: Date;
    dogId?: number;
    kennelId?: number;
    scheduledTime?: string;
  }): Promise<any> {
    const [task] = await db
      .insert(staffTasks)
      .values({
        staffId: taskData.assignedStaffId,
        taskType: taskData.type,
        status: 'pending',
        notes: taskData.description,
        scheduledDate: taskData.scheduledDate,
        associatedKennelId: taskData.kennelId
      })
      .returning();
    
    return task;
  }

  async updateStaffTask(taskId: number, updates: any): Promise<any> {
    const [task] = await db
      .update(staffTasks)
      .set({
        ...updates,
        completedDate: updates.status === 'completed' ? new Date() : undefined,
        updatedAt: new Date()
      })
      .where(eq(staffTasks.id, taskId))
      .returning();
    
    return task;
  }

  async getStaffAssignedKennels(staffId: number, date: string): Promise<any[]> {
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

  async getStaffSchedule(staffId: number, date: string): Promise<any> {
    const targetDate = new Date(date);
    
    const tasks = await db
      .select()
      .from(staffTasks)
      .where(
        and(
          eq(staffTasks.staffId, staffId),
          eq(staffTasks.scheduledDate, targetDate)
        )
      );
    
    const kennelAssignments = await this.getStaffAssignedKennels(staffId, date);
    
    return {
      tasks,
      kennelAssignments,
      date: targetDate
    };
  }

  // Clients
  async getAllClients(): Promise<Client[]> {
    console.log("🔍 Fetching clients from database...");
    try {
      const result = await db.select().from(clients);
      console.log(`✅ Found ${result.length} clients in database:`, result.map(c => c.name));
      return result;
    } catch (error) {
      console.error("❌ Database error:", error);
      throw error;
    }
  }

  async getClient(id: number): Promise<Client | undefined> {
    const [client] = await db.select().from(clients).where(eq(clients.id, id)).limit(1);
    return client;
  }

  async getClientByEmail(email: string): Promise<Client | undefined> {
    const [client] = await db.select().from(clients).where(eq(clients.email, email)).limit(1);
    return client;
  }

  async createClient(insertClient: InsertClient): Promise<Client> {
    const [client] = await db.insert(clients).values(insertClient).returning();
    return client;
  }

  async updateClient(id: number, updates: Partial<Client>): Promise<Client | undefined> {
    // Filter out problematic fields and ensure proper data types
    const { id: _, createdAt, updatedAt, ...cleanUpdates } = updates;
    
    const [updated] = await db.update(clients)
      .set({ ...cleanUpdates, updatedAt: new Date() })
      .where(eq(clients.id, id))
      .returning();
    return updated;
  }

  async deleteClient(id: number): Promise<boolean> {
    const result = await db.delete(clients).where(eq(clients.id, id));
    return result.rowCount > 0;
  }

  // Dogs
  async getAllDogs(): Promise<Dog[]> {
    console.log("🐕 Fetching dogs from database...");
    const result = await db.select().from(dogs);
    console.log(`✅ Found ${result.length} dogs in database:`, result.map(d => d.name));
    return result;
  }

  async getDog(id: number): Promise<Dog | undefined> {
    const [dog] = await db.select().from(dogs).where(eq(dogs.id, id)).limit(1);
    return dog;
  }

  async getDogsByClient(clientId: number): Promise<Dog[]> {
    return await db.select().from(dogs).where(eq(dogs.clientId, clientId));
  }

  async createDog(insertDog: InsertDog): Promise<Dog> {
    const [dog] = await db.insert(dogs).values(insertDog).returning();
    return dog;
  }

  async updateDog(id: number, updates: Partial<Dog>): Promise<Dog | undefined> {
    const [updated] = await db.update(dogs)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(dogs.id, id))
      .returning();
    return updated;
  }

  async deleteDog(id: number): Promise<boolean> {
    const result = await db.delete(dogs).where(eq(dogs.id, id));
    return result.rowCount > 0;
  }

  // Kennels - Enhanced with multiple dogs support
  async getAllKennels(): Promise<Kennel[]> {
    return await db.select().from(kennels);
  }

  async getKennel(id: number): Promise<Kennel | undefined> {
    const [kennel] = await db.select().from(kennels).where(eq(kennels.id, id)).limit(1);
    return kennel;
  }

  async getKennelByNumber(number: number): Promise<Kennel | undefined> {
    const [kennel] = await db.select().from(kennels).where(eq(kennels.number, number)).limit(1);
    return kennel;
  }

  async createKennel(insertKennel: InsertKennel): Promise<Kennel> {
    const [kennel] = await db.insert(kennels).values({
      ...insertKennel,
      status: "available",
      dogIds: []
    }).returning();
    return kennel;
  }

  async updateKennel(id: number | string, updates: Partial<Kennel>): Promise<Kennel | undefined> {
    const kennelId = typeof id === "string" ? parseInt(id, 10) : id;
    console.log("Database: Updating kennel", kennelId, "with:", updates);

    const [updated] = await db.update(kennels)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(kennels.id, kennelId))
      .returning();

    console.log("Database: Kennel updated:", updated);
    return updated;
  }

  // Jobs
  async getAllJobs(): Promise<Job[]> {
    return await db.select().from(jobs);
  }

  async getJob(id: number): Promise<Job | undefined> {
    const [job] = await db.select().from(jobs).where(eq(jobs.id, id)).limit(1);
    return job;
  }

  async getJobsByStaff(staffId: number): Promise<Job[]> {
    return await db.select().from(jobs).where(eq(jobs.assignedStaffId, staffId));
  }

  async getJobsByDate(date: string): Promise<Job[]> {
    return await db.select().from(jobs).where(eq(jobs.scheduledDate, new Date(date)));
  }

  async createJob(insertJob: InsertJob): Promise<Job> {
    const [job] = await db.insert(jobs).values({
      ...insertJob,
      status: "pending"
    }).returning();
    return job;
  }

  async updateJob(id: number, updates: Partial<Job>): Promise<Job | undefined> {
    const [updated] = await db.update(jobs)
      .set(updates)
      .where(eq(jobs.id, id))
      .returning();
    return updated;
  }

  // Bookings
  async getAllBookings(): Promise<Booking[]> {
    return await db.select().from(bookings);
  }

  async getBooking(id: number): Promise<Booking | undefined> {
    const [booking] = await db.select().from(bookings).where(eq(bookings.id, id)).limit(1);
    return booking;
  }

  async getBookingsByClient(clientId: number): Promise<Booking[]> {
    return await db.select().from(bookings).where(eq(bookings.clientId, clientId));
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const [booking] = await db.insert(bookings).values(insertBooking).returning();
    return booking;
  }

  async updateBooking(id: number, updates: Partial<Booking>): Promise<Booking | undefined> {
    const [updated] = await db.update(bookings)
      .set(updates)
      .where(eq(bookings.id, id))
      .returning();
    return updated;
  }

  async deleteBooking(id: number): Promise<boolean> {
    console.log("🗑️ DatabaseStorage: Attempting to delete booking with ID:", id);
    console.log("🗑️ Booking ID type:", typeof id);
    console.log("🗑️ ID value:", id);
    
    // First check if the booking exists
    const existingBooking = await db.select().from(bookings).where(eq(bookings.id, id)).limit(1);
    console.log("🗑️ Booking exists before deletion:", existingBooking.length > 0);
    console.log("🗑️ Existing booking data:", existingBooking);
    
    if (existingBooking.length === 0) {
      console.log("🗑️ Booking not found, nothing to delete");
      return false;
    }
    
    // Perform the deletion
    console.log("🗑️ About to execute DELETE query...");
    const result = await db.delete(bookings).where(eq(bookings.id, id));
    console.log("🗑️ RAW DELETE result:", result);
    console.log("🗑️ Result type:", typeof result);
    console.log("🗑️ Result keys:", Object.keys(result || {}));
    console.log("🗑️ Result.rowCount:", result?.rowCount);
    console.log("🗑️ Result.count:", result?.count);
    
    // Verify deletion by checking if it still exists
    const checkAfterDelete = await db.select().from(bookings).where(eq(bookings.id, id)).limit(1);
    const success = checkAfterDelete.length === 0;
    console.log("🗑️ Booking still exists after deletion:", checkAfterDelete.length > 0);
    console.log("🗑️ Deletion successful:", success);
    
    // Test different return conditions
    const rowCountSuccess = (result?.rowCount || 0) > 0;
    const countSuccess = (result?.count || 0) > 0;
    console.log("🗑️ rowCount success:", rowCountSuccess);
    console.log("🗑️ count success:", countSuccess);
    
    return success;
  }

  // Daily Reports
  async getDailyReport(dogId: number, date: string): Promise<DailyReport | undefined> {
    const [report] = await db.select().from(dailyReports)
      .where(and(eq(dailyReports.dogId, dogId), eq(dailyReports.date, new Date(date))))
      .limit(1);
    return report;
  }

  async createDailyReport(insertReport: InsertDailyReport): Promise<DailyReport> {
    const [report] = await db.insert(dailyReports).values(insertReport).returning();
    return report;
  }

  async updateDailyReport(id: number, updates: Partial<DailyReport>): Promise<DailyReport | undefined> {
    const [updated] = await db.update(dailyReports)
      .set(updates)
      .where(eq(dailyReports.id, id))
      .returning();
    return updated;
  }

  // Invoices
  async getAllInvoices(): Promise<Invoice[]> {
    return await db.select().from(invoices);
  }

  async getInvoice(id: number): Promise<Invoice | undefined> {
    const [invoice] = await db.select().from(invoices).where(eq(invoices.id, id)).limit(1);
    return invoice;
  }

  async getInvoicesByClient(clientId: number): Promise<Invoice[]> {
    return await db.select().from(invoices).where(eq(invoices.clientId, clientId));
  }

  async createInvoice(insertInvoice: InsertInvoice): Promise<Invoice> {
    // Ensure finalAmount is set, defaulting to amount if not provided
    const invoiceData = {
      ...insertInvoice,
      final_amount: insertInvoice.final_amount ?? insertInvoice.amount ?? 0,
      balance_remaining: insertInvoice.balance_remaining ?? insertInvoice.final_amount ?? insertInvoice.amount ?? 0
    };
    
    const [invoice] = await db.insert(invoices).values(invoiceData).returning();
    return invoice;
  }

  async updateInvoice(id: number, updates: Partial<Invoice>): Promise<Invoice | undefined> {
    const [updated] = await db.update(invoices)
      .set(updates)
      .where(eq(invoices.id, id))
      .returning();
    return updated;
  }

  async deleteInvoice(id: number): Promise<boolean> {
    const result = await db.delete(invoices).where(eq(invoices.id, id));
    return (result.rowCount || 0) > 0;
  }



  async getInvoicesByEstimate(estimateId: number): Promise<Invoice[]> {
    return await db.select().from(invoices).where(eq(invoices.estimateId, estimateId));
  }

  async convertEstimateToInvoice(estimateId: number, depositAmount: number = 0): Promise<Invoice> {
    // Get the estimate
    const [estimate] = await db.select().from(estimates).where(eq(estimates.id, estimateId)).limit(1);
    if (!estimate) {
      throw new Error("Estimate not found");
    }

    // Create invoice from estimate
    const [invoice] = await db.insert(invoices).values({
      estimateId: estimateId,
      clientId: estimate.clientId,
      bookingId: estimate.bookingId,
      amount: estimate.totalAmount,
      depositAmount: depositAmount,
      depositPaid: 0,
      balanceRemaining: estimate.totalAmount - depositAmount,
      status: "unpaid",
      paymentStatus: depositAmount > 0 ? "deposit_requested" : "no_deposit",
      issueDate: new Date(),
      description: `Invoice for ${estimate.serviceType} - Kennel #${estimate.kennelNumber}`,
      services: JSON.stringify({
        serviceType: estimate.serviceType,
        kennelNumber: estimate.kennelNumber,
        checkInDate: estimate.checkInDate,
        checkOutDate: estimate.checkOutDate,
        nights: estimate.nights,
        pricePerNight: estimate.pricePerNight,
        dogIds: estimate.dogIds
      })
    }).returning();

    // Update estimate status
    await db.update(estimates)
      .set({ status: "converted_to_invoice" })
      .where(eq(estimates.id, estimateId));

    return invoice;
  }

  // Estimates
  async getAllEstimates(): Promise<Estimate[]> {
    return await db.select().from(estimates);
  }

  async getEstimate(id: number): Promise<Estimate | undefined> {
    const [estimate] = await db.select().from(estimates).where(eq(estimates.id, id)).limit(1);
    return estimate;
  }

  async getEstimatesByClient(clientId: number): Promise<Estimate[]> {
    return await db.select().from(estimates).where(eq(estimates.clientId, clientId));
  }

  async getEstimatesByBooking(bookingId: number): Promise<Estimate[]> {
    return await db.select().from(estimates).where(eq(estimates.bookingId, bookingId));
  }

  async createEstimate(insertEstimate: InsertEstimate): Promise<Estimate> {
    const [estimate] = await db.insert(estimates).values(insertEstimate).returning();
    return estimate;
  }

  async updateEstimate(id: number, updates: Partial<Estimate>): Promise<Estimate | undefined> {
    const [updated] = await db.update(estimates)
      .set(updates)
      .where(eq(estimates.id, id))
      .returning();
    return updated;
  }

  async deleteEstimate(id: number): Promise<boolean> {
    console.log("🗑️ DatabaseStorage: Attempting to delete estimate with ID:", id);
    console.log("🗑️ Estimate ID type:", typeof id);
    console.log("🗑️ ID value:", id);
    
    // First check if the estimate exists
    const existingEstimate = await db.select().from(estimates).where(eq(estimates.id, id)).limit(1);
    console.log("🗑️ Estimate exists before deletion:", existingEstimate.length > 0);
    console.log("🗑️ Existing estimate data:", existingEstimate);
    
    if (existingEstimate.length === 0) {
      console.log("🗑️ Estimate not found, nothing to delete");
      return false;
    }
    
    // Perform the deletion
    console.log("🗑️ About to execute DELETE query...");
    const result = await db.delete(estimates).where(eq(estimates.id, id));
    console.log("🗑️ RAW DELETE result:", result);
    console.log("🗑️ Result type:", typeof result);
    console.log("🗑️ Result keys:", Object.keys(result || {}));
    console.log("🗑️ Result.rowCount:", result?.rowCount);
    console.log("🗑️ Result.count:", result?.count);
    
    // Verify deletion by checking if it still exists
    const checkAfterDelete = await db.select().from(estimates).where(eq(estimates.id, id)).limit(1);
    const success = checkAfterDelete.length === 0;
    console.log("🗑️ Estimate still exists after deletion:", checkAfterDelete.length > 0);
    console.log("🗑️ Deletion successful:", success);
    
    // Test different return conditions
    const rowCountSuccess = (result?.rowCount || 0) > 0;
    const countSuccess = (result?.count || 0) > 0;
    console.log("🗑️ rowCount success:", rowCountSuccess);
    console.log("🗑️ count success:", countSuccess);
    
    return success;
  }



  // Time Entries
  async getAllTimeEntries(): Promise<TimeEntry[]> {
    return await db.select().from(timeEntries);
  }

  async getTimeEntry(id: number): Promise<TimeEntry | undefined> {
    const [entry] = await db.select().from(timeEntries).where(eq(timeEntries.id, id)).limit(1);
    return entry;
  }

  async getTimeEntriesByStaff(staffId: number): Promise<TimeEntry[]> {
    return await db.select().from(timeEntries).where(eq(timeEntries.staffId, staffId));
  }

  async getTimeEntriesByDate(date: string): Promise<TimeEntry[]> {
    return await db.select().from(timeEntries).where(eq(timeEntries.timestamp, new Date(date)));
  }

  async createTimeEntry(insertTimeEntry: InsertTimeEntry): Promise<TimeEntry> {
    const [entry] = await db.insert(timeEntries).values(insertTimeEntry).returning();
    return entry;
  }

  async updateTimeEntry(id: number, updates: Partial<TimeEntry>): Promise<TimeEntry | undefined> {
    const [updated] = await db.update(timeEntries)
      .set(updates)
      .where(eq(timeEntries.id, id))
      .returning();
    return updated;
  }

  // Kennel Logs
  async getAllKennelLogs(): Promise<KennelLog[]> {
    return await db.select().from(kennelLogs);
  }

  async getKennelLog(id: number): Promise<KennelLog | undefined> {
    const [log] = await db.select().from(kennelLogs).where(eq(kennelLogs.id, id)).limit(1);
    return log;
  }

  async getKennelLogsByKennel(kennelId: number): Promise<KennelLog[]> {
    return await db.select().from(kennelLogs).where(eq(kennelLogs.kennelId, kennelId));
  }

  async getKennelLogsByDog(dogId: number): Promise<KennelLog[]> {
    return await db.select().from(kennelLogs).where(eq(kennelLogs.dogId, dogId));
  }

  async getKennelLogsByStaff(staffId: number): Promise<KennelLog[]> {
    return await db.select().from(kennelLogs).where(eq(kennelLogs.staffId, staffId));
  }

  async getKennelLogsByDate(date: string): Promise<KennelLog[]> {
    return await db.select().from(kennelLogs).where(eq(kennelLogs.timestamp, new Date(date)));
  }

  async createKennelLog(insertKennelLog: InsertKennelLog): Promise<KennelLog> {
    const [log] = await db.insert(kennelLogs).values(insertKennelLog).returning();
    return log;
  }

  async updateKennelLog(id: number, updates: Partial<KennelLog>): Promise<KennelLog | undefined> {
    const [updated] = await db.update(kennelLogs)
      .set(updates)
      .where(eq(kennelLogs.id, id))
      .returning();
    return updated;
  }

  // Dev utility to reset database
  async resetDatabase(): Promise<void> {
    console.log("🗑️ Resetting database...");
    
    // Delete all data except admin user
    await db.delete(kennelLogs);
    await db.delete(timeEntries);
    await db.delete(invoices);
    await db.delete(dailyReports);
    await db.delete(bookings);
    await db.delete(jobs);
    await db.delete(dogs);
    await db.delete(clients);
    
    // Reset kennels to available
    await db.update(kennels).set({
      status: "available",
      dogId: null,
      dogIds: [],
      checkInDate: null,
      checkOutDate: null
    });

    console.log("✅ Database reset complete");
  }

  // Service Pricing Methods
  async getAllServicePricing(): Promise<ServicePricing[]> {
    console.log("🎯 Fetching service pricing from database...");
    try {
      const result = await db.select().from(servicePricing);
      console.log(`✅ Found ${result.length} service pricing entries:`, result.map(p => `${p.serviceType}: £${p.pricePerUnit}`));
      return result;
    } catch (error) {
      console.error("❌ Database error fetching service pricing:", error);
      throw error;
    }
  }

  async getServicePricing(id: number): Promise<ServicePricing | undefined> {
    const [pricing] = await db.select().from(servicePricing).where(eq(servicePricing.id, id));
    return pricing;
  }

  async getServicePricingByType(serviceType: string): Promise<ServicePricing | undefined> {
    const [pricing] = await db.select().from(servicePricing).where(eq(servicePricing.serviceType, serviceType));
    return pricing;
  }

  async createServicePricing(insertPricing: InsertServicePricing): Promise<ServicePricing> {
    const [pricing] = await db.insert(servicePricing).values(insertPricing).returning();
    return pricing;
  }

  async updateServicePricing(id: number, updates: Partial<ServicePricing>): Promise<ServicePricing | undefined> {
    const [pricing] = await db.update(servicePricing)
      .set(updates)
      .where(eq(servicePricing.id, id))
      .returning();
    return pricing;
  }

  async deleteServicePricing(id: number): Promise<boolean> {
    const result = await db.delete(servicePricing).where(eq(servicePricing.id, id));
    return (result.rowCount || 0) > 0;
  }

  // Group Training Sessions Methods
  async getAllGroupTrainingSessions(): Promise<GroupTrainingSession[]> {
    console.log("🎓 Fetching all group training sessions...");
    try {
      const result = await db.select().from(groupTrainingSessions);
      console.log(`✅ Found ${result.length} group training sessions`);
      return result;
    } catch (error) {
      console.error("❌ Database error fetching group training sessions:", error);
      throw error;
    }
  }

  async getGroupTrainingSession(id: number): Promise<GroupTrainingSession | undefined> {
    const [session] = await db.select().from(groupTrainingSessions).where(eq(groupTrainingSessions.id, id));
    return session;
  }

  async getActiveGroupTrainingSessions(): Promise<GroupTrainingSession[]> {
    return await db.select().from(groupTrainingSessions).where(eq(groupTrainingSessions.status, 'active'));
  }

  async createGroupTrainingSession(insertSession: InsertGroupTrainingSession): Promise<GroupTrainingSession> {
    console.log("🎓 Creating new group training session:", insertSession.sessionName);
    const [session] = await db.insert(groupTrainingSessions).values(insertSession).returning();
    console.log("✅ Created group training session:", session.id);
    return session;
  }

  async updateGroupTrainingSession(id: number, updates: Partial<GroupTrainingSession>): Promise<GroupTrainingSession | undefined> {
    const [session] = await db.update(groupTrainingSessions)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(groupTrainingSessions.id, id))
      .returning();
    return session;
  }

  async deleteGroupTrainingSession(id: number): Promise<boolean> {
    // First delete all bookings for this session
    await db.delete(groupTrainingBookings).where(eq(groupTrainingBookings.sessionId, id));
    // Then delete the session
    const result = await db.delete(groupTrainingSessions).where(eq(groupTrainingSessions.id, id));
    return (result.rowCount || 0) > 0;
  }

  // Group Training Bookings Methods
  async getAllGroupTrainingBookings(): Promise<GroupTrainingBooking[]> {
    return await db.select().from(groupTrainingBookings);
  }

  async getGroupTrainingBooking(id: number): Promise<GroupTrainingBooking | undefined> {
    const [booking] = await db.select().from(groupTrainingBookings).where(eq(groupTrainingBookings.id, id));
    return booking;
  }

  async getGroupTrainingBookingsBySession(sessionId: number): Promise<GroupTrainingBooking[]> {
    return await db.select().from(groupTrainingBookings).where(eq(groupTrainingBookings.sessionId, sessionId));
  }

  async getGroupTrainingBookingsByClient(clientId: number): Promise<GroupTrainingBooking[]> {
    return await db.select().from(groupTrainingBookings).where(eq(groupTrainingBookings.clientId, clientId));
  }

  async createGroupTrainingBooking(insertBooking: InsertGroupTrainingBooking): Promise<GroupTrainingBooking> {
    console.log("🎓 Creating group training booking for session:", insertBooking.sessionId);
    
    // Create the booking
    const [booking] = await db.insert(groupTrainingBookings).values(insertBooking).returning();
    
    // Update the session participant count
    await db.update(groupTrainingSessions)
      .set({ 
        currentParticipants: sql`${groupTrainingSessions.currentParticipants} + 1`,
        updatedAt: new Date()
      })
      .where(eq(groupTrainingSessions.id, insertBooking.sessionId));
    
    console.log("✅ Created group training booking:", booking.id);
    return booking;
  }

  async updateGroupTrainingBooking(id: number, updates: Partial<GroupTrainingBooking>): Promise<GroupTrainingBooking | undefined> {
    const [booking] = await db.update(groupTrainingBookings)
      .set(updates)
      .where(eq(groupTrainingBookings.id, id))
      .returning();
    return booking;
  }

  async deleteGroupTrainingBooking(id: number): Promise<boolean> {
    // Get the booking to find the session ID
    const booking = await this.getGroupTrainingBooking(id);
    if (!booking) return false;
    
    // Delete the booking
    const result = await db.delete(groupTrainingBookings).where(eq(groupTrainingBookings.id, id));
    
    // Update the session participant count
    if ((result.rowCount || 0) > 0) {
      await db.update(groupTrainingSessions)
        .set({ 
          currentParticipants: sql`${groupTrainingSessions.currentParticipants} - 1`,
          updatedAt: new Date()
        })
        .where(eq(groupTrainingSessions.id, booking.sessionId));
    }
    
    return (result.rowCount || 0) > 0;
  }

  // Staff Management Extensions
  async getStaffStatus(staffId: number): Promise<Staff | undefined> {
    const [staffMember] = await db.select().from(staff).where(eq(staff.id, staffId));
    return staffMember;
  }





  async createStaffTask(task: InsertStaffTask): Promise<StaffTask> {
    const [created] = await db.insert(staffTasks).values(task).returning();
    return created;
  }

  async updateStaffTask(taskId: number, updates: Partial<StaffTask>): Promise<StaffTask | undefined> {
    const [updated] = await db.update(staffTasks)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(staffTasks.id, taskId))
      .returning();
    return updated;
  }

  async getAllStaffTasks(): Promise<StaffTask[]> {
    return await db.select().from(staffTasks);
  }

  async getStaffBookings(staffId: number): Promise<StaffBooking[]> {
    return await db.select().from(staffBookings).where(eq(staffBookings.staffId, staffId));
  }

  async assignStaffToBooking(assignment: InsertStaffBooking): Promise<StaffBooking> {
    const [created] = await db.insert(staffBookings).values(assignment).returning();
    return created;
  }

  // Time Tracking Methods
  async createTimeEntry(entry: InsertStaffTimeTracking): Promise<StaffTimeTracking> {
    const [created] = await db.insert(staffTimeTracking).values(entry).returning();
    return created;
  }

  async updateTimeEntry(entryId: number, updates: Partial<StaffTimeTracking>): Promise<StaffTimeTracking | undefined> {
    const [updated] = await db.update(staffTimeTracking)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(staffTimeTracking.id, entryId))
      .returning();
    return updated;
  }

  async getCurrentTimeEntry(staffId: number): Promise<StaffTimeTracking | undefined> {
    const [entry] = await db.select()
      .from(staffTimeTracking)
      .where(and(
        eq(staffTimeTracking.staffId, staffId),
        sql`${staffTimeTracking.clockOut} IS NULL`
      ))
      .limit(1);
    return entry;
  }

  async getStaffTimeEntries(staffId: number, filters?: { startDate?: Date; endDate?: Date }): Promise<StaffTimeTracking[]> {
    let query = db.select().from(staffTimeTracking).where(eq(staffTimeTracking.staffId, staffId));
    
    if (filters?.startDate && filters?.endDate) {
      query = query.where(and(
        eq(staffTimeTracking.staffId, staffId),
        sql`${staffTimeTracking.date} >= ${filters.startDate}`,
        sql`${staffTimeTracking.date} <= ${filters.endDate}`
      ));
    }
    
    return await query;
  }

  async getAllTimeEntries(filters?: { startDate?: Date; endDate?: Date }): Promise<StaffTimeTracking[]> {
    let query = db.select().from(staffTimeTracking);
    
    if (filters?.startDate && filters?.endDate) {
      query = query.where(and(
        sql`${staffTimeTracking.date} >= ${filters.startDate}`,
        sql`${staffTimeTracking.date} <= ${filters.endDate}`
      ));
    }
    
    return await query;
  }

  async calculateWages(staffId: number, startDate: Date, endDate: Date): Promise<any> {
    const timeEntries = await this.getStaffTimeEntries(staffId, { startDate, endDate });
    const staffMember = await this.getStaff(staffId);
    
    if (!staffMember) {
      throw new Error("Staff member not found");
    }
    
    let totalMinutes = 0;
    let totalWagesInPence = 0;
    
    // Calculate hours from completed time entries
    for (const entry of timeEntries) {
      if (entry.clockOut && entry.clockIn) {
        const minutes = Math.floor((new Date(entry.clockOut).getTime() - new Date(entry.clockIn).getTime()) / (1000 * 60));
        totalMinutes += minutes;
        
        // Calculate wages for this entry
        if (staffMember.hourlyRate) {
          const hourlyRateInPence = staffMember.hourlyRate;
          const wagesForEntry = Math.round((minutes / 60) * hourlyRateInPence);
          totalWagesInPence += wagesForEntry;
        }
      }
    }
    
    // Add current active session if staff is clocked in
    if (staffMember.status === 'clocked_in' && staffMember.clockInTime) {
      const clockInTime = new Date(staffMember.clockInTime);
      const now = new Date();
      
      // Include active session if it overlaps with our date range
      if (clockInTime <= endDate && now >= startDate) {
        const sessionStart = clockInTime > startDate ? clockInTime : startDate;
        const sessionEnd = now < endDate ? now : endDate;
        const activeMinutes = Math.floor((sessionEnd.getTime() - sessionStart.getTime()) / (1000 * 60));
        
        totalMinutes += activeMinutes;
        
        // Calculate wages for active session
        if (staffMember.hourlyRate) {
          const hourlyRateInPence = staffMember.hourlyRate;
          const wagesForActiveSession = Math.round((activeMinutes / 60) * hourlyRateInPence);
          totalWagesInPence += wagesForActiveSession;
        }
      }
    }
    
    return {
      staffId,
      staffName: staffMember.name,
      staffRole: staffMember.role,
      totalHours: totalMinutes / 60, // Convert minutes to hours
      totalWages: totalWagesInPence, // Keep in pence for consistency
      hourlyRate: staffMember.hourlyRate || 0, // Keep in pence for consistency
      timeEntries: timeEntries.length,
      regularHours: totalMinutes / 60, // For now, all hours are regular
      overtimeHours: 0, // TODO: Implement overtime logic
      breakHours: 0 // TODO: Implement break time calculation
    };
  }

  // Staff task management methods from Copilot integration
  async getStaffTasksFiltered(filters: { staffId?: number; date?: string; status?: string }): Promise<any[]> {
    console.log("🎯 getStaffTasksFiltered called with filters:", filters);
    
    // Enhanced query with dog and kennel information
    const query = `
      SELECT 
        st.*,
        d.name as dog_name,
        d.breed as dog_breed,
        d.age as dog_age,
        d.special_notes as dog_special_notes,
        d.behavior_notes as dog_behavior_notes,
        d.feeding_instructions as dog_feeding_instructions,
        d.medication as dog_medication,
        d.exercise_requirements as dog_exercise_requirements,
        k.number as kennel_number,
        c.name as client_name,
        b.start_date as booking_start_date,
        b.end_date as booking_end_date,
        b.status as booking_status
      FROM staff_tasks st
      LEFT JOIN kennels k ON st.associated_kennel_id = k.id
      LEFT JOIN bookings b ON k.number = b.kennel_number 
        AND b.service_type = 'boarding'
        AND b.status IN ('pending', 'confirmed', 'active', 'in_progress')
        AND DATE(st.scheduled_date) >= b.start_date 
        AND (b.end_date IS NULL OR DATE(st.scheduled_date) <= b.end_date)
      LEFT JOIN dogs d ON b.dog_id = d.id
      LEFT JOIN clients c ON d.client_id = c.id
      WHERE 1=1
      ${filters.staffId ? `AND st.staff_id = ${filters.staffId}` : ''}
      ${filters.date ? `AND DATE(st.scheduled_date) = '${filters.date}'` : ''}
      ${filters.status ? `AND st.status = '${filters.status}'` : ''}
      ORDER BY st.scheduled_date DESC, st.created_at DESC
    `;
    
    console.log("🔍 SQL Query for staff tasks:", query);
    const result = await db.execute(sql.raw(query));
    console.log("📊 Staff tasks query result count:", result.rows?.length);
    console.log("🐕 First task with dog info:", result.rows?.[0]);
    return result.rows as any[];
  }

  async createStaffTaskAssignment(taskData: any): Promise<any> {
    const [task] = await db
      .insert(staffTasks)
      .values({ ...taskData, status: 'pending' })
      .returning();
    return task;
  }

  async updateStaffTaskStatus(taskId: number, updates: any): Promise<any> {
    const [task] = await db
      .update(staffTasks)
      .set({
        ...updates,
        completedDate: updates.status === 'completed' ? new Date() : undefined,
        updatedAt: new Date()
      })
      .where(eq(staffTasks.id, taskId))
      .returning();
    return task;
  }

  async clearAllStaffTasks(staffId: number): Promise<number> {
    const result = await db
      .delete(staffTasks)
      .where(eq(staffTasks.staffId, staffId));
    return result.rowCount || 0;
  }

  // Get kennels with current booking information
  async getKennelsWithBookings(): Promise<any[]> {
    const query = `
      SELECT 
        k.id,
        k.number,
        k.status,
        b.id as booking_id,
        b.dog_id,
        b.client_id,
        b.start_date,
        b.end_date,
        b.kennel_number,
        d.name as dog_name,
        c.name as client_name
      FROM kennels k
      LEFT JOIN bookings b 
        ON k.number = b.kennel_number 
        AND CURRENT_DATE BETWEEN b.start_date AND COALESCE(b.end_date, CURRENT_DATE)
        AND b.status != 'cancelled'
      LEFT JOIN dogs d 
        ON b.dog_id = d.id
      LEFT JOIN clients c 
        ON b.client_id = c.id
      ORDER BY k.number
    `;
    
    const result = await db.execute(sql.raw(query));
    return result.rows;
  }

  // Enhanced kennel assignment methods
  async getKennelAssignmentsForStaff(filters: { date?: string; staffId?: number }): Promise<any[]> {
    let query = db.select().from(kennelLogs);
    const conditions = [];

    if (filters.date) {
      const targetDate = new Date(filters.date);
      conditions.push(eq(kennelLogs.scheduledTime, targetDate));
    }

    if (filters.staffId) {
      conditions.push(eq(kennelLogs.staffId, filters.staffId));
    }

    if (conditions.length > 0) {
      return await query.where(and(...conditions));
    }

    return await query;
  }

  async createKennelAssignmentEntry(data: any): Promise<any> {
    const [assignment] = await db
      .insert(kennelLogs)
      .values({
        ...data,
        completed: false
      })
      .returning();
    return assignment;
  }
}

export const storage = new DatabaseStorage();