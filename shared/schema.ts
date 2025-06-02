import { pgTable, text, serial, integer, boolean, timestamp, json, date, varchar, unique } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table for admin authentication
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("admin"), // admin, staff, client
});

// Staff table - Enhanced for comprehensive staff management
export const staff = pgTable("staff", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(), // Head Trainer, Boarding Specialist, Dog Walker, etc.
  pin: text("pin").notNull(), // 4-digit PIN (hashed)
  profilePhoto: text("profile_photo"),
  hourlyRate: integer("hourly_rate").default(0), // Hourly wage in pence
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
  feedingInstructions: text("feeding_instructions"),
  feedingTimes: json("feeding_times"), // Array of feeding schedule
  medication: text("medication"),
  medicationSchedule: json("medication_schedule"), // Medication timing details
  specialNotes: text("special_notes"),
  behaviorNotes: text("behavior_notes"),
  emergencyContact: text("emergency_contact"),
  vetInfo: text("vet_info"),
  itemsBrought: json("items_brought"), // Toys, beds, etc. brought by owner
  allergies: text("allergies"),
  exerciseRequirements: text("exercise_requirements"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Kennels table
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
  serviceType: text("service_type").notNull(), // boarding, training, walking, grooming
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date"),
  startTime: text("start_time"), // for training/walking (e.g., "09:00")
  endTime: text("end_time"), // for training/walking (e.g., "10:00")
  duration: integer("duration"), // in minutes for training/walking
  kennelNumber: integer("kennel_number"), // only for boarding services
  staffId: integer("staff_id").references(() => staff.id), // Assign staff for training/walking
  status: text("status").notNull().default("pending"), // pending, confirmed, in_progress, completed, cancelled
  notes: text("notes"),
  totalAmount: integer("total_amount"), // in pence
});

// Staff time tracking table
export const staffTimeTracking = pgTable("staff_time_tracking", {
  id: serial("id").primaryKey(),
  staffId: integer("staff_id").notNull().references(() => staff.id),
  clockIn: timestamp("clock_in").notNull(),
  clockOut: timestamp("clock_out"),
  breakDuration: integer("break_duration").default(0), // Break time in minutes
  totalHours: integer("total_hours").default(0), // Total hours worked in minutes
  associatedTaskId: integer("associated_task_id"),
  date: timestamp("date").defaultNow(),
  wageCalculated: integer("wage_calculated").default(0), // Calculated wage in pence
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Keep existing timeEntries for backward compatibility
export const timeEntries = pgTable("time_entries", {
  id: serial("id").primaryKey(),
  staffId: integer("staff_id").notNull(),
  clockInTime: timestamp("clock_in_time").notNull(),
  clockOutTime: timestamp("clock_out_time"),
  breakStartTime: timestamp("break_start_time"),
  breakEndTime: timestamp("break_end_time"),
  totalBreakTime: integer("total_break_time"), // in minutes
  notes: text("notes"),
  date: timestamp("date").notNull(),
});

// Staff tasks table for task assignments
export const staffTasks = pgTable("staff_tasks", {
  id: serial("id").primaryKey(),
  staffId: integer("staff_id").notNull().references(() => staff.id),
  taskType: text("task_type").notNull(), // feeding, walking, cleaning, training
  status: text("status").notNull().default("pending"), // pending, in_progress, completed
  notes: text("notes"),
  associatedKennelId: integer("associated_kennel_id").references(() => kennels.id),
  associatedDogId: integer("associated_dog_id").references(() => dogs.id),
  associatedBookingId: integer("associated_booking_id").references(() => bookings.id),
  assignedDate: timestamp("assigned_date").defaultNow(),
  scheduledDate: timestamp("scheduled_date"),
  completedDate: timestamp("completed_date"),
  adminNotes: text("admin_notes"), // Admin can add notes about the task
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Kennel logs table for detailed tracking
export const kennelLogs = pgTable("kennel_logs", {
  id: serial("id").primaryKey(),
  kennelId: integer("kennel_id").notNull(),
  dogId: integer("dog_id"),
  staffId: integer("staff_id").notNull(),
  activityType: text("activity_type").notNull(), // feeding, cleaning, walking, medication, exercise
  completed: boolean("completed").notNull().default(false),
  notes: text("notes"),
  timestamp: timestamp("timestamp").defaultNow(),
  scheduledTime: timestamp("scheduled_time"),
});

// Daily Reports table - Comprehensive staff reports for each dog interaction
export const dailyReports = pgTable("daily_reports", {
  id: serial("id").primaryKey(),
  dogId: integer("dog_id").notNull().references(() => dogs.id),
  kennelId: integer("kennel_id").notNull().references(() => kennels.id),
  staffId: integer("staff_id").notNull().references(() => staff.id),
  reportDate: date("report_date").notNull(),
  
  // Exercise section
  exerciseNotes: text("exercise_notes").notNull(),
  exerciseDuration: varchar("exercise_duration", { length: 32 }),
  exerciseType: varchar("exercise_type", { length: 64 }),
  exerciseEnergyLevel: varchar("exercise_energy_level", { length: 32 }),
  
  // Health section
  healthNotes: text("health_notes").notNull(),
  appetite: varchar("appetite", { length: 32 }),
  behaviorChanges: text("behavior_changes"),
  healthConcerns: text("health_concerns"),
  
  // Feeding section
  feedingTime: varchar("feeding_time", { length: 32 }),
  feedingAmount: varchar("feeding_amount", { length: 32 }),
  feedingAppetite: varchar("feeding_appetite", { length: 32 }),
  feedingNotes: text("feeding_notes"),
  
  // Bonding & Playing section
  bondingNotes: text("bonding_notes").notNull(),
  playPreferences: text("play_preferences"),
  mood: varchar("mood", { length: 32 }),
  
  // Training section
  trainingCommands: text("training_commands"),
  trainingProgress: text("training_progress"),
  trainingNotes: text("training_notes"),
  
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  deletedAt: timestamp("deleted_at"),
}, (table) => ({
  uniqueReportPerDogStaffDate: unique().on(table.dogId, table.staffId, table.reportDate)
}));

// Service Pricing table
export const servicePricing = pgTable("service_pricing", {
  id: serial("id").primaryKey(),
  serviceName: text("service_name").notNull(),
  serviceType: text("service_type").notNull(), // 'boarding', 'training_1on1', 'training_group', 'walking'
  pricePerUnit: integer("price_per_unit").notNull(), // in pence
  unit: text("unit").notNull(), // 'per_night', 'per_session', 'per_walk', 'per_hour'
  description: text("description"),
  isActive: boolean("is_active").default(true),
  updatedAt: timestamp("updated_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Estimates table - Auto-generated from calendar bookings
export const estimates = pgTable("estimates", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").notNull(),
  bookingId: integer("booking_id"),
  kennelNumber: integer("kennel_number"),
  dogIds: integer("dog_ids").array().notNull(), // Array of dog IDs
  serviceType: text("service_type").notNull(),
  checkInDate: timestamp("check_in_date").notNull(),
  checkOutDate: timestamp("check_out_date").notNull(),
  nights: integer("nights").notNull(),
  pricePerNight: integer("price_per_night").notNull(), // in pence
  totalAmount: integer("total_amount").notNull(), // in pence
  status: text("status").notNull().default("pending"), // pending, approved, converted_to_invoice, cancelled
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Invoices table - Converted from estimates
export const invoices = pgTable("invoices", {
  id: serial("id").primaryKey(),
  estimateId: integer("estimate_id"), // Link back to original estimate
  clientId: integer("client_id").notNull(),
  bookingId: integer("booking_id"),
  amount: integer("amount").notNull(), // Original amount in pence
  discountAmount: integer("discount_amount").default(0), // Discount in pence
  discountReason: text("discount_reason"), // Reason for discount
  finalAmount: integer("final_amount").notNull(), // Final amount after discount
  paymentStatus: text("payment_status").notNull().default("unpaid"), // "paid" or "unpaid"
  paymentDate: timestamp("payment_date"), // When payment was received
  paymentMethod: text("payment_method"), // How payment was made
  issueDate: timestamp("issue_date").notNull(),
  dueDate: timestamp("due_date"),
  description: text("description"),
  services: text("services"), // JSON string of services breakdown
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Group training sessions table - Admin creates time slots, clients book into them
export const groupTrainingSessions = pgTable("group_training_sessions", {
  id: serial("id").primaryKey(),
  sessionName: text("session_name").notNull(), // "Saturday Morning Group Class"
  sessionDate: timestamp("session_date").notNull(),
  startTime: text("start_time").notNull(), // "10:00"
  endTime: text("end_time").notNull(), // "11:00"
  maxParticipants: integer("max_participants").notNull().default(6), // Maximum dogs per session
  currentParticipants: integer("current_participants").notNull().default(0),
  staffId: integer("staff_id").references(() => staff.id),
  pricePerDog: integer("price_per_dog").notNull().default(40), // £40 per dog
  status: text("status").notNull().default("active"), // active, cancelled, completed
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Group training bookings - Links clients/dogs to group sessions
export const groupTrainingBookings = pgTable("group_training_bookings", {
  id: serial("id").primaryKey(),
  sessionId: integer("session_id").notNull().references(() => groupTrainingSessions.id),
  clientId: integer("client_id").notNull().references(() => clients.id),
  dogId: integer("dog_id").notNull().references(() => dogs.id),
  bookingDate: timestamp("booking_date").defaultNow(),
  status: text("status").notNull().default("confirmed"), // confirmed, cancelled, completed
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Duplicate declarations removed - using earlier declarations with updated fields

// Staff Bookings Junction table - Links staff to specific bookings
export const staffBookings = pgTable("staff_bookings", {
  id: serial("id").primaryKey(),
  staffId: integer("staff_id").notNull().references(() => staff.id),
  bookingId: integer("booking_id").notNull().references(() => bookings.id),
  role: text("role").notNull(), // primary, assistant, observer
  assignedDate: timestamp("assigned_date").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});



// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

export const insertStaffSchema = createInsertSchema(staff).omit({
  id: true,
  status: true,
  clockInTime: true,
  breakStartTime: true,
  lastClockOut: true,
});

export const insertClientSchema = createInsertSchema(clients).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertDogSchema = createInsertSchema(dogs).omit({
  id: true,
});

export const insertKennelSchema = createInsertSchema(kennels).omit({
  id: true,
  status: true,
  dogId: true,
  checkInDate: true,
  checkOutDate: true,
});

export const insertJobSchema = createInsertSchema(jobs).omit({
  id: true,
  status: true,
  completedAt: true,
});

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  status: true,
});

export const insertDailyReportSchema = createInsertSchema(dailyReports).omit({
  id: true,
});

export const insertEstimateSchema = createInsertSchema(estimates).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertInvoiceSchema = createInsertSchema(invoices).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTimeEntrySchema = createInsertSchema(timeEntries).omit({
  id: true,
});

export const insertKennelLogSchema = createInsertSchema(kennelLogs).omit({
  id: true,
  timestamp: true,
});

export const insertServicePricingSchema = createInsertSchema(servicePricing).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertGroupTrainingSessionSchema = createInsertSchema(groupTrainingSessions).omit({
  id: true,
  currentParticipants: true,
  createdAt: true,
  updatedAt: true,
});

export const insertGroupTrainingBookingSchema = createInsertSchema(groupTrainingBookings).omit({
  id: true,
  bookingDate: true,
  createdAt: true,
});

export const insertStaffTaskSchema = createInsertSchema(staffTasks).omit({
  id: true,
  assignedDate: true,
  createdAt: true,
  updatedAt: true,
});

export const insertStaffTimeTrackingSchema = createInsertSchema(staffTimeTracking).omit({
  id: true,
  date: true,
  createdAt: true,
  updatedAt: true,
});

export const insertStaffBookingSchema = createInsertSchema(staffBookings).omit({
  id: true,
  assignedDate: true,
  createdAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Staff = typeof staff.$inferSelect;
export type InsertStaff = z.infer<typeof insertStaffSchema>;

export type Client = typeof clients.$inferSelect;
export type InsertClient = z.infer<typeof insertClientSchema>;

export type Dog = typeof dogs.$inferSelect;
export type InsertDog = z.infer<typeof insertDogSchema>;

export type Kennel = typeof kennels.$inferSelect;
export type InsertKennel = z.infer<typeof insertKennelSchema>;

export type Job = typeof jobs.$inferSelect;
export type InsertJob = z.infer<typeof insertJobSchema>;

export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;



export type Estimate = typeof estimates.$inferSelect;
export type InsertEstimate = typeof insertEstimateSchema._type;
export type Invoice = typeof invoices.$inferSelect;
export type InsertInvoice = z.infer<typeof insertInvoiceSchema>;

export type TimeEntry = typeof timeEntries.$inferSelect;
export type InsertTimeEntry = z.infer<typeof insertTimeEntrySchema>;

export type KennelLog = typeof kennelLogs.$inferSelect;
export type InsertKennelLog = z.infer<typeof insertKennelLogSchema>;

export type ServicePricing = typeof servicePricing.$inferSelect;
export type InsertServicePricing = z.infer<typeof insertServicePricingSchema>;

export type GroupTrainingSession = typeof groupTrainingSessions.$inferSelect;
export type InsertGroupTrainingSession = z.infer<typeof insertGroupTrainingSessionSchema>;

export type GroupTrainingBooking = typeof groupTrainingBookings.$inferSelect;
export type InsertGroupTrainingBooking = z.infer<typeof insertGroupTrainingBookingSchema>;

export type StaffTask = typeof staffTasks.$inferSelect;
export type InsertStaffTask = z.infer<typeof insertStaffTaskSchema>;

export type StaffTimeTracking = typeof staffTimeTracking.$inferSelect;
export type InsertStaffTimeTracking = z.infer<typeof insertStaffTimeTrackingSchema>;

export type StaffBooking = typeof staffBookings.$inferSelect;
export type InsertStaffBooking = z.infer<typeof insertStaffBookingSchema>;

export type DailyReport = typeof dailyReports.$inferSelect;
export type InsertDailyReport = z.infer<typeof insertDailyReportSchema>;
