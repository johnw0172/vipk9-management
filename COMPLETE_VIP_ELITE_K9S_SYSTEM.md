# COMPLETE VIP ELITE K9S SYSTEM CODE EXPORT

## PROBLEM: Data Loss on Server Restart
Client and dog data disappears after server restart, only staff persists.

## 1. BACKEND FILES

### server/storage.ts (COMPLETE)
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

  // [Rest of methods truncated for space - Jobs, Bookings, DailyReports, Invoices, TimeEntries, KennelLogs]
  // All follow similar pattern with Map operations
}

export const storage = new MemStorageClass();
```

### server/routes.ts (COMPLETE)
```typescript
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Enhanced kennel assignment
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

  const httpServer = createServer(app);
  return httpServer;
}
```

### shared/schema.ts (COMPLETE)
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

## 2. FRONTEND FILES

### client/src/pages/simple-admin.tsx (FIRST PART - 1400+ lines total)
```typescript
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, Users, UserPlus, Home, Coffee, LogOut, UserCheck, ArrowLeft, Trash2, AlertTriangle } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import logoPath from "@assets/LOGO JPEG.jpg";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isAddingStaff, setIsAddingStaff] = useState(false);
  const [isAddingClient, setIsAddingClient] = useState(false);
  const [isAddingDog, setIsAddingDog] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
  const [viewingClient, setViewingClient] = useState<any>(null);
  const [viewingDog, setViewingDog] = useState<any>(null);
  const [assigningKennel, setAssigningKennel] = useState<any>(null);
  const [selectedDogForKennel, setSelectedDogForKennel] = useState<number>(0);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

  // Enhanced kennel assignment with multiple dogs support
  const assignDogToKennelMutation = useMutation({
    mutationFn: ({ kennelId, dogId, checkInDate, checkOutDate }: { 
      kennelId: number; 
      dogId: number; 
      checkInDate: string; 
      checkOutDate: string; 
    }) => 
      apiRequest("POST", "/api/kennels/assign", {
        kennelIds: [kennelId],
        dogIds: [dogId],
        checkInDate,
        checkOutDate
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["/api/kennels"] });
      await queryClient.refetchQueries({ queryKey: ["/api/kennels"] });
      setAssigningKennel(null);
      setSelectedDogForKennel(0);
      setCheckInDate("");
      setCheckOutDate("");
      toast({
        title: "Dog Assigned Successfully! ✓",
        description: "Dog has been checked into the kennel",
      });
    },
  });

  // Enhanced kennel grid display with multiple dogs
  const renderKennelGrid = () => (
    <div className="grid grid-cols-5 gap-3">
      {Array.from({ length: 20 }, (_, i) => {
        const kennelNumber = i + 1;
        const kennel = kennels.find((k: any) => k.number === kennelNumber);
        
        // Enhanced: Support multiple dogs
        const assignedDogIds = kennel?.dogIds || (kennel?.dogId ? [kennel.dogId] : []);
        const assignedDogs = assignedDogIds.map((dogId: number) => 
          dogs.find((d: any) => d.id === dogId)
        ).filter(Boolean);
        
        // Enhanced: Color coding based on occupancy
        const dogCount = assignedDogs.length;
        const getKennelStyle = () => {
          if (kennel?.status === 'cleaning') return 'border-yellow-400 bg-yellow-900/20';
          if (dogCount === 0) return 'border-green-400 bg-green-900/20 hover:bg-green-800/30';
          if (dogCount === 1) return 'border-red-400 bg-red-900/20';
          if (dogCount === 2) return 'border-orange-400 bg-orange-900/20';
          return 'border-gray-400 bg-gray-900/20';
        };

        const getStatusText = () => {
          if (kennel?.status === 'cleaning') return 'Cleaning';
          if (dogCount === 0) return 'Available';
          if (dogCount === 1) return 'Occupied';
          if (dogCount === 2) return '2 Dogs Sharing';
          return 'Full';
        };

        const getStatusColor = () => {
          if (kennel?.status === 'cleaning') return 'text-yellow-300';
          if (dogCount === 0) return 'text-green-300';
          if (dogCount === 1) return 'text-red-300';
          if (dogCount === 2) return 'text-orange-300';
          return 'text-gray-300';
        };
        
        return (
          <div
            key={kennelNumber}
            className={`
              relative border-2 rounded-lg p-2 h-28 cursor-pointer transition-all hover:scale-105
              ${getKennelStyle()}
            `}
            onClick={() => handleKennelClick(kennel)}
          >
            <div className="text-center h-full flex flex-col justify-between">
              <div className="text-white font-bold text-sm">#{kennelNumber}</div>
              <div className={`text-xs font-medium ${getStatusColor()}`}>
                {getStatusText()}
              </div>
              
              {/* Display assigned dogs */}
              {assignedDogs.length > 0 && (
                <div className="text-white text-xs space-y-0.5">
                  {assignedDogs.slice(0, 2).map((dog: any, idx: number) => (
                    <div key={dog.id} className="truncate">
                      {dog.name}
                      {assignedDogs.length > 1 && idx === 0 && (
                        <span className="text-gray-400"> & </span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Unassign button for occupied kennels */}
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
            </div>
            
            {/* Enhanced status indicator */}
            <div className={`absolute bottom-1 right-1 w-2 h-2 rounded-full ${
              kennel?.status === 'cleaning' ? 'bg-yellow-400' :
              dogCount === 0 ? 'bg-green-400' :
              dogCount === 1 ? 'bg-red-400' :
              dogCount === 2 ? 'bg-orange-400' :
              'bg-gray-400'
            }`}></div>
          </div>
        );
      })}
    </div>
  );

  // [REST OF 1400+ LINE COMPONENT CONTINUES...]
}
```

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
    "zod": "^3.23.8"
  }
}
```

## PROBLEM ANALYSIS
- Staff data persists ✅ (created in initialization)
- Client and dog data disappears ❌ (created at runtime)
- In-memory storage gets reinitialized on restart, losing runtime data
- Only initialization data survives restarts

Copy this complete system code to ChatGPT for analysis of the data persistence issue.