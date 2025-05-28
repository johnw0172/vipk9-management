# VIP Elite K9s Complete System Export

## ISSUE: Data Loss on Server Restart
- Client "John wood" disappeared 
- Dog "Odin" disappeared
- Only staff data persists
- Kennels reset to default state

## BACKEND CODE

### server/storage.ts
```typescript
import {
  users, staff, clients, dogs, kennels, jobs, bookings, dailyReports, invoices, timeEntries, kennelLogs,
  type User, type Staff, type Client, type Dog, type Kennel, type Job, type Booking, type DailyReport, type Invoice, type TimeEntry, type KennelLog,
  type InsertUser, type InsertStaff, type InsertClient, type InsertDog, type InsertKennel, type InsertJob, type InsertBooking, type InsertDailyReport, type InsertInvoice, type InsertTimeEntry, type InsertKennelLog
} from "@shared/schema";

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

  // Clients
  getAllClients(): Promise<Client[]>;
  getClient(id: number): Promise<Client | undefined>;
  getClientByEmail(email: string): Promise<Client | undefined>;
  createClient(client: InsertClient): Promise<Client>;
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

  // Invoices
  getAllInvoices(): Promise<Invoice[]>;
  getInvoice(id: number): Promise<Invoice | undefined>;
  getInvoicesByClient(clientId: number): Promise<Invoice[]>;
  createInvoice(invoice: InsertInvoice): Promise<Invoice>;
  updateInvoice(id: number, updates: Partial<Invoice>): Promise<Invoice | undefined>;

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

    // Create admin user
    const adminUser: User = {
      id: 1,
      username: "admin",
      password: "password123",
      role: "admin"
    };
    this.users.set(1, adminUser);

    // Create sample staff
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

    // Initialize 20 empty kennels
    for (let i = 1; i <= 20; i++) {
      this.createKennel({
        number: i
      });
    }

    this.initialized = true;
  }

  // KENNEL METHODS WITH ENHANCED SUPPORT
  async createKennel(insertKennel: InsertKennel): Promise<Kennel> {
    const id = this.currentId++;
    const kennel: Kennel = { 
      ...insertKennel, 
      id, 
      status: "available",
      dogId: null,
      dogIds: [], // Initialize empty array for multiple dogs
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

  // ALL OTHER METHODS (Users, Staff, Clients, Dogs, Jobs, etc.)
  // ... [truncated for brevity, but all methods follow similar pattern]
}

export const storage = new MemStorageClass();
```

### server/routes.ts - Enhanced Kennel Assignment
```typescript
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

    // Check if kennel already has dogs
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

    // Merge dog IDs (existing + new)
    const allDogIds = [...currentDogIds, ...dogIds];
    
    const updated = await storage.updateKennel(kennelId, {
      dogId: dogIds[0], // Keep backward compatibility
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

// Unassign dogs from kennel
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
```

### shared/schema.ts - Enhanced Schema
```typescript
import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";

// Enhanced kennels table with multiple dogs support
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

export type Kennel = typeof kennels.$inferSelect;
export type InsertKennel = typeof kennels.$inferInsert;

// Other tables...
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
```

## FRONTEND CODE

### Enhanced Kennel Grid Display
```typescript
// Enhanced kennel grid with multiple dogs support
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

    return (
      <div key={kennelNumber} className={`relative border-2 rounded-lg p-2 h-28 cursor-pointer transition-all hover:scale-105 ${getKennelStyle()}`}>
        {/* Enhanced display with unassign button */}
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
    );
  })}
</div>
```

## PROBLEM ANALYSIS NEEDED

**Main Issue**: Data disappears on server restart
- Staff data persists ✅
- Client and dog data disappears ❌
- Kennel assignments reset ❌

**Suspected Causes**:
1. In-memory storage reinitialization bug
2. Race condition in storage initialization  
3. Data corruption during server restart
4. Missing persistence for certain data types

**Request**: Please analyze this code with ChatGPT to identify why client and dog data isn't persisting properly across server restarts.