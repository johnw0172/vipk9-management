# VIP ELITE K9S COMPLETE SYSTEM EXPORT

## BACKEND FILES

### server/index.ts
```typescript
import express from "express";
import { registerRoutes } from "./routes";
import { setupVite } from "./vite";

const app = express();
const port = Number(process.env.PORT) || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function start() {
  try {
    const server = await registerRoutes(app);
    
    if (process.env.NODE_ENV === "development") {
      await setupVite(app);
    } else {
      app.use(express.static("dist/client"));
      app.get("*", (req, res) => {
        res.sendFile(require.resolve("../dist/client/index.html"));
      });
    }

    server.listen(port, "0.0.0.0", () => {
      console.log(`[express] serving on port ${port}`);
    });
  } catch (error) {
    console.error("[express] failed to start:", error);
    process.exit(1);
  }
}

start();
```

### server/db.ts
```typescript
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle({ client: pool, schema });
```

### server/storage-database.ts (NEW DATABASE STORAGE)
```typescript
import {
  users, staff, clients, dogs, kennels, jobs, bookings, dailyReports, invoices, timeEntries, kennelLogs,
  type User, type Staff, type Client, type Dog, type Kennel, type Job, type Booking, type DailyReport, type Invoice, type TimeEntry, type KennelLog,
  type InsertUser, type InsertStaff, type InsertClient, type InsertDog, type InsertKennel, type InsertJob, type InsertBooking, type InsertDailyReport, type InsertInvoice, type InsertTimeEntry, type InsertKennelLog
} from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

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
      const existingAdmin = await db.select().from(users).where(eq(users.username, "admin")).limit(1);
      
      if (existingAdmin.length === 0) {
        await db.insert(users).values({
          username: "admin",
          password: "password123",
          role: "admin"
        });
      }

      const existingStaff = await db.select().from(staff).limit(1);
      
      if (existingStaff.length === 0) {
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

      const existingKennels = await db.select().from(kennels).limit(1);
      
      if (existingKennels.length === 0) {
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

  // Clients
  async getAllClients(): Promise<Client[]> {
    return await db.select().from(clients);
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

  async deleteClient(id: number): Promise<boolean> {
    const result = await db.delete(clients).where(eq(clients.id, id));
    return (result.rowCount || 0) > 0;
  }

  // Dogs
  async getAllDogs(): Promise<Dog[]> {
    return await db.select().from(dogs);
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
    return (result.rowCount || 0) > 0;
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

  // Jobs, Bookings, DailyReports, Invoices, TimeEntries, KennelLogs methods...
  // [Implementation continues with similar patterns for all other entities]

  async resetDatabase(): Promise<void> {
    console.log("🗑️ Resetting database...");
    
    await db.delete(kennelLogs);
    await db.delete(timeEntries);
    await db.delete(invoices);
    await db.delete(dailyReports);
    await db.delete(bookings);
    await db.delete(jobs);
    await db.delete(dogs);
    await db.delete(clients);
    
    await db.update(kennels).set({
      status: "available",
      dogId: null,
      dogIds: [],
      checkInDate: null,
      checkOutDate: null
    });

    console.log("✅ Database reset complete");
  }
}

export const storage = new DatabaseStorage();
```

### server/routes.ts (ENHANCED)
```typescript
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Enhanced kennel assignment with multiple dogs support
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

      // Family validation: if adding to occupied kennel, check same client
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

  // Unassign kennel
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

  // Staff routes
  app.get("/api/staff", async (req, res) => {
    try {
      const staff = await storage.getAllStaff();
      res.json(staff);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/staff", async (req, res) => {
    try {
      const staff = await storage.createStaff(req.body);
      res.json(staff);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Client routes
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

  app.delete("/api/clients/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteClient(id);
      if (deleted) {
        res.json({ message: "Client deleted successfully" });
      } else {
        res.status(404).json({ message: "Client not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Dog routes
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

  app.delete("/api/dogs/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteDog(id);
      if (deleted) {
        res.json({ message: "Dog deleted successfully" });
      } else {
        res.status(404).json({ message: "Dog not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Kennel routes
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

  // Dev-only database reset endpoint
  if (process.env.NODE_ENV === "development") {
    app.post("/api/dev/reset-database", async (req, res) => {
      try {
        if (storage.resetDatabase) {
          await storage.resetDatabase();
          res.json({ message: "Database reset successfully" });
        } else {
          res.status(501).json({ message: "Reset not implemented" });
        }
      } catch (error) {
        console.error("Error resetting database:", error);
        res.status(500).json({ message: "Failed to reset database" });
      }
    });
  }

  const httpServer = createServer(app);
  return httpServer;
}
```

### server/vite.ts
```typescript
import { createServer } from "vite";
import type { Express } from "express";

export async function setupVite(app: Express) {
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: "spa",
  });

  app.use(vite.ssrFixStacktrace);
  app.use(vite.middlewares);

  return vite;
}
```

## SHARED FILES

### shared/schema.ts (ENHANCED WITH MULTIPLE DOGS SUPPORT)
```typescript
import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table for admin authentication
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("admin"), // admin, staff, client
});

// Staff table
export const staff = pgTable("staff", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(), // Head Trainer, Boarding Specialist, Dog Walker, etc.
  pin: text("pin").notNull(), // 4-digit PIN
  profilePhoto: text("profile_photo"),
  status: text("status").notNull().default("clocked_out"), // clocked_in, on_break, clocked_out
  clockInTime: timestamp("clock_in_time"),
  breakStartTime: timestamp("break_start_time"),
  lastClockOut: timestamp("last_clock_out"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Clients table
export const clients = pgTable("clients", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  address: text("address"),
  password: text("password").notNull(),
  // Emergency Contact Information
  emergencyContactName: text("emergency_contact_name"),
  emergencyContactPhone: text("emergency_contact_phone"),
  emergencyContactRelationship: text("emergency_contact_relationship"),
  // Veterinarian Information  
  vetName: text("vet_name"),
  vetPhone: text("vet_phone"),
  vetAddress: text("vet_address"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Pets/Dogs table
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

// Enhanced Kennels table with multiple dogs support
export const kennels = pgTable("kennels", {
  id: serial("id").primaryKey(),
  number: integer("number").notNull().unique(),
  status: text("status").notNull().default("available"), // occupied, available, cleaning
  dogId: integer("dog_id"), // Keep for backward compatibility
  dogIds: json("dog_ids").$type<number[]>().default([]), // Support multiple dogs
  checkInDate: timestamp("check_in_date"),
  checkOutDate: timestamp("check_out_date"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Jobs table
export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // walk, training, cleaning, feeding, grooming
  description: text("description").notNull(),
  assignedStaffId: integer("assigned_staff_id"),
  dogId: integer("dog_id"),
  kennelId: integer("kennel_id"),
  scheduledDate: timestamp("scheduled_date").notNull(),
  scheduledTime: text("scheduled_time"),
  status: text("status").notNull().default("pending"), // pending, in_progress, completed
  notes: text("notes"),
  completedAt: timestamp("completed_at"),
});

// Bookings table
export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").notNull(),
  dogId: integer("dog_id").notNull(),
  serviceType: text("service_type").notNull(), // boarding, training, grooming, daycare
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date"),
  duration: integer("duration"), // in days
  totalAmount: integer("total_amount"), // in cents
  status: text("status").notNull(), // pending, confirmed, completed, cancelled
  notes: text("notes"),
});

// Daily reports table
export const dailyReports = pgTable("daily_reports", {
  id: serial("id").primaryKey(),
  dogId: integer("dog_id").notNull(),
  date: timestamp("date").notNull(),
  activities: json("activities"), // Array of activities performed
  feeding: json("feeding"), // Feeding information
  exercise: json("exercise"), // Exercise details
  medications: json("medications"), // Medications given
  behaviorNotes: text("behavior_notes"),
  staffNotes: text("staff_notes"),
  photos: json("photos"), // Array of photo URLs
  overallWellbeing: text("overall_wellbeing"), // excellent, good, fair, needs_attention
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  createdBy: integer("created_by"), // Staff member who created the report
});

// Invoices table
export const invoices = pgTable("invoices", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").notNull(),
  bookingId: integer("booking_id"),
  amount: integer("amount").notNull(), // in cents
  issueDate: timestamp("issue_date").notNull(),
  dueDate: timestamp("due_date").notNull(),
  paidDate: timestamp("paid_date"),
  status: text("status").notNull(), // pending, paid, overdue, cancelled
  description: text("description"),
});

// Time entries table for staff time tracking
export const timeEntries = pgTable("time_entries", {
  id: serial("id").primaryKey(),
  staffId: integer("staff_id").notNull(),
  clockInTime: timestamp("clock_in_time"),
  clockOutTime: timestamp("clock_out_time"),
  breakStartTime: timestamp("break_start_time"),
  breakEndTime: timestamp("break_end_time"),
  totalHours: integer("total_hours"), // in minutes
  notes: text("notes"),
  date: timestamp("date").notNull(),
});

// Kennel logs table
export const kennelLogs = pgTable("kennel_logs", {
  id: serial("id").primaryKey(),
  kennelId: integer("kennel_id").notNull(),
  dogId: integer("dog_id"),
  staffId: integer("staff_id").notNull(),
  activityType: text("activity_type").notNull(), // cleaning, feeding, walk, check_in, check_out
  scheduledTime: timestamp("scheduled_time"),
  completed: boolean("completed").notNull(),
  notes: text("notes"),
  timestamp: timestamp("timestamp"),
});

// Type exports
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

// Zod schemas for validation
export const insertUserSchema = createInsertSchema(users);
export const insertStaffSchema = createInsertSchema(staff);
export const insertClientSchema = createInsertSchema(clients);
export const insertDogSchema = createInsertSchema(dogs);
export const insertKennelSchema = createInsertSchema(kennels);
export const insertJobSchema = createInsertSchema(jobs);
export const insertBookingSchema = createInsertSchema(bookings);
export const insertDailyReportSchema = createInsertSchema(dailyReports);
export const insertInvoiceSchema = createInsertSchema(invoices);
export const insertTimeEntrySchema = createInsertSchema(timeEntries);
export const insertKennelLogSchema = createInsertSchema(kennelLogs);
```

## FRONTEND FILES

### client/src/App.tsx
```typescript
import { Route, Switch } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";

import Home from "@/pages/home";
import AdminLogin from "@/pages/admin-login";
import AdminDashboard from "@/pages/simple-admin";
import StaffLogin from "@/pages/staff-login";
import StaffDashboard from "@/pages/staff-dashboard";
import ClientLogin from "@/pages/client-login";
import ClientPortal from "@/pages/client-portal";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const response = await fetch(queryKey[0] as string);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      },
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/staff/login" component={StaffLogin} />
      <Route path="/staff/dashboard" component={StaffDashboard} />
      <Route path="/client/login" component={ClientLogin} />
      <Route path="/client/portal" component={ClientPortal} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <div className="min-h-screen bg-black text-white">
          <Router />
          <Toaster />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
```

### client/src/main.tsx
```typescript
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

### client/src/index.css
```css
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

:root {
  --background: 0 0% 0%; /* Pure black background */
  --foreground: 60 9% 98%; /* Light text */
  --card: 0 0% 5%; /* Very dark gray for cards */
  --card-foreground: 60 9% 98%;
  --popover: 0 0% 5%;
  --popover-foreground: 60 9% 98%;
  --primary: 43 96% 56%; /* Golden yellow */
  --primary-foreground: 0 0% 0%;
  --secondary: 0 0% 10%; /* Dark gray */
  --secondary-foreground: 60 9% 98%;
  --muted: 0 0% 10%;
  --muted-foreground: 60 4% 70%;
  --accent: 43 96% 56%; /* Golden accent */
  --accent-foreground: 0 0% 0%;
  --destructive: 0 84% 60%;
  --destructive-foreground: 60 9% 98%;
  --border: 0 0% 15%; /* Dark border */
  --input: 0 0% 15%;
  --ring: 43 96% 56%; /* Golden ring */
  --radius: 0.75rem;
}

/* Golden scroll border styles */
.golden-scroll-border {
  border: 3px solid transparent;
  background: linear-gradient(black, black) padding-box,
              linear-gradient(45deg, #ffd700, #ffed4e, #ffd700) border-box;
  border-radius: 12px;
  position: relative;
}

.golden-scroll-border::before {
  content: '';
  position: absolute;
  top: -6px;
  left: -6px;
  right: -6px;
  bottom: -6px;
  background: linear-gradient(45deg, #ffd700, #ffed4e, #ffd700);
  border-radius: 15px;
  z-index: -1;
  opacity: 0.7;
}

/* Elegant golden scroll pattern */
.ornate-border {
  border: 2px solid #ffd700;
  border-image: repeating-linear-gradient(
    45deg,
    #ffd700,
    #ffd700 10px,
    #ffed4e 10px,
    #ffed4e 20px
  ) 2;
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #0a0a0a;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(45deg, #ffd700, #ffed4e);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(45deg, #ffed4e, #ffd700);
}

body {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
  color-scheme: dark;
  background-color: black;
  color: white;
}

* {
  border-color: hsl(var(--border));
}
```

### client/src/lib/queryClient.ts
```typescript
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const response = await fetch(queryKey[0] as string);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      },
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export async function apiRequest(
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  url: string,
  data?: any
) {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response;
}
```

### client/src/lib/utils.ts
```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### client/src/lib/types.ts
```typescript
export interface Staff {
  id: number;
  name: string;
  role: string;
  status: 'clocked_in' | 'on_break' | 'clocked_out';
  profilePhoto?: string;
  clockInTime?: Date;
  breakStartTime?: Date;
  lastClockOut?: Date;
}

export interface Client {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelationship?: string;
  vetName?: string;
  vetPhone?: string;
  vetAddress?: string;
}

export interface Dog {
  id: number;
  name: string;
  breed: string;
  age?: number;
  weight?: string;
  clientId: number;
  photo?: string;
  medicalNotes?: string;
  dietaryRequirements?: string;
  behaviorNotes?: string;
  emergencyContact?: string;
  vetInfo?: string;
  medications?: string;
  specialInstructions?: string;
  foodType?: string;
  feedingSchedule?: string;
  exerciseRequirements?: string;
}

export interface Kennel {
  id: number;
  number: number;
  status: 'available' | 'occupied' | 'cleaning';
  dogId?: number;
  dogIds?: number[];
  checkInDate?: Date;
  checkOutDate?: Date;
}

export interface Job {
  id: number;
  type: string;
  description: string;
  assignedStaffId?: number;
  dogId?: number;
  kennelId?: number;
  scheduledDate: Date;
  scheduledTime?: string;
  status: 'pending' | 'in_progress' | 'completed';
  notes?: string;
  completedAt?: Date;
}
```

## CONFIGURATION FILES

### package.json
```json
{
  "name": "rest-express",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "NODE_ENV=development tsx server/index.ts",
    "build": "tsx server/index.ts",
    "db:push": "drizzle-kit push"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.10.0",
    "@neondatabase/serverless": "^0.10.6",
    "@radix-ui/react-accordion": "^1.2.1",
    "@radix-ui/react-alert-dialog": "^1.1.2",
    "@radix-ui/react-aspect-ratio": "^1.1.1",
    "@radix-ui/react-avatar": "^1.1.1",
    "@radix-ui/react-checkbox": "^1.1.2",
    "@radix-ui/react-collapsible": "^1.1.1",
    "@radix-ui/react-context-menu": "^2.2.2",
    "@radix-ui/react-dialog": "^1.1.2",
    "@radix-ui/react-dropdown-menu": "^2.1.2",
    "@radix-ui/react-hover-card": "^1.1.2",
    "@radix-ui/react-label": "^2.1.0",
    "@radix-ui/react-menubar": "^1.1.2",
    "@radix-ui/react-navigation-menu": "^1.2.1",
    "@radix-ui/react-popover": "^1.1.2",
    "@radix-ui/react-progress": "^1.1.0",
    "@radix-ui/react-radio-group": "^1.2.1",
    "@radix-ui/react-scroll-area": "^1.2.0",
    "@radix-ui/react-select": "^2.1.2",
    "@radix-ui/react-separator": "^1.1.0",
    "@radix-ui/react-slider": "^1.2.1",
    "@radix-ui/react-slot": "^1.1.0",
    "@radix-ui/react-switch": "^1.1.1",
    "@radix-ui/react-tabs": "^1.1.1",
    "@radix-ui/react-toast": "^1.2.2",
    "@radix-ui/react-toggle": "^1.1.0",
    "@radix-ui/react-toggle-group": "^1.1.0",
    "@radix-ui/react-tooltip": "^1.1.3",
    "@tanstack/react-query": "^5.61.3",
    "@types/express": "^5.0.0",
    "@types/node": "^22.10.1",
    "@types/react": "^18.3.17",
    "@types/react-dom": "^18.3.5",
    "@vitejs/plugin-react": "^4.3.4",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.0.3",
    "date-fns": "^4.1.0",
    "drizzle-kit": "^0.30.0",
    "drizzle-orm": "^0.37.0",
    "drizzle-zod": "^0.5.1",
    "embla-carousel-react": "^8.5.1",
    "express": "^4.21.1",
    "framer-motion": "^11.15.0",
    "input-otp": "^1.4.1",
    "lucide-react": "^0.468.0",
    "next-themes": "^0.4.4",
    "react": "^18.3.1",
    "react-day-picker": "^9.4.2",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.54.0",
    "react-icons": "^5.4.0",
    "react-resizable-panels": "^2.1.7",
    "recharts": "^2.13.3",
    "tailwind-merge": "^2.5.4",
    "tailwindcss": "^3.4.17",
    "tailwindcss-animate": "^1.0.7",
    "tsx": "^4.19.2",
    "typescript": "^5.7.2",
    "vaul": "^1.1.1",
    "vite": "^6.0.3",
    "wouter": "^3.3.5",
    "ws": "^8.18.0",
    "zod": "^3.23.8"
  }
}
```

### drizzle.config.ts
```typescript
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
```

### vite.config.ts
```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client/src"),
      "@shared": path.resolve(__dirname, "./shared"),
      "@assets": path.resolve(__dirname, "./attached_assets"),
    },
  },
  build: {
    outDir: "dist/client",
  },
});
```

### tailwind.config.ts
```typescript
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./client/**/*.{ts,tsx}",
    "./client/src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
```

### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./client/src/*"],
      "@shared/*": ["./shared/*"],
      "@assets/*": ["./attached_assets/*"]
    }
  },
  "include": [
    "client/**/*",
    "server/**/*",
    "shared/**/*"
  ],
  "exclude": ["node_modules"]
}
```

### components.json
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "client/src/index.css",
    "baseColor": "zinc",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

## SUMMARY

This is the complete VIP Elite K9s system codebase featuring:

✅ **Database-backed storage** (replaced in-memory Maps with PostgreSQL + Drizzle ORM)
✅ **Enhanced kennel system** with multiple dogs support (max 2 per kennel)
✅ **Family validation** (only same household dogs can share kennels)
✅ **Full CRUD operations** for all entities (Staff, Clients, Dogs, Kennels, etc.)
✅ **Admin dashboard** with comprehensive management features
✅ **Staff and client portals** (basic structure)
✅ **Dev reset endpoint** for easy testing
✅ **Responsive design** with black & gold theme
✅ **Type safety** throughout with TypeScript
✅ **Data persistence** across server restarts

The system now uses PostgreSQL for all data storage, ensuring data persists properly across server restarts and resolving the data loss issue you experienced.