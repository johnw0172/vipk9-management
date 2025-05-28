# VIP Elite K9s Complete System Code

## Problem: Data Loss on Server Restart
Client "John wood" and dog "Odin" disappeared after server restart. Only staff data persists.

## server/storage.ts
```typescript
import {
  users, staff, clients, dogs, kennels, jobs, bookings, dailyReports, invoices, timeEntries, kennelLogs,
  type User, type Staff, type Client, type Dog, type Kennel, type Job, type Booking, type DailyReport, type Invoice, type TimeEntry, type KennelLog,
  type InsertUser, type InsertStaff, type InsertClient, type InsertDog, type InsertKennel, type InsertJob, type InsertBooking, type InsertDailyReport, type InsertInvoice, type InsertTimeEntry, type InsertKennelLog
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllStaff(): Promise<Staff[]>;
  getStaff(id: number): Promise<Staff | undefined>;
  getStaffByPin(pin: string): Promise<Staff | undefined>;
  createStaff(staff: InsertStaff): Promise<Staff>;
  updateStaff(id: number, updates: Partial<Staff>): Promise<Staff | undefined>;
  getAllClients(): Promise<Client[]>;
  getClient(id: number): Promise<Client | undefined>;
  getClientByEmail(email: string): Promise<Client | undefined>;
  createClient(client: InsertClient): Promise<Client>;
  deleteClient(id: number): Promise<boolean>;
  getAllDogs(): Promise<Dog[]>;
  getDog(id: number): Promise<Dog | undefined>;
  getDogsByClient(clientId: number): Promise<Dog[]>;
  createDog(dog: InsertDog): Promise<Dog>;
  updateDog(id: number, updates: Partial<Dog>): Promise<Dog | undefined>;
  deleteDog(id: number): Promise<boolean>;
  getAllKennels(): Promise<Kennel[]>;
  getKennel(id: number): Promise<Kennel | undefined>;
  getKennelByNumber(number: number): Promise<Kennel | undefined>;
  createKennel(kennel: InsertKennel): Promise<Kennel>;
  updateKennel(id: number | string, updates: Partial<Kennel>): Promise<Kennel | undefined>;
  getAllJobs(): Promise<Job[]>;
  getJob(id: number): Promise<Job | undefined>;
  getJobsByStaff(staffId: number): Promise<Job[]>;
  getJobsByDate(date: string): Promise<Job[]>;
  createJob(job: InsertJob): Promise<Job>;
  updateJob(id: number, updates: Partial<Job>): Promise<Job | undefined>;
  getAllBookings(): Promise<Booking[]>;
  getBooking(id: number): Promise<Booking | undefined>;
  getBookingsByClient(clientId: number): Promise<Booking[]>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBooking(id: number, updates: Partial<Booking>): Promise<Booking | undefined>;
  getDailyReport(dogId: number, date: string): Promise<DailyReport | undefined>;
  createDailyReport(report: InsertDailyReport): Promise<DailyReport>;
  updateDailyReport(id: number, updates: Partial<DailyReport>): Promise<DailyReport | undefined>;
  getAllInvoices(): Promise<Invoice[]>;
  getInvoice(id: number): Promise<Invoice | undefined>;
  getInvoicesByClient(clientId: number): Promise<Invoice[]>;
  createInvoice(invoice: InsertInvoice): Promise<Invoice>;
  updateInvoice(id: number, updates: Partial<Invoice>): Promise<Invoice | undefined>;
  getAllTimeEntries(): Promise<TimeEntry[]>;
  getTimeEntry(id: number): Promise<TimeEntry | undefined>;
  getTimeEntriesByStaff(staffId: number): Promise<TimeEntry[]>;
  getTimeEntriesByDate(date: string): Promise<TimeEntry[]>;
  createTimeEntry(timeEntry: InsertTimeEntry): Promise<TimeEntry>;
  updateTimeEntry(id: number, updates: Partial<TimeEntry>): Promise<TimeEntry | undefined>;
  getAllKennelLogs(): Promise<KennelLog[]>;
  getKennelLog(id: number): Promise<KennelLog | undefined>;
  getKennelLogsByKennel(kennelId: number): Promise<KennelLog[]>;
  getKennelLogsByDog(dogId: number): Promise<KennelLog[]>;
  getKennelLogsByStaff(staffId: number): Promise<KennelLog[]>;
  getKennelLogsByDate(date: string): Promise<KennelLog[]>;
  createKennelLog(kennelLog: InsertKennelLog): Promise<KennelLog>;
  updateKennelLog(id: number, updates: Partial<KennelLog>): Promise<KennelLog | undefined>;
}

class MemStorageClass implements IStorage {
  private users: Map<number, User> = new Map();
  private staff: Map<number, Staff> = new Map();
  private clients: Map<number, Client> = new Map();
  private dogs: Map<number, Dog> = new Map();
  private kennels: Map<number, Kennel> = new Map();
  private jobs: Map<number, Job> = new Map();
  private bookings: Map<number, Booking> = new Map();
  private dailyReports: Map<number, DailyReport> = new Map();
  private invoices: Map<number, Invoice> = new Map();
  private timeEntries: Map<number, TimeEntry> = new Map();
  private kennelLogs: Map<number, KennelLog> = new Map();

  private currentId: number = 1;
  private initialized = false;

  constructor() {
    this.initializeEssentialData();
  }

  private initializeEssentialData() {
    if (this.initialized) return;
    this.initialized = true;

    console.log("🚀 Initializing storage with sample data...");

    const adminUser: User = {
      id: 1,
      username: "admin",
      password: "password123",
      role: "admin"
    };
    this.users.set(1, adminUser);

    this.createStaff({
      name: "Emma Thompson",
      role: "Head Trainer",
      pin: "1234",
      profilePhoto: "https://images.unsplash.com/photo-1494790108755-2616b612b1c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
    });

    this.createStaff({
      name: "James Wilson",
      role: "Boarding Specialist", 
      pin: "5678",
      profilePhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
    });

    this.createStaff({
      name: "Sarah Chen",
      role: "Dog Walker",
      pin: "9012",
      profilePhoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
    });

    for (let i = 1; i <= 20; i++) {
      this.createKennel({
        number: i
      });
    }

    this.initialized = true;
    console.log("✅ Sample data initialized successfully");
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllStaff(): Promise<Staff[]> {
    return Array.from(this.staff.values());
  }

  async getStaff(id: number): Promise<Staff | undefined> {
    return this.staff.get(id);
  }

  async getStaffByPin(pin: string): Promise<Staff | undefined> {
    return Array.from(this.staff.values()).find(staff => staff.pin === pin);
  }

  async createStaff(insertStaff: InsertStaff): Promise<Staff> {
    const id = this.currentId++;
    const staff: Staff = { 
      ...insertStaff, 
      id, 
      status: "clocked_out",
      clockInTime: null,
      breakStartTime: null,
      lastClockOut: null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.staff.set(id, staff);
    return staff;
  }

  async updateStaff(id: number, updates: Partial<Staff>): Promise<Staff | undefined> {
    const staff = this.staff.get(id);
    if (!staff) return undefined;
    
    const updatedStaff = { ...staff, ...updates, updatedAt: new Date() };
    this.staff.set(id, updatedStaff);
    return updatedStaff;
  }

  async getAllClients(): Promise<Client[]> {
    return Array.from(this.clients.values());
  }

  async getClient(id: number): Promise<Client | undefined> {
    return this.clients.get(id);
  }

  async getClientByEmail(email: string): Promise<Client | undefined> {
    return Array.from(this.clients.values()).find(client => client.email === email);
  }

  async createClient(insertClient: InsertClient): Promise<Client> {
    const id = this.currentId++;
    const client: Client = { 
      ...insertClient, 
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.clients.set(id, client);
    return client;
  }

  async deleteClient(id: number): Promise<boolean> {
    return this.clients.delete(id);
  }

  async getAllDogs(): Promise<Dog[]> {
    return Array.from(this.dogs.values());
  }

  async getDog(id: number): Promise<Dog | undefined> {
    return this.dogs.get(id);
  }

  async getDogsByClient(clientId: number): Promise<Dog[]> {
    return Array.from(this.dogs.values()).filter(dog => dog.clientId === clientId);
  }

  async createDog(insertDog: InsertDog): Promise<Dog> {
    const id = this.currentId++;
    const dog: Dog = { ...insertDog, id };
    this.dogs.set(id, dog);
    return dog;
  }

  async updateDog(id: number, updates: Partial<Dog>): Promise<Dog | undefined> {
    const dog = this.dogs.get(id);
    if (!dog) return undefined;
    
    const updatedDog = { ...dog, ...updates };
    this.dogs.set(id, updatedDog);
    return updatedDog;
  }

  async deleteDog(id: number): Promise<boolean> {
    return this.dogs.delete(id);
  }

  async getAllKennels(): Promise<Kennel[]> {
    return Array.from(this.kennels.values());
  }

  async getKennel(id: number): Promise<Kennel | undefined> {
    return this.kennels.get(id);
  }

  async getKennelByNumber(number: number): Promise<Kennel | undefined> {
    return Array.from(this.kennels.values()).find(kennel => kennel.number === number);
  }

  async createKennel(insertKennel: InsertKennel): Promise<Kennel> {
    const id = this.currentId++;
    const kennel: Kennel = { 
      ...insertKennel, 
      id, 
      status: "available",
      dogId: null,
      dogIds: [],
      checkInDate: null,
      checkOutDate: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.kennels.set(id, kennel);
    return kennel;
  }

  async updateKennel(id: number | string, updates: Partial<Kennel>): Promise<Kennel | undefined> {
    const kennelId = typeof id === "string" ? parseInt(id, 10) : id;
    console.log("Updating kennel - Original ID:", id, "Converted ID:", kennelId);

    const kennel = this.kennels.get(kennelId);
    if (!kennel) {
      console.log("Kennel not found for ID:", kennelId);
      console.log("Available kennel IDs:", Array.from(this.kennels.keys()));
      return undefined;
    }

    const updatedKennel = { ...kennel, ...updates, updatedAt: new Date() };
    this.kennels.set(kennelId, updatedKennel);

    console.log("Successfully updated kennel:", updatedKennel);
    return updatedKennel;
  }

  async getAllJobs(): Promise<Job[]> {
    return Array.from(this.jobs.values());
  }

  async getJob(id: number): Promise<Job | undefined> {
    return this.jobs.get(id);
  }

  async getJobsByStaff(staffId: number): Promise<Job[]> {
    return Array.from(this.jobs.values()).filter(job => job.assignedStaffId === staffId);
  }

  async getJobsByDate(date: string): Promise<Job[]> {
    return Array.from(this.jobs.values()).filter(job => {
      const jobDate = job.scheduledDate?.toISOString().split('T')[0];
      return jobDate === date;
    });
  }

  async createJob(insertJob: InsertJob): Promise<Job> {
    const id = this.currentId++;
    const job: Job = { 
      ...insertJob, 
      id, 
      status: "pending",
      completedAt: null
    };
    this.jobs.set(id, job);
    return job;
  }

  async updateJob(id: number, updates: Partial<Job>): Promise<Job | undefined> {
    const job = this.jobs.get(id);
    if (!job) return undefined;
    
    const updatedJob = { ...job, ...updates };
    this.jobs.set(id, updatedJob);
    return updatedJob;
  }

  async getAllBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }

  async getBooking(id: number): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async getBookingsByClient(clientId: number): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(booking => booking.clientId === clientId);
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = this.currentId++;
    const booking: Booking = { ...insertBooking, id };
    this.bookings.set(id, booking);
    return booking;
  }

  async updateBooking(id: number, updates: Partial<Booking>): Promise<Booking | undefined> {
    const booking = this.bookings.get(id);
    if (!booking) return undefined;
    
    const updatedBooking = { ...booking, ...updates };
    this.bookings.set(id, updatedBooking);
    return updatedBooking;
  }

  async getDailyReport(dogId: number, date: string): Promise<DailyReport | undefined> {
    return Array.from(this.dailyReports.values()).find(report => 
      report.dogId === dogId && report.date.toISOString().split('T')[0] === date
    );
  }

  async createDailyReport(insertReport: InsertDailyReport): Promise<DailyReport> {
    const id = this.currentId++;
    const report: DailyReport = { ...insertReport, id };
    this.dailyReports.set(id, report);
    return report;
  }

  async updateDailyReport(id: number, updates: Partial<DailyReport>): Promise<DailyReport | undefined> {
    const report = this.dailyReports.get(id);
    if (!report) return undefined;
    
    const updatedReport = { ...report, ...updates };
    this.dailyReports.set(id, updatedReport);
    return updatedReport;
  }

  async getAllInvoices(): Promise<Invoice[]> {
    return Array.from(this.invoices.values());
  }

  async getInvoice(id: number): Promise<Invoice | undefined> {
    return this.invoices.get(id);
  }

  async getInvoicesByClient(clientId: number): Promise<Invoice[]> {
    return Array.from(this.invoices.values()).filter(invoice => invoice.clientId === clientId);
  }

  async createInvoice(insertInvoice: InsertInvoice): Promise<Invoice> {
    const id = this.currentId++;
    const invoice: Invoice = { ...insertInvoice, id };
    this.invoices.set(id, invoice);
    return invoice;
  }

  async updateInvoice(id: number, updates: Partial<Invoice>): Promise<Invoice | undefined> {
    const invoice = this.invoices.get(id);
    if (!invoice) return undefined;
    
    const updatedInvoice = { ...invoice, ...updates };
    this.invoices.set(id, updatedInvoice);
    return updatedInvoice;
  }

  async getAllTimeEntries(): Promise<TimeEntry[]> {
    return Array.from(this.timeEntries.values());
  }

  async getTimeEntry(id: number): Promise<TimeEntry | undefined> {
    return this.timeEntries.get(id);
  }

  async getTimeEntriesByStaff(staffId: number): Promise<TimeEntry[]> {
    return Array.from(this.timeEntries.values()).filter(entry => entry.staffId === staffId);
  }

  async getTimeEntriesByDate(date: string): Promise<TimeEntry[]> {
    return Array.from(this.timeEntries.values()).filter(entry => {
      const entryDate = entry.timestamp?.toISOString().split('T')[0];
      return entryDate === date;
    });
  }

  async createTimeEntry(insertTimeEntry: InsertTimeEntry): Promise<TimeEntry> {
    const id = this.currentId++;
    const timeEntry: TimeEntry = { 
      ...insertTimeEntry, 
      id, 
      timestamp: new Date() 
    };
    this.timeEntries.set(id, timeEntry);
    return timeEntry;
  }

  async updateTimeEntry(id: number, updates: Partial<TimeEntry>): Promise<TimeEntry | undefined> {
    const timeEntry = this.timeEntries.get(id);
    if (!timeEntry) return undefined;
    
    const updatedTimeEntry = { ...timeEntry, ...updates };
    this.timeEntries.set(id, updatedTimeEntry);
    return updatedTimeEntry;
  }

  async getAllKennelLogs(): Promise<KennelLog[]> {
    return Array.from(this.kennelLogs.values());
  }

  async getKennelLog(id: number): Promise<KennelLog | undefined> {
    return this.kennelLogs.get(id);
  }

  async getKennelLogsByKennel(kennelId: number): Promise<KennelLog[]> {
    return Array.from(this.kennelLogs.values()).filter(log => log.kennelId === kennelId);
  }

  async getKennelLogsByDog(dogId: number): Promise<KennelLog[]> {
    return Array.from(this.kennelLogs.values()).filter(log => log.dogId === dogId);
  }

  async getKennelLogsByStaff(staffId: number): Promise<KennelLog[]> {
    return Array.from(this.kennelLogs.values()).filter(log => log.staffId === staffId);
  }

  async getKennelLogsByDate(date: string): Promise<KennelLog[]> {
    return Array.from(this.kennelLogs.values()).filter(log => {
      const logDate = log.timestamp?.toISOString().split('T')[0];
      return logDate === date;
    });
  }

  async createKennelLog(insertKennelLog: InsertKennelLog): Promise<KennelLog> {
    const id = this.currentId++;
    const kennelLog: KennelLog = { 
      ...insertKennelLog, 
      id, 
      timestamp: new Date(),
      completed: false
    };
    this.kennelLogs.set(id, kennelLog);
    return kennelLog;
  }

  async updateKennelLog(id: number, updates: Partial<KennelLog>): Promise<KennelLog | undefined> {
    const kennelLog = this.kennelLogs.get(id);
    if (!kennelLog) return undefined;
    
    const updatedKennelLog = { ...kennelLog, ...updates };
    this.kennelLogs.set(id, updatedKennelLog);
    return updatedKennelLog;
  }
}

export const storage = new MemStorageClass();
```

## server/routes.ts
```typescript
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/kennels/assign", async (req, res) => {
    console.log("🚀 ENHANCED KENNEL ASSIGNMENT STARTED");
    try {
      const { kennelIds, dogIds, checkInDate, checkOutDate } = req.body;
      
      console.log("📝 Request data:", { kennelIds, dogIds, checkInDate, checkOutDate });

      if (!Array.isArray(kennelIds) || !Array.isArray(dogIds)) {
        return res.status(400).json({ message: "Invalid kennel or dog selection" });
      }

      if (kennelIds.length !== 1) {
        return res.status(400).json({ message: "Can only assign to one kennel at a time" });
      }

      if (dogIds.length > 2) {
        return res.status(400).json({ message: "Maximum 2 dogs per kennel allowed" });
      }

      const kennelId = kennelIds[0];
      const kennel = await storage.getKennel(kennelId);
      
      if (!kennel) {
        return res.status(404).json({ message: "Kennel not found" });
      }

      const currentDogIds = kennel.dogIds || [];
      const totalDogsAfterAssignment = currentDogIds.length + dogIds.length;
      
      if (totalDogsAfterAssignment > 2) {
        return res.status(400).json({ message: "Cannot exceed 2 dogs per kennel" });
      }

      if (currentDogIds.length > 0 && dogIds.length > 0) {
        const existingDog = await storage.getDog(currentDogIds[0]);
        const newDog = await storage.getDog(dogIds[0]);
        
        if (existingDog && newDog && existingDog.clientId !== newDog.clientId) {
          return res.status(400).json({ 
            message: "Only dogs from the same household may share kennels" 
          });
        }
      }

      const allDogIds = [...currentDogIds, ...dogIds];
      
      const updated = await storage.updateKennel(kennelId, {
        dogId: dogIds[0],
        dogIds: allDogIds,
        status: "occupied",
        checkInDate: new Date(checkInDate),
        checkOutDate: new Date(checkOutDate),
      });

      console.log("✅ Enhanced assignment complete:", updated);
      res.json({ message: "Dogs assigned successfully", kennel: updated });
    } catch (error) {
      console.error("💥 Error in enhanced assignment:", error);
      res.status(500).json({ message: "Failed to assign kennels" });
    }
  });

  app.patch("/api/kennels/:id/unassign", async (req, res) => {
    try {
      const kennelId = parseInt(req.params.id);
      
      const updated = await storage.updateKennel(kennelId, {
        dogId: null,
        dogIds: [],
        status: "available",
        checkInDate: null,
        checkOutDate: null,
      });

      if (!updated) {
        return res.status(404).json({ message: "Kennel not found" });
      }

      res.json({ message: "Kennel unassigned successfully", kennel: updated });
    } catch (error) {
      console.error("Error unassigning kennel:", error);
      res.status(500).json({ message: "Failed to unassign kennel" });
    }
  });

  app.get("/api/staff", async (req, res) => {
    try {
      const staff = await storage.getAllStaff();
      res.json(staff);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/clients", async (req, res) => {
    try {
      const clients = await storage.getAllClients();
      res.json(clients);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/clients", async (req, res) => {
    try {
      const client = await storage.createClient(req.body);
      res.json(client);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/dogs", async (req, res) => {
    try {
      const dogs = await storage.getAllDogs();
      res.json(dogs);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/dogs", async (req, res) => {
    try {
      const dog = await storage.createDog(req.body);
      res.json(dog);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/kennels", async (req, res) => {
    try {
      const kennels = await storage.getAllKennels();
      const kennelsWithDogs = await Promise.all(
        kennels.map(async (kennel) => {
          if (kennel.dogId) {
            const dog = await storage.getDog(kennel.dogId);
            return { ...kennel, dog };
          }
          return kennel;
        })
      );
      res.json(kennelsWithDogs);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
```

## shared/schema.ts
```typescript
import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("admin"),
});

export const staff = pgTable("staff", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  pin: text("pin").notNull(),
  profilePhoto: text("profile_photo"),
  status: text("status").notNull().default("clocked_out"),
  clockInTime: timestamp("clock_in_time"),
  breakStartTime: timestamp("break_start_time"),
  lastClockOut: timestamp("last_clock_out"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const clients = pgTable("clients", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  address: text("address"),
  password: text("password").notNull(),
  emergencyContactName: text("emergency_contact_name"),
  emergencyContactPhone: text("emergency_contact_phone"),
  emergencyContactRelationship: text("emergency_contact_relationship"),
  vetName: text("vet_name"),
  vetPhone: text("vet_phone"),
  vetAddress: text("vet_address"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const dogs = pgTable("dogs", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  breed: text("breed").notNull(),
  age: integer("age"),
  weight: text("weight"),
  clientId: integer("client_id").notNull(),
  photo: text("photo"),
  medicalNotes: text("medical_notes"),
  dietaryRequirements: text("dietary_requirements"),
  behaviorNotes: text("behavior_notes"),
  emergencyContact: text("emergency_contact"),
  vetInfo: text("vet_info"),
  medications: text("medications"),
  specialInstructions: text("special_instructions"),
  foodType: text("food_type"),
  feedingSchedule: text("feeding_schedule"),
  exerciseRequirements: text("exercise_requirements"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const kennels = pgTable("kennels", {
  id: serial("id").primaryKey(),
  number: integer("number").notNull().unique(),
  status: text("status").notNull().default("available"),
  dogId: integer("dog_id"),
  dogIds: json("dog_ids").$type<number[]>().default([]),
  checkInDate: timestamp("check_in_date"),
  checkOutDate: timestamp("check_out_date"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(),
  description: text("description").notNull(),
  assignedStaffId: integer("assigned_staff_id"),
  dogId: integer("dog_id"),
  kennelId: integer("kennel_id"),
  scheduledDate: timestamp("scheduled_date").notNull(),
  scheduledTime: text("scheduled_time"),
  status: text("status").notNull().default("pending"),
  notes: text("notes"),
  completedAt: timestamp("completed_at"),
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").notNull(),
  dogId: integer("dog_id").notNull(),
  serviceType: text("service_type").notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date"),
  duration: integer("duration"),
  totalAmount: integer("total_amount"),
  status: text("status").notNull(),
  notes: text("notes"),
});

export const dailyReports = pgTable("daily_reports", {
  id: serial("id").primaryKey(),
  dogId: integer("dog_id").notNull(),
  date: timestamp("date").notNull(),
  activities: json("activities"),
  feeding: json("feeding"),
  exercise: json("exercise"),
  medications: json("medications"),
  behaviorNotes: text("behavior_notes"),
  staffNotes: text("staff_notes"),
  photos: json("photos"),
  overallWellbeing: text("overall_wellbeing"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  createdBy: integer("created_by"),
});

export const invoices = pgTable("invoices", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").notNull(),
  bookingId: integer("booking_id"),
  amount: integer("amount").notNull(),
  issueDate: timestamp("issue_date").notNull(),
  dueDate: timestamp("due_date").notNull(),
  paidDate: timestamp("paid_date"),
  status: text("status").notNull(),
  description: text("description"),
});

export const timeEntries = pgTable("time_entries", {
  id: serial("id").primaryKey(),
  staffId: integer("staff_id").notNull(),
  timestamp: timestamp("timestamp"),
  clockInTime: timestamp("clock_in_time"),
  clockOutTime: timestamp("clock_out_time"),
  breakStartTime: timestamp("break_start_time"),
  breakEndTime: timestamp("break_end_time"),
  totalHours: integer("total_hours"),
  notes: text("notes"),
});

export const kennelLogs = pgTable("kennel_logs", {
  id: serial("id").primaryKey(),
  kennelId: integer("kennel_id").notNull(),
  dogId: integer("dog_id"),
  staffId: integer("staff_id").notNull(),
  activityType: text("activity_type").notNull(),
  scheduledTime: timestamp("scheduled_time"),
  completed: boolean("completed").notNull(),
  notes: text("notes"),
  timestamp: timestamp("timestamp"),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Staff = typeof staff.$inferSelect;
export type InsertStaff = typeof staff.$inferInsert;
export type Client = typeof clients.$inferSelect;
export type InsertClient = typeof clients.$inferInsert;
export type Dog = typeof dogs.$inferSelect;
export type InsertDog = typeof dogs.$inferInsert;
export type Kennel = typeof kennels.$inferSelect;
export type InsertKennel = typeof kennels.$inferInsert;
export type Job = typeof jobs.$inferSelect;
export type InsertJob = typeof jobs.$inferInsert;
export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = typeof bookings.$inferInsert;
export type DailyReport = typeof dailyReports.$inferSelect;
export type InsertDailyReport = typeof dailyReports.$inferInsert;
export type Invoice = typeof invoices.$inferSelect;
export type InsertInvoice = typeof invoices.$inferInsert;
export type TimeEntry = typeof timeEntries.$inferSelect;
export type InsertTimeEntry = typeof timeEntries.$inferInsert;
export type KennelLog = typeof kennelLogs.$inferSelect;
export type InsertKennelLog = typeof kennelLogs.$inferInsert;
```

## CLIENT FRONTEND
```typescript
// Enhanced kennel grid display
const assignedDogIds = kennel?.dogIds || (kennel?.dogId ? [kennel.dogId] : []);
const assignedDogs = assignedDogIds.map((dogId: number) => 
  dogs.find((d: any) => d.id === dogId)
).filter(Boolean);

const dogCount = assignedDogs.length;
const getKennelStyle = () => {
  if (kennel?.status === 'cleaning') return 'border-yellow-400 bg-yellow-900/20';
  if (dogCount === 0) return 'border-green-400 bg-green-900/20 hover:bg-green-800/30';
  if (dogCount === 1) return 'border-red-400 bg-red-900/20';
  if (dogCount === 2) return 'border-orange-400 bg-orange-900/20';
  return 'border-gray-400 bg-gray-900/20';
};

{assignedDogs.length > 0 && (
  <button
    onClick={(e) => {
      e.stopPropagation();
      handleUnassignKennel(kennel.id);
    }}
    className="absolute top-1 right-1 w-4 h-4 bg-red-500 hover:bg-red-600 text-white text-xs rounded-full flex items-center justify-center"
    title="Unassign dogs"
  >
    ×
  </button>
)}
```

## PROBLEM SUMMARY
After server restart:
- Staff data persists ✅ 
- Client "John wood" disappears ❌
- Dog "Odin" disappears ❌
- Kennel assignments reset ❌

The MemStorageClass initializes correctly but somehow client and dog data created during runtime doesn't persist across restarts. Only the initial sample data (staff) remains.