# 🏆 VIP Elite K9s - COMPLETE WORKING CODE EXPORT

**Every single line of your working VIP Elite K9s system!**

---

## 📄 package.json
```json
{
  "name": "rest-express",
  "version": "1.0.0",
  "type": "module",
  "license": "MIT",
  "scripts": {
    "dev": "NODE_ENV=development tsx server/index.ts",
    "build": "vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist",
    "start": "NODE_ENV=production node dist/index.js",
    "check": "tsc",
    "db:push": "drizzle-kit push"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.10.0",
    "@jridgewell/trace-mapping": "^0.3.25",
    "@neondatabase/serverless": "^0.10.4",
    "@radix-ui/react-accordion": "^1.2.4",
    "@radix-ui/react-alert-dialog": "^1.1.7",
    "@radix-ui/react-aspect-ratio": "^1.1.3",
    "@radix-ui/react-avatar": "^1.1.4",
    "@radix-ui/react-checkbox": "^1.1.5",
    "@radix-ui/react-collapsible": "^1.1.4",
    "@radix-ui/react-context-menu": "^2.2.7",
    "@radix-ui/react-dialog": "^1.1.7",
    "@radix-ui/react-dropdown-menu": "^2.1.7",
    "@radix-ui/react-hover-card": "^1.1.7",
    "@radix-ui/react-label": "^2.1.3",
    "@radix-ui/react-menubar": "^1.1.7",
    "@radix-ui/react-navigation-menu": "^1.2.6",
    "@radix-ui/react-popover": "^1.1.7",
    "@radix-ui/react-progress": "^1.1.3",
    "@radix-ui/react-radio-group": "^1.2.4",
    "@radix-ui/react-scroll-area": "^1.2.4",
    "@radix-ui/react-select": "^2.1.7",
    "@radix-ui/react-separator": "^1.1.3",
    "@radix-ui/react-slider": "^1.2.4",
    "@radix-ui/react-slot": "^1.2.0",
    "@radix-ui/react-switch": "^1.1.4",
    "@radix-ui/react-tabs": "^1.1.4",
    "@radix-ui/react-toast": "^1.2.7",
    "@radix-ui/react-toggle": "^1.1.3",
    "@radix-ui/react-toggle-group": "^1.1.3",
    "@radix-ui/react-tooltip": "^1.2.0",
    "@stripe/react-stripe-js": "^3.7.0",
    "@stripe/stripe-js": "^7.3.0",
    "@tanstack/react-query": "^5.60.5",
    "@types/memoizee": "^0.4.12",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.1.1",
    "connect-pg-simple": "^10.0.0",
    "date-fns": "^3.6.0",
    "drizzle-orm": "^0.39.1",
    "drizzle-zod": "^0.7.0",
    "embla-carousel-react": "^8.6.0",
    "express": "^4.21.2",
    "express-session": "^1.18.1",
    "framer-motion": "^11.13.1",
    "input-otp": "^1.4.2",
    "lucide-react": "^0.453.0",
    "memoizee": "^0.4.17",
    "memorystore": "^1.6.7",
    "next-themes": "^0.4.6",
    "openid-client": "^6.5.0",
    "passport": "^0.7.0",
    "passport-local": "^1.0.0",
    "react": "^18.3.1",
    "react-day-picker": "^8.10.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.55.0",
    "react-icons": "^5.4.0",
    "react-resizable-panels": "^2.1.7",
    "recharts": "^2.15.2",
    "stripe": "^18.1.1",
    "tailwind-merge": "^2.6.0",
    "tailwindcss-animate": "^1.0.7",
    "tw-animate-css": "^1.2.5",
    "vaul": "^1.1.2",
    "wouter": "^3.3.5",
    "ws": "^8.18.0",
    "zod": "^3.24.2",
    "zod-validation-error": "^3.4.0"
  },
  "devDependencies": {
    "@replit/vite-plugin-cartographer": "^0.2.5",
    "@replit/vite-plugin-runtime-error-modal": "^0.0.3",
    "@tailwindcss/typography": "^0.5.15",
    "@tailwindcss/vite": "^4.1.3",
    "@types/connect-pg-simple": "^7.0.3",
    "@types/express": "4.17.21",
    "@types/express-session": "^1.18.0",
    "@types/node": "20.16.11",
    "@types/passport": "^1.0.16",
    "@types/passport-local": "^1.0.38",
    "@types/react": "^18.3.11",
    "@types/react-dom": "^18.3.1",
    "@types/ws": "^8.5.13",
    "@vitejs/plugin-react": "^4.3.2",
    "autoprefixer": "^10.4.20",
    "drizzle-kit": "^0.30.4",
    "esbuild": "^0.25.0",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.17",
    "tsx": "^4.19.1",
    "typescript": "5.6.3",
    "vite": "^5.4.14"
  },
  "optionalDependencies": {
    "bufferutil": "^4.0.8"
  }
}
```

---

## 📄 tsconfig.json
```json
{
  "include": ["client/src/**/*", "shared/**/*", "server/**/*"],
  "exclude": ["node_modules", "build", "dist", "**/*.test.ts"],
  "compilerOptions": {
    "incremental": true,
    "tsBuildInfoFile": "./node_modules/typescript/tsbuildinfo",
    "noEmit": true,
    "module": "ESNext",
    "strict": true,
    "lib": ["esnext", "dom", "dom.iterable"],
    "jsx": "preserve",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "allowImportingTsExtensions": true,
    "moduleResolution": "bundler",
    "baseUrl": ".",
    "types": ["node", "vite/client"],
    "paths": {
      "@/*": ["./client/src/*"],
      "@shared/*": ["./shared/*"]
    }
  }
}
```

---

## 📄 vite.config.ts
```json
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
});
```

---

## 📄 tailwind.config.ts
```json
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
```

---

## 📄 drizzle.config.ts
```json
import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL, ensure the database is provisioned");
}

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
```

---

## 📄 postcss.config.js
```json
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

---

## 📄 components.json
```json
{
    "$schema": "https://ui.shadcn.com/schema.json",
    "style": "new-york",
    "rsc": false,
    "tsx": true,
    "tailwind": {
      "config": "tailwind.config.ts",
      "css": "client/src/index.css",
      "baseColor": "neutral",
      "cssVariables": true,
      "prefix": ""
    },
    "aliases": {
      "components": "@/components",
      "utils": "@/lib/utils",
      "ui": "@/components/ui",
      "lib": "@/lib",
      "hooks": "@/hooks"
    }
}```

---

## 📄 shared/schema.ts
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
  dogId: integer("dog_id"),
  checkInDate: timestamp("check_in_date"),
  checkOutDate: timestamp("check_out_date"),
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
  duration: integer("duration"), // in minutes for training/walking
  status: text("status").notNull().default("pending"), // pending, confirmed, in_progress, completed, cancelled
  notes: text("notes"),
  totalAmount: integer("total_amount"), // in pence
});

// Staff time tracking table
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

// Daily reports table
export const dailyReports = pgTable("daily_reports", {
  id: serial("id").primaryKey(),
  dogId: integer("dog_id").notNull(),
  date: timestamp("date").notNull(),
  activities: json("activities"), // JSON array of completed activities
  feeding: json("feeding"), // feeding times and amounts
  exercise: json("exercise"), // exercise details
  medications: json("medications"), // medication given
  notes: text("notes"),
  staffNotes: text("staff_notes"),
  photos: json("photos"), // array of photo URLs
  behaviorNotes: text("behavior_notes"),
  overallWellbeing: text("overall_wellbeing"), // good, fair, needs_attention
  createdBy: integer("created_by"), // staff member who created
  createdAt: timestamp("created_at").defaultNow(),
});

// Invoices table
export const invoices = pgTable("invoices", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").notNull(),
  bookingId: integer("booking_id"),
  amount: integer("amount").notNull(), // in pence
  status: text("status").notNull().default("unpaid"), // unpaid, paid, overdue
  issueDate: timestamp("issue_date").notNull(),
  dueDate: timestamp("due_date").notNull(),
  paidDate: timestamp("paid_date"),
  description: text("description"),
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

export const insertInvoiceSchema = createInsertSchema(invoices).omit({
  id: true,
});

export const insertTimeEntrySchema = createInsertSchema(timeEntries).omit({
  id: true,
});

export const insertKennelLogSchema = createInsertSchema(kennelLogs).omit({
  id: true,
  timestamp: true,
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

export type DailyReport = typeof dailyReports.$inferSelect;
export type InsertDailyReport = z.infer<typeof insertDailyReportSchema>;

export type Invoice = typeof invoices.$inferSelect;
export type InsertInvoice = z.infer<typeof insertInvoiceSchema>;

export type TimeEntry = typeof timeEntries.$inferSelect;
export type InsertTimeEntry = z.infer<typeof insertTimeEntrySchema>;

export type KennelLog = typeof kennelLogs.$inferSelect;
export type InsertKennelLog = z.infer<typeof insertKennelLogSchema>;
```

---

## 📄 server/db.ts
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

---

## 📄 server/index.ts
```typescript
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
```

---

## 📄 server/routes.ts
```typescript
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertStaffSchema, insertClientSchema, insertDogSchema, insertJobSchema, insertBookingSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      res.json({ user: { id: user.id, username: user.username, role: user.role } });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/auth/staff-login", async (req, res) => {
    try {
      const { pin } = req.body;
      const staff = await storage.getStaffByPin(pin);
      
      if (!staff) {
        return res.status(401).json({ message: "Invalid PIN" });
      }
      
      const now = new Date();
      const today = new Date().toISOString().split('T')[0];
      
      // Create a new time entry for this clock-in
      const timeEntry = await storage.createTimeEntry({
        staffId: staff.id,
        clockInTime: now,
        date: new Date(today),
        notes: "Clocked in via PIN login"
      });
      
      // Update staff status
      const updatedStaff = await storage.updateStaff(staff.id, {
        status: "clocked_in",
        clockInTime: now,
        breakStartTime: null // Clear any previous break time
      });
      
      res.json({ 
        staff: updatedStaff,
        timeEntry,
        message: "Successfully clocked in"
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
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
      const validatedData = insertStaffSchema.parse(req.body);
      const staff = await storage.createStaff(validatedData);
      res.json(staff);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.patch("/api/staff/:id/status", async (req, res) => {
    try {
      const { id } = req.params;
      const { status, notes } = req.body;
      const staffId = parseInt(id);
      const now = new Date();
      
      // Get current staff to check their current status
      const currentStaff = await storage.getStaff(staffId);
      if (!currentStaff) {
        return res.status(404).json({ message: "Staff member not found" });
      }

      const updates: any = { status };
      let timeEntryUpdate = null;

      if (status === "on_break") {
        // Starting a break
        updates.breakStartTime = now;
        
        // Find current open time entry and update it
        const today = new Date().toISOString().split('T')[0];
        const todayEntries = await storage.getTimeEntriesByStaff(staffId);
        const currentEntry = todayEntries.find(entry => 
          entry.date.toISOString().split('T')[0] === today && !entry.clockOutTime
        );
        
        if (currentEntry) {
          timeEntryUpdate = await storage.updateTimeEntry(currentEntry.id, {
            breakStartTime: now
          });
        }
        
      } else if (status === "clocked_in") {
        // Returning from break or clocking in
        if (currentStaff.status === "on_break" && currentStaff.breakStartTime) {
          // Calculate break duration
          const breakDuration = Math.floor((now.getTime() - currentStaff.breakStartTime.getTime()) / (1000 * 60));
          
          // Update time entry with break end
          const today = new Date().toISOString().split('T')[0];
          const todayEntries = await storage.getTimeEntriesByStaff(staffId);
          const currentEntry = todayEntries.find(entry => 
            entry.date.toISOString().split('T')[0] === today && !entry.clockOutTime
          );
          
          if (currentEntry) {
            const totalBreakTime = (currentEntry.totalBreakTime || 0) + breakDuration;
            timeEntryUpdate = await storage.updateTimeEntry(currentEntry.id, {
              breakEndTime: now,
              totalBreakTime
            });
          }
        }
        
        updates.clockInTime = currentStaff.clockInTime || now;
        updates.breakStartTime = null;
        
      } else if (status === "clocked_out") {
        // Clocking out
        updates.lastClockOut = now;
        updates.clockInTime = null;
        updates.breakStartTime = null;
        
        // Complete the current time entry
        const today = new Date().toISOString().split('T')[0];
        const todayEntries = await storage.getTimeEntriesByStaff(staffId);
        const currentEntry = todayEntries.find(entry => 
          entry.date.toISOString().split('T')[0] === today && !entry.clockOutTime
        );
        
        if (currentEntry) {
          let totalBreakTime = currentEntry.totalBreakTime || 0;
          
          // If they're on break when clocking out, add current break time
          if (currentStaff.status === "on_break" && currentStaff.breakStartTime) {
            const currentBreakDuration = Math.floor((now.getTime() - currentStaff.breakStartTime.getTime()) / (1000 * 60));
            totalBreakTime += currentBreakDuration;
          }
          
          timeEntryUpdate = await storage.updateTimeEntry(currentEntry.id, {
            clockOutTime: now,
            totalBreakTime,
            notes: notes || "Clocked out"
          });
        }
      }
      
      const staff = await storage.updateStaff(staffId, updates);
      
      res.json({ 
        staff, 
        timeEntry: timeEntryUpdate,
        message: `Successfully ${status.replace('_', ' ')}`
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Client authentication routes
  app.post("/api/auth/client-login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const client = await storage.getClientByEmail(email);
      
      if (!client || client.password !== password) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      
      res.json({ 
        client: {
          id: client.id,
          name: client.name,
          email: client.email,
          phone: client.phone,
          address: client.address
        },
        message: "Login successful"
      });
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
      const validatedData = insertClientSchema.parse(req.body);
      const client = await storage.createClient(validatedData);
      res.json(client);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
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

  app.get("/api/dogs/client/:clientId", async (req, res) => {
    try {
      const { clientId } = req.params;
      const dogs = await storage.getDogsByClient(parseInt(clientId));
      res.json(dogs);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/dogs", async (req, res) => {
    try {
      const validatedData = insertDogSchema.parse(req.body);
      const dog = await storage.createDog(validatedData);
      res.json(dog);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Kennel routes
  app.get("/api/kennels", async (req, res) => {
    try {
      const kennels = await storage.getAllKennels();
      
      // Get dog information for occupied kennels
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

  app.patch("/api/kennels/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      const kennel = await storage.updateKennel(parseInt(id), updates);
      if (!kennel) {
        return res.status(404).json({ message: "Kennel not found" });
      }
      
      res.json(kennel);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Job routes
  app.get("/api/jobs", async (req, res) => {
    try {
      const { staffId, date } = req.query;
      
      let jobs;
      if (staffId) {
        jobs = await storage.getJobsByStaff(parseInt(staffId as string));
      } else if (date) {
        jobs = await storage.getJobsByDate(date as string);
      } else {
        jobs = await storage.getAllJobs();
      }
      
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/jobs", async (req, res) => {
    try {
      const validatedData = insertJobSchema.parse(req.body);
      const job = await storage.createJob(validatedData);
      res.json(job);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.patch("/api/jobs/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      if (updates.status === "completed" && !updates.completedAt) {
        updates.completedAt = new Date();
      }
      
      const job = await storage.updateJob(parseInt(id), updates);
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }
      
      res.json(job);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Booking routes
  app.get("/api/bookings", async (req, res) => {
    try {
      const { clientId } = req.query;
      
      let bookings;
      if (clientId) {
        bookings = await storage.getBookingsByClient(parseInt(clientId as string));
      } else {
        bookings = await storage.getAllBookings();
      }
      
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/bookings", async (req, res) => {
    try {
      const validatedData = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(validatedData);
      res.json(booking);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Dashboard stats
  app.get("/api/dashboard/stats", async (req, res) => {
    try {
      const staff = await storage.getAllStaff();
      const kennels = await storage.getAllKennels();
      const today = new Date().toISOString().split('T')[0];
      const todaysJobs = await storage.getJobsByDate(today);
      
      const staffOnDuty = staff.filter(s => s.status === "clocked_in" || s.status === "on_break").length;
      const dogsBoarding = kennels.filter(k => k.status === "occupied").length;
      const todaysJobCount = todaysJobs.length;
      
      // Mock revenue calculation
      const revenue = todaysJobCount * 20; // £20 per job average
      
      res.json({
        staffOnDuty,
        dogsBoarding,
        todaysJobs: todaysJobCount,
        revenue: `£${revenue}`
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
```

---

## 📄 server/security.ts
```typescript
import type { Request, Response, NextFunction } from "express";
import { z } from "zod";

// Rate limiting storage
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Security middleware for VIP Elite K9s
export const securityMiddleware = {
  // Rate limiting
  rateLimit: (maxRequests: number = 100, windowMs: number = 15 * 60 * 1000) => {
    return (req: Request, res: Response, next: NextFunction) => {
      const clientId = req.ip || 'unknown';
      const now = Date.now();
      const windowStart = now - windowMs;
      
      let clientData = rateLimitStore.get(clientId);
      
      if (!clientData || clientData.resetTime <= now) {
        clientData = { count: 0, resetTime: now + windowMs };
      }
      
      // Clean up old entries
      if (clientData.resetTime <= windowStart) {
        clientData = { count: 0, resetTime: now + windowMs };
      }
      
      clientData.count++;
      rateLimitStore.set(clientId, clientData);
      
      if (clientData.count > maxRequests) {
        return res.status(429).json({
          error: "Too many requests",
          message: "Please wait before making more requests",
          retryAfter: Math.ceil((clientData.resetTime - now) / 1000)
        });
      }
      
      next();
    };
  },

  // Input sanitization
  sanitizeInput: (req: Request, res: Response, next: NextFunction) => {
    const sanitize = (obj: any): any => {
      if (typeof obj === 'string') {
        return obj.trim().slice(0, 10000); // Limit string length
      }
      if (Array.isArray(obj)) {
        return obj.slice(0, 100).map(sanitize); // Limit array size
      }
      if (obj && typeof obj === 'object') {
        const sanitized: any = {};
        for (const [key, value] of Object.entries(obj)) {
          if (typeof key === 'string' && key.length <= 100) {
            sanitized[key] = sanitize(value);
          }
        }
        return sanitized;
      }
      return obj;
    };

    if (req.body) {
      req.body = sanitize(req.body);
    }
    if (req.query) {
      req.query = sanitize(req.query);
    }
    
    next();
  },

  // Validate request body against schema
  validateBody: (schema: z.ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = schema.safeParse(req.body);
        if (!result.success) {
          return res.status(400).json({
            error: "Validation failed",
            details: result.error.errors.map(err => ({
              field: err.path.join('.'),
              message: err.message
            }))
          });
        }
        req.body = result.data;
        next();
      } catch (error) {
        res.status(400).json({
          error: "Invalid request data",
          message: "Please check your input and try again"
        });
      }
    };
  },

  // Security headers
  securityHeaders: (req: Request, res: Response, next: NextFunction) => {
    // Prevent clickjacking
    res.setHeader('X-Frame-Options', 'DENY');
    
    // Prevent MIME type sniffing
    res.setHeader('X-Content-Type-Options', 'nosniff');
    
    // XSS protection
    res.setHeader('X-XSS-Protection', '1; mode=block');
    
    // Referrer policy
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    // Content Security Policy
    res.setHeader('Content-Security-Policy', 
      "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
      "style-src 'self' 'unsafe-inline'; " +
      "img-src 'self' data: https:; " +
      "font-src 'self' data:; " +
      "connect-src 'self';"
    );
    
    next();
  },

  // Error handling
  errorHandler: (err: any, req: Request, res: Response, next: NextFunction) => {
    // Log error (in production, use proper logging service)
    console.error('VIP Elite K9s Error:', {
      error: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
      url: req.url,
      method: req.method,
      timestamp: new Date().toISOString()
    });

    // Don't leak error details in production
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        error: "Validation Error",
        message: "Please check your input and try again",
        details: isDevelopment ? err.message : undefined
      });
    }
    
    if (err.name === 'UnauthorizedError') {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Please log in to access this resource"
      });
    }
    
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({
        error: "File Too Large",
        message: "Please upload a smaller file (max 5MB)"
      });
    }

    // Generic error response
    res.status(500).json({
      error: "Internal Server Error",
      message: "Something went wrong. Please try again or contact support.",
      details: isDevelopment ? err.message : undefined,
      timestamp: new Date().toISOString()
    });
  }
};

// Validation schemas for API endpoints
export const apiSchemas = {
  createStaff: z.object({
    name: z.string().min(2).max(100),
    role: z.string().min(2).max(50),
    pin: z.string().regex(/^\d{4}$/, "PIN must be 4 digits"),
    profilePhoto: z.string().url().optional()
  }),

  createClient: z.object({
    name: z.string().min(2).max(100),
    email: z.string().email().max(255),
    phone: z.string().regex(/^(\+44|0)[1-9]\d{8,10}$/).optional(),
    address: z.string().min(10).max(500).optional(),
    password: z.string().min(8).max(128)
  }),

  createDog: z.object({
    clientId: z.number().int().positive(),
    name: z.string().min(1).max(50),
    breed: z.string().min(2).max(100),
    age: z.number().int().min(0).max(30).optional(),
    weight: z.string().max(20).optional(),
    feedingInstructions: z.string().max(1000).optional(),
    medication: z.string().max(1000).optional(),
    allergies: z.string().max(500).optional(),
    behaviorNotes: z.string().max(1000).optional(),
    vetInfo: z.string().max(500).optional(),
    emergencyContact: z.string().max(200).optional(),
    exerciseRequirements: z.string().max(500).optional()
  }),

  createBooking: z.object({
    clientId: z.number().int().positive(),
    dogId: z.number().int().positive(),
    serviceType: z.enum(["training", "walking", "boarding"]),
    startDate: z.string().datetime(),
    endDate: z.string().datetime().optional(),
    notes: z.string().max(1000).optional(),
    totalAmount: z.number().positive().max(10000).optional()
  }),

  createJob: z.object({
    type: z.string().min(2).max(50),
    description: z.string().min(5).max(500),
    scheduledDate: z.string().datetime(),
    assignedStaffId: z.number().int().positive().optional(),
    dogId: z.number().int().positive().optional(),
    kennelId: z.number().int().positive().optional(),
    notes: z.string().max(1000).optional()
  }),

  createInvoice: z.object({
    clientId: z.number().int().positive(),
    amount: z.number().positive().max(10000),
    description: z.string().min(5).max(500),
    dueDate: z.string().datetime(),
    bookingId: z.number().int().positive().optional()
  }),

  updateKennel: z.object({
    status: z.enum(["available", "occupied", "cleaning"]).optional(),
    dogId: z.number().int().positive().nullable().optional(),
    checkInDate: z.string().datetime().nullable().optional(),
    checkOutDate: z.string().datetime().nullable().optional()
  }),

  staffLogin: z.object({
    pin: z.string().regex(/^\d{4}$/, "PIN must be 4 digits")
  }),

  updateStaffStatus: z.object({
    status: z.enum(["clocked_in", "on_break", "clocked_out"]),
    clockInTime: z.string().datetime().optional(),
    breakStartTime: z.string().datetime().optional(),
    lastClockOut: z.string().datetime().optional()
  })
};

// Utility functions
export const securityUtils = {
  // Generate secure random PIN
  generateSecurePin: (): string => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  },

  // Validate UK phone number
  isValidUKPhone: (phone: string): boolean => {
    return /^(\+44|0)[1-9]\d{8,10}$/.test(phone);
  },

  // Validate email format
  isValidEmail: (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 255;
  },

  // Clean filename for uploads
  sanitizeFilename: (filename: string): string => {
    return filename
      .replace(/[^a-zA-Z0-9.-]/g, '_')
      .replace(/_{2,}/g, '_')
      .slice(0, 100);
  },

  // Generate tracking ID
  generateTrackingId: (): string => {
    return 'VIP' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  }
};```

---

## 📄 server/storage.ts
```typescript
import { 
  User, InsertUser, Staff, InsertStaff, Client, InsertClient, 
  Dog, InsertDog, Kennel, InsertKennel, Job, InsertJob,
  Booking, InsertBooking, DailyReport, InsertDailyReport,
  Invoice, InsertInvoice, TimeEntry, InsertTimeEntry,
  KennelLog, InsertKennelLog
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

  // Dogs
  getAllDogs(): Promise<Dog[]>;
  getDog(id: number): Promise<Dog | undefined>;
  getDogsByClient(clientId: number): Promise<Dog[]>;
  createDog(dog: InsertDog): Promise<Dog>;
  updateDog(id: number, updates: Partial<Dog>): Promise<Dog | undefined>;

  // Kennels
  getAllKennels(): Promise<Kennel[]>;
  getKennel(id: number): Promise<Kennel | undefined>;
  getKennelByNumber(number: number): Promise<Kennel | undefined>;
  createKennel(kennel: InsertKennel): Promise<Kennel>;
  updateKennel(id: number, updates: Partial<Kennel>): Promise<Kennel | undefined>;

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

export class MemStorage implements IStorage {
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

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Create admin user
    this.createUser({
      username: "admin",
      password: "admin123",
      role: "admin"
    });

    // Create sample staff members
    this.createStaff({
      name: "Emma Thompson",
      role: "Head Trainer",
      pin: "1234",
      profilePhoto: "https://images.unsplash.com/photo-1494790108755-2616b612b647?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
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

    // Create sample client
    this.createClient({
      name: "Robert Davis",
      email: "robert@example.com",
      phone: "07123456789",
      address: "123 Oak Street, London",
      password: "password123"
    });

    // Create sample dogs
    this.createDog({
      name: "Max",
      breed: "Golden Retriever",
      age: 3,
      weight: "30kg",
      clientId: 1,
      photo: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
      feedingInstructions: "2 cups twice daily",
      medication: "None",
      specialNotes: "Friendly with other dogs",
      emergencyContact: "07987654321"
    });

    this.createDog({
      name: "Bella",
      breed: "Labrador",
      age: 5,
      weight: "25kg",
      clientId: 1,
      photo: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
      feedingInstructions: "1.5 cups twice daily",
      medication: "Joint supplements with dinner",
      specialNotes: "Needs gentle exercise",
      emergencyContact: "07987654321"
    });

    // Initialize 20 kennels
    for (let i = 1; i <= 20; i++) {
      this.createKennel({
        number: i
      });
    }

    // Assign some dogs to kennels
    this.updateKennel(1, {
      status: "occupied",
      dogId: 1,
      checkInDate: new Date(),
      checkOutDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 days from now
    });

    this.updateKennel(3, {
      status: "occupied",
      dogId: 2,
      checkInDate: new Date(),
      checkOutDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) // 2 days from now
    });

    this.updateKennel(5, {
      status: "cleaning"
    });

    // Create sample jobs
    const today = new Date();
    this.createJob({
      type: "walk",
      description: "30 minute walk in the park",
      assignedStaffId: 3, // Sarah Chen
      dogId: 1,
      scheduledDate: today,
      scheduledTime: "09:00"
    });

    this.createJob({
      type: "training",
      description: "Basic obedience training session",
      assignedStaffId: 1, // Emma Thompson
      dogId: 2,
      scheduledDate: today,
      scheduledTime: "14:00"
    });

    this.createJob({
      type: "feeding",
      description: "Morning feeding routine",
      assignedStaffId: 2, // James Wilson
      kennelId: 1,
      scheduledDate: today,
      scheduledTime: "08:00"
    });
  }

  // Users
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

  // Staff
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
      lastClockOut: null
    };
    this.staff.set(id, staff);
    return staff;
  }

  async updateStaff(id: number, updates: Partial<Staff>): Promise<Staff | undefined> {
    const staff = this.staff.get(id);
    if (!staff) return undefined;
    
    const updatedStaff = { ...staff, ...updates };
    this.staff.set(id, updatedStaff);
    return updatedStaff;
  }

  // Clients
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
    const client: Client = { ...insertClient, id };
    this.clients.set(id, client);
    return client;
  }

  // Dogs
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

  // Kennels
  async getAllKennels(): Promise<Kennel[]> {
    return Array.from(this.kennels.values()).sort((a, b) => a.number - b.number);
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
      checkInDate: null,
      checkOutDate: null
    };
    this.kennels.set(id, kennel);
    return kennel;
  }

  async updateKennel(id: number, updates: Partial<Kennel>): Promise<Kennel | undefined> {
    const kennel = this.kennels.get(id);
    if (!kennel) return undefined;
    
    const updatedKennel = { ...kennel, ...updates };
    this.kennels.set(id, updatedKennel);
    return updatedKennel;
  }

  // Jobs
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

  // Bookings
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

  // Daily Reports
  async getDailyReport(dogId: number, date: string): Promise<DailyReport | undefined> {
    return Array.from(this.dailyReports.values()).find(report => 
      report.dogId === dogId && report.date?.toISOString().split('T')[0] === date
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

  // Invoices
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

  // Time Entry methods
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
    return Array.from(this.timeEntries.values()).filter(entry => 
      entry.date.toISOString().split('T')[0] === date
    );
  }

  async createTimeEntry(insertTimeEntry: InsertTimeEntry): Promise<TimeEntry> {
    const id = this.currentId++;
    const timeEntry: TimeEntry = { 
      ...insertTimeEntry, 
      id,
      clockOutTime: insertTimeEntry.clockOutTime || null,
      breakStartTime: insertTimeEntry.breakStartTime || null,
      breakEndTime: insertTimeEntry.breakEndTime || null,
      totalBreakTime: insertTimeEntry.totalBreakTime || null,
      notes: insertTimeEntry.notes || null
    };
    this.timeEntries.set(id, timeEntry);
    return timeEntry;
  }

  async updateTimeEntry(id: number, updates: Partial<TimeEntry>): Promise<TimeEntry | undefined> {
    const existing = this.timeEntries.get(id);
    if (!existing) return undefined;
    
    const timeEntry = { ...existing, ...updates };
    this.timeEntries.set(id, timeEntry);
    return timeEntry;
  }

  // Kennel Log methods
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
    return Array.from(this.kennelLogs.values()).filter(log => 
      log.timestamp && log.timestamp.toISOString().split('T')[0] === date
    );
  }

  async createKennelLog(insertKennelLog: InsertKennelLog): Promise<KennelLog> {
    const id = this.currentId++;
    const kennelLog: KennelLog = { 
      ...insertKennelLog, 
      id,
      timestamp: new Date(),
      dogId: insertKennelLog.dogId || null,
      notes: insertKennelLog.notes || null,
      scheduledTime: insertKennelLog.scheduledTime || null
    };
    this.kennelLogs.set(id, kennelLog);
    return kennelLog;
  }

  async updateKennelLog(id: number, updates: Partial<KennelLog>): Promise<KennelLog | undefined> {
    const existing = this.kennelLogs.get(id);
    if (!existing) return undefined;
    
    const kennelLog = { ...existing, ...updates };
    this.kennelLogs.set(id, kennelLog);
    return kennelLog;
  }
}

export const storage = new MemStorage();
```

---

## 📄 server/vite.ts
```typescript
import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import viteConfig from "../vite.config";
import { nanoid } from "nanoid";

const viteLogger = createLogger();

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html",
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(import.meta.dirname, "public");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
```

---

## 📄 client/index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
    <!-- This is a replit script which adds a banner on the top of the page when opened in development mode outside the replit environment -->
    <script type="text/javascript" src="https://replit.com/public/js/replit-dev-banner.js"></script>
  </body>
</html>```

---

## 📄 client/src/main.tsx
```typescript
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
```

---

## 📄 client/src/App.tsx
```typescript
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/use-auth";
import AdminDashboard from "@/pages/admin-dashboard";
import StaffLogin from "@/pages/staff-login";
import StaffDashboard from "@/pages/staff-dashboard";
import ClientPortal from "@/pages/client-portal";
import BookingPage from "@/pages/booking";
import InvoicingPage from "@/pages/invoicing";
import ReportingPage from "@/pages/reporting";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={AdminDashboard} />
      <Route path="/staff" component={StaffLogin} />
      <Route path="/staff/dashboard" component={StaffDashboard} />
      <Route path="/client" component={ClientPortal} />
      <Route path="/booking" component={BookingPage} />
      <Route path="/invoicing" component={InvoicingPage} />
      <Route path="/reporting" component={ReportingPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Router />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
```

---

## 📄 client/src/index.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: 0 0% 100%; /* #FFFFFF */
  --foreground: 222 84% 5%; /* #0F172A */
  --muted: 210 40% 96%; /* #F1F5F9 */
  --muted-foreground: 215 16% 47%; /* #64748B */
  --popover: 0 0% 100%;
  --popover-foreground: 222 84% 5%;
  --card: 0 0% 100%;
  --card-foreground: 222 84% 5%;
  --border: 214 32% 91%; /* #E2E8F0 */
  --input: 214 32% 91%;
  --primary: 221 83% 53%; /* #1E40AF Royal Blue */
  --primary-foreground: 210 40% 98%; /* #F8FAFC */
  --secondary: 210 40% 96%;
  --secondary-foreground: 222 84% 5%;
  --accent: 43 96% 56%; /* #F59E0B Gold */
  --accent-foreground: 0 0% 100%;
  --destructive: 0 84% 60%;
  --destructive-foreground: 60 9% 98%;
  --ring: 221 83% 53%;
  --radius: 0.75rem;
}

.dark {
  --background: 222 84% 5%;
  --foreground: 210 40% 98%;
  --muted: 217 33% 17%;
  --muted-foreground: 215 20% 65%;
  --popover: 222 84% 5%;
  --popover-foreground: 210 40% 98%;
  --card: 222 84% 5%;
  --card-foreground: 210 40% 98%;
  --border: 217 33% 17%;
  --input: 217 33% 17%;
  --primary: 221 83% 53%;
  --primary-foreground: 210 40% 98%;
  --secondary: 217 33% 17%;
  --secondary-foreground: 210 40% 98%;
  --accent: 43 96% 56%;
  --accent-foreground: 0 0% 100%;
  --destructive: 0 62% 30%;
  --destructive-foreground: 210 40% 98%;
  --ring: 221 83% 53%;
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground font-sans antialiased;
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
  }
}

@layer components {
  /* VIP Elite K9s Premium Brand Colors */
  .royal-blue {
    color: hsl(221 83% 53%);
  }
  
  .bg-royal-blue {
    background-color: hsl(221 83% 53%);
  }
  
  .border-royal-blue {
    border-color: hsl(221 83% 53%);
  }
  
  .gold {
    color: hsl(43 96% 56%);
  }
  
  .bg-gold {
    background-color: hsl(43 96% 56%);
  }
  
  .border-gold {
    border-color: hsl(43 96% 56%);
  }
  
  /* Luxury Gradient Backgrounds */
  .gradient-royal {
    background: linear-gradient(135deg, hsl(221 83% 53%) 0%, hsl(221 83% 63%) 100%);
  }
  
  .gradient-gold {
    background: linear-gradient(135deg, hsl(43 96% 56%) 0%, hsl(43 96% 66%) 100%);
  }
  
  .gradient-premium {
    background: linear-gradient(135deg, hsl(221 83% 53%) 0%, hsl(43 96% 56%) 100%);
  }
  
  /* VIP Elite K9s Header Styling */
  .vip-header {
    background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #f59e0b 100%);
    position: relative;
    overflow: hidden;
  }
  
  .vip-header::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
  }
  
  /* Premium Card Enhancements */
  .card-premium {
    @apply bg-white border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-lg;
    background: linear-gradient(145deg, #ffffff 0%, #fafafa 100%);
  }
  
  .card-premium:hover {
    transform: translateY(-2px);
  }
  
  /* Elite Button Styling */
  .btn-royal {
    @apply bg-royal-blue text-white hover:bg-blue-700 font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl;
  }
  
  .btn-gold {
    @apply text-royal-blue hover:bg-yellow-400 font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl;
    background: linear-gradient(135deg, hsl(43 96% 56%) 0%, hsl(43 96% 66%) 100%);
  }
  
  /* Luxury Status Indicators */
  .status-premium {
    @apply inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider;
  }
  
  .status-indicator {
    @apply w-3 h-3 rounded-full;
  }
  
  .status-clocked-in {
    @apply bg-green-500;
  }
  
  .status-on-break {
    @apply bg-yellow-500;
  }
  
  .status-clocked-out {
    @apply bg-gray-400;
  }
  
  .kennel-card {
    @apply rounded-lg p-3 text-center cursor-pointer hover:shadow-md transition-shadow border-2;
  }
  
  .kennel-occupied {
    @apply bg-green-100 border-green-300;
  }
  
  .kennel-available {
    @apply bg-gray-100 border-gray-300;
  }
  
  .kennel-cleaning {
    @apply bg-yellow-100 border-yellow-300;
  }
}
```

---

## 📄 client/src/lib/queryClient.ts
```typescript
import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const res = await fetch(queryKey[0] as string, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
```

---

## 📄 client/src/lib/types.ts
```typescript
export interface DashboardStats {
  staffOnDuty: number;
  dogsBoarding: number;
  todaysJobs: number;
  revenue: string;
}

export interface KennelWithDog {
  id: number;
  number: number;
  status: "occupied" | "available" | "cleaning";
  dogId?: number;
  dog?: {
    id: number;
    name: string;
    breed: string;
    photo?: string;
  };
  checkInDate?: string;
  checkOutDate?: string;
}

export interface JobWithDetails {
  id: number;
  type: string;
  description: string;
  assignedStaffId?: number;
  dogId?: number;
  kennelId?: number;
  scheduledDate: string;
  scheduledTime?: string;
  status: "pending" | "in_progress" | "completed";
  notes?: string;
  completedAt?: string;
}

export interface StaffStatus {
  id: number;
  name: string;
  role: string;
  status: "clocked_in" | "on_break" | "clocked_out";
  clockInTime?: string;
  breakStartTime?: string;
  lastClockOut?: string;
}
```

---

## 📄 client/src/lib/utils.ts
```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

---

## 📄 client/src/lib/validation.ts
```typescript
import { z } from "zod";

// Enhanced validation schemas for VIP Elite K9s
export const secureLoginSchema = z.object({
  username: z.string()
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username too long")
    .regex(/^[a-zA-Z0-9_-]+$/, "Username can only contain letters, numbers, underscores, and hyphens"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password too long")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain uppercase, lowercase, and number"),
});

export const staffPinSchema = z.object({
  pin: z.string()
    .length(4, "PIN must be exactly 4 digits")
    .regex(/^\d{4}$/, "PIN must contain only numbers"),
});

export const clientRegistrationSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name too long")
    .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, apostrophes, and hyphens"),
  email: z.string()
    .email("Please enter a valid email address")
    .max(255, "Email too long"),
  phone: z.string()
    .regex(/^(\+44|0)[1-9]\d{8,10}$/, "Please enter a valid UK phone number")
    .optional(),
  address: z.string()
    .min(10, "Please enter a complete address")
    .max(500, "Address too long")
    .optional(),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password too long")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain uppercase, lowercase, and number"),
});

export const dogProfileSchema = z.object({
  name: z.string()
    .min(1, "Dog name is required")
    .max(50, "Name too long")
    .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, apostrophes, and hyphens"),
  breed: z.string()
    .min(2, "Breed is required")
    .max(100, "Breed name too long"),
  age: z.number()
    .int()
    .min(0, "Age cannot be negative")
    .max(30, "Please verify the age")
    .optional(),
  weight: z.string()
    .regex(/^\d+(\.\d{1,2})?\s*(kg|lbs?)$/i, "Weight must be in format '25.5 kg' or '55 lbs'")
    .optional(),
  feedingInstructions: z.string()
    .max(1000, "Feeding instructions too long")
    .optional(),
  medication: z.string()
    .max(1000, "Medication details too long")
    .optional(),
  allergies: z.string()
    .max(500, "Allergy information too long")
    .optional(),
  behaviorNotes: z.string()
    .max(1000, "Behavior notes too long")
    .optional(),
  vetInfo: z.string()
    .max(500, "Vet information too long")
    .optional(),
  emergencyContact: z.string()
    .max(200, "Emergency contact too long")
    .optional(),
  exerciseRequirements: z.string()
    .max(500, "Exercise requirements too long")
    .optional(),
});

export const bookingSchema = z.object({
  serviceType: z.enum(["training", "walking", "boarding"], {
    errorMap: () => ({ message: "Please select a valid service type" })
  }),
  startDate: z.date({
    required_error: "Start date is required",
    invalid_type_error: "Please enter a valid date",
  }).refine((date) => date >= new Date(), {
    message: "Start date cannot be in the past",
  }),
  endDate: z.date().optional(),
  notes: z.string()
    .max(1000, "Notes too long")
    .optional(),
  dogId: z.number()
    .int()
    .positive("Please select a valid dog"),
}).refine((data) => {
  if (data.serviceType === "boarding" && data.endDate) {
    return data.endDate > data.startDate;
  }
  return true;
}, {
  message: "End date must be after start date",
  path: ["endDate"],
});

export const invoiceSchema = z.object({
  clientId: z.number()
    .int()
    .positive("Please select a valid client"),
  amount: z.number()
    .positive("Amount must be greater than 0")
    .max(10000, "Amount seems unusually high - please verify"),
  description: z.string()
    .min(5, "Please provide a description")
    .max(500, "Description too long"),
  dueDate: z.date({
    required_error: "Due date is required",
    invalid_type_error: "Please enter a valid date",
  }).refine((date) => date >= new Date(), {
    message: "Due date cannot be in the past",
  }),
});

export const jobSchema = z.object({
  type: z.string()
    .min(2, "Job type is required")
    .max(50, "Job type too long"),
  description: z.string()
    .min(5, "Please provide a description")
    .max(500, "Description too long"),
  scheduledDate: z.date({
    required_error: "Scheduled date is required",
    invalid_type_error: "Please enter a valid date",
  }),
  assignedStaffId: z.number()
    .int()
    .positive("Please assign to a valid staff member")
    .optional(),
  dogId: z.number()
    .int()
    .positive("Please select a valid dog")
    .optional(),
  notes: z.string()
    .max(1000, "Notes too long")
    .optional(),
});

// Security utilities
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>\"'&]/g, '') // Remove potentially dangerous characters
    .slice(0, 1000); // Limit length
};

export const validateFileUpload = (file: File): { valid: boolean; error?: string } => {
  // File size limit: 5MB
  if (file.size > 5 * 1024 * 1024) {
    return { valid: false, error: "File size must be less than 5MB" };
  }

  // Allowed image types
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: "Only JPEG, PNG, and WebP images are allowed" };
  }

  return { valid: true };
};

export const generateSecureId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

// Rate limiting helper
export const createRateLimiter = (maxRequests: number, windowMs: number) => {
  const requests = new Map<string, number[]>();
  
  return (identifier: string): boolean => {
    const now = Date.now();
    const userRequests = requests.get(identifier) || [];
    
    // Remove expired requests
    const validRequests = userRequests.filter(time => now - time < windowMs);
    
    if (validRequests.length >= maxRequests) {
      return false; // Rate limit exceeded
    }
    
    validRequests.push(now);
    requests.set(identifier, validRequests);
    return true;
  };
};```

---

## 📄 client/src/hooks/use-toast.ts
```typescript
import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type Toast = Omit<ToasterToast, "id">

function toast({ ...props }: Toast) {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

export { useToast, toast }
```

---

## 📄 client/src/hooks/use-auth.tsx
```typescript
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Staff, User } from '@shared/schema';

interface AuthContextType {
  user: User | null;
  staff: Staff | null;
  login: (userData: Staff | User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [staff, setStaff] = useState<Staff | null>(null);

  useEffect(() => {
    // Check for stored auth data on component mount
    const storedUser = localStorage.getItem('auth_user');
    const storedStaff = localStorage.getItem('auth_staff');
    
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('auth_user');
      }
    }
    
    if (storedStaff) {
      try {
        setStaff(JSON.parse(storedStaff));
      } catch (error) {
        localStorage.removeItem('auth_staff');
      }
    }
  }, []);

  const login = (userData: Staff | User) => {
    if ('pin' in userData) {
      // Staff login
      setStaff(userData);
      setUser(null);
      localStorage.setItem('auth_staff', JSON.stringify(userData));
      localStorage.removeItem('auth_user');
    } else {
      // Admin/User login
      setUser(userData);
      setStaff(null);
      localStorage.setItem('auth_user', JSON.stringify(userData));
      localStorage.removeItem('auth_staff');
    }
  };

  const logout = () => {
    setUser(null);
    setStaff(null);
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_staff');
  };

  const isAuthenticated = !!(user || staff);

  return (
    <AuthContext.Provider value={{
      user,
      staff,
      login,
      logout,
      isAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
```

---

## 📄 client/src/hooks/use-mobile.tsx
```typescript
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
```

---

## 📄 client/src/pages/admin-dashboard.tsx
```typescript
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Plus, CalendarPlus, Users, Dog, Calendar, PoundSterling, Clock, CheckCircle, AlertTriangle, Home, Fan, BarChart3 } from "lucide-react";
import { VIPHeader } from "@/components/vip-header";
import { StaffCard } from "@/components/staff-card";
import { KennelGrid } from "@/components/kennel-grid";
import { StaffLoginModal } from "@/components/staff-login-modal";
import { AddStaffModal } from "@/components/add-staff-modal";
import { AddJobModal } from "@/components/add-job-modal";
import { useState } from "react";
import type { Staff } from "@shared/schema";

export default function AdminDashboard() {
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [showAddJobModal, setShowAddJobModal] = useState(false);

  const { data: staff = [], isLoading: staffLoading } = useQuery({
    queryKey: ["/api/staff"],
  });

  const { data: kennels = [], isLoading: kennelsLoading } = useQuery({
    queryKey: ["/api/kennels"],
  });

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["/api/dashboard/stats"],
  });

  const { data: todaysJobs = [], isLoading: jobsLoading } = useQuery({
    queryKey: ["/api/jobs"],
    queryFn: () => {
      const today = new Date().toISOString().split('T')[0];
      return fetch(`/api/jobs?date=${today}`, { credentials: "include" }).then(res => res.json());
    }
  });

  const handleStaffClick = (staffMember: Staff) => {
    setSelectedStaff(staffMember);
    setShowStaffModal(true);
  };

  const currentDate = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  if (staffLoading || kennelsLoading || statsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* VIP Elite K9s Premium Header */}
      <VIPHeader 
        title="VIP Elite K9s" 
        subtitle="Premium Dog Care Excellence"
        showNavigation={true}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-foreground">Dashboard</h2>
              <p className="text-muted-foreground mt-1">{currentDate}</p>
            </div>
            <div className="mt-4 lg:mt-0 flex flex-col sm:flex-row gap-3">
              <Button 
                className="bg-gold hover:bg-yellow-500 text-white"
                onClick={() => setShowAddStaffModal(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Staff
              </Button>
              <Button 
                className="bg-royal-blue hover:bg-blue-700 text-white"
                onClick={() => setShowAddJobModal(true)}
              >
                <CalendarPlus className="mr-2 h-4 w-4" />
                New Job
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-blue-100">
                  <Users className="text-royal-blue h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Staff On Duty</p>
                  <p className="text-2xl font-bold">{stats?.staffOnDuty || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-yellow-100">
                  <Dog className="text-gold h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Dogs Boarding</p>
                  <p className="text-2xl font-bold">{stats?.dogsBoarding || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-green-100">
                  <Calendar className="text-green-600 h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Today's Jobs</p>
                  <p className="text-2xl font-bold">{stats?.todaysJobs || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-purple-100">
                  <PoundSterling className="text-purple-600 h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Today's Revenue</p>
                  <p className="text-2xl font-bold">{stats?.revenue || "£0"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Staff Overview */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Staff Overview</CardTitle>
                  <Button variant="ghost" className="text-royal-blue hover:text-blue-700">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {staff.map((staffMember: Staff) => (
                    <StaffCard 
                      key={staffMember.id} 
                      staff={staffMember} 
                      onClick={() => handleStaffClick(staffMember)}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Today's Schedule */}
          <div>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Today's Schedule</CardTitle>
                  <Button variant="ghost" className="text-royal-blue hover:text-blue-700">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todaysJobs.length === 0 ? (
                    <p className="text-muted-foreground text-sm">No jobs scheduled for today</p>
                  ) : (
                    todaysJobs.slice(0, 5).map((job: any) => (
                      <div key={job.id} className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            job.type === 'training' ? 'bg-green-500' :
                            job.type === 'walk' ? 'bg-blue-500' :
                            job.type === 'feeding' ? 'bg-yellow-500' :
                            job.type === 'grooming' ? 'bg-purple-500' :
                            'bg-gray-500'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium capitalize">{job.type}</p>
                          <p className="text-xs text-muted-foreground">{job.scheduledTime || 'Time TBD'} - {job.description}</p>
                          <p className="text-xs text-muted-foreground">Status: {job.status}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Kennel Overview */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Kennel Overview</CardTitle>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    <span className="text-sm text-muted-foreground">Occupied</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gray-300 rounded-full" />
                    <span className="text-sm text-muted-foreground">Available</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <span className="text-sm text-muted-foreground">Cleaning</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <KennelGrid kennels={kennels} />
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity and Quick Actions */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Clock className="text-royal-blue h-4 w-4" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">No recent activity to display</p>
                    <p className="text-xs text-muted-foreground">Activity will appear here when staff interact with the system</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="ghost" 
                  className="p-4 h-auto bg-muted hover:bg-muted/80 flex flex-col items-center space-y-2"
                  onClick={() => setShowAddStaffModal(true)}
                >
                  <Users className="text-royal-blue h-8 w-8" />
                  <span className="text-sm font-medium">Add Staff</span>
                </Button>
                <Button 
                  variant="ghost" 
                  className="p-4 h-auto bg-muted hover:bg-muted/80 flex flex-col items-center space-y-2"
                  onClick={() => setShowAddJobModal(true)}
                >
                  <CalendarPlus className="text-gold h-8 w-8" />
                  <span className="text-sm font-medium">New Job</span>
                </Button>
                <Button variant="ghost" className="p-4 h-auto bg-muted hover:bg-muted/80 flex flex-col items-center space-y-2">
                  <PoundSterling className="text-green-600 h-8 w-8" />
                  <span className="text-sm font-medium">Create Invoice</span>
                </Button>
                <Button variant="ghost" className="p-4 h-auto bg-muted hover:bg-muted/80 flex flex-col items-center space-y-2">
                  <CheckCircle className="text-purple-600 h-8 w-8" />
                  <span className="text-sm font-medium">View Reports</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Staff Login Modal */}
      {selectedStaff && (
        <StaffLoginModal
          staff={selectedStaff}
          open={showStaffModal}
          onOpenChange={setShowStaffModal}
        />
      )}

      {/* Add Staff Modal */}
      <AddStaffModal
        open={showAddStaffModal}
        onOpenChange={setShowAddStaffModal}
      />

      {/* Add Job Modal */}
      <AddJobModal
        open={showAddJobModal}
        onOpenChange={setShowAddJobModal}
      />
    </div>
  );
}
```

---

## 📄 client/src/pages/booking.tsx
```typescript
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { insertBookingSchema } from "@shared/schema";
import { z } from "zod";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Dog, 
  GraduationCap, 
  Home, 
  MapPin,
  Plus,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { format } from "date-fns";

// Extended booking schema with validation
const bookingFormSchema = insertBookingSchema.extend({
  serviceTimes: z.array(z.string()).min(1, "Please select at least one time slot"),
  specialRequests: z.string().optional(),
}).omit({
  status: true,
  totalAmount: true,
});

export default function BookingPage() {
  const [selectedService, setSelectedService] = useState<string>("");
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Mock client - in real app this would come from auth context
  const currentClient = { id: 1, name: "Test Client" };

  // Service definitions with pricing
  const services = [
    {
      id: "training",
      title: "Professional Training",
      description: "One-on-one training sessions with certified trainers",
      icon: GraduationCap,
      price: 85,
      duration: "60 minutes",
      color: "bg-blue-500",
      features: [
        "Personalized training plan",
        "Progress tracking",
        "Behavior modification",
        "Basic obedience",
        "Problem solving"
      ]
    },
    {
      id: "walking",
      title: "Premium Dog Walking",
      description: "Professional walking services in safe, secure areas",
      icon: MapPin,
      price: 35,
      duration: "30-60 minutes",
      color: "bg-green-500",
      features: [
        "Experienced walkers",
        "GPS tracking",
        "Photo updates",
        "Flexible scheduling",
        "Weather protection"
      ]
    },
    {
      id: "boarding",
      title: "Luxury Boarding",
      description: "Premium overnight care in our state-of-the-art facility",
      icon: Home,
      price: 125,
      duration: "Per night",
      color: "bg-purple-500",
      features: [
        "24/7 supervision",
        "Spacious kennels",
        "Daily exercise",
        "Feeding management",
        "Medical care available"
      ]
    }
  ];

  // Available time slots
  const timeSlots = [
    "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", 
    "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", 
    "4:00 PM", "5:00 PM", "6:00 PM"
  ];

  // Get client's pets
  const { data: pets = [] } = useQuery({
    queryKey: ["/api/dogs", "client", currentClient.id],
    queryFn: async () => {
      const response = await apiRequest("GET", `/api/dogs/client/${currentClient.id}`);
      return response.json();
    },
  });

  // Get client's bookings
  const { data: bookings = [] } = useQuery({
    queryKey: ["/api/bookings", "client", currentClient.id],
    queryFn: async () => {
      const response = await apiRequest("GET", `/api/bookings/client/${currentClient.id}`);
      return response.json();
    },
  });

  // Booking form
  const bookingForm = useForm({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      clientId: currentClient.id,
      dogId: 0,
      serviceType: "",
      startDate: new Date(),
      endDate: null,
      duration: null,
      notes: "",
      serviceTimes: [],
      specialRequests: "",
    },
  });

  // Create booking mutation
  const createBookingMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/bookings", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Booking Confirmed! ✓",
        description: "Your service has been scheduled successfully. We'll send you a confirmation shortly.",
      });
      setShowBookingForm(false);
      setSelectedService("");
      bookingForm.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
    },
    onError: () => {
      toast({
        title: "Booking Failed",
        description: "Unable to complete your booking. Please try again or contact us.",
        variant: "destructive",
      });
    },
  });

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    setShowBookingForm(true);
    bookingForm.setValue("serviceType", serviceId);
  };

  const handleBookingSubmit = (data: any) => {
    // Calculate pricing based on service and duration
    const service = services.find(s => s.id === data.serviceType);
    const totalAmount = service ? service.price : 0;

    const bookingData = {
      ...data,
      status: "pending",
      totalAmount,
      startDate: selectedDate || new Date(),
      endDate: data.serviceType === "boarding" ? data.endDate : null,
    };

    createBookingMutation.mutate(bookingData);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-green-500";
      case "pending": return "bg-yellow-500";
      case "completed": return "bg-blue-500";
      case "cancelled": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-royal-blue to-blue-600 text-white p-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-2">Book Premium Services</h1>
          <p className="text-blue-100">Schedule the best care for your beloved pets</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Service Selection */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Choose Your Service</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <Card 
                  key={service.id} 
                  className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 border-t-4"
                  style={{ borderTopColor: service.color.replace('bg-', '') }}
                  onClick={() => handleServiceSelect(service.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 ${service.color} rounded-full flex items-center justify-center mr-4`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{service.title}</h3>
                        <p className="text-muted-foreground">{service.duration}</p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                    
                    <div className="mb-4">
                      <div className="text-2xl font-bold text-royal-blue">${service.price}</div>
                      <div className="text-sm text-muted-foreground">per {service.duration}</div>
                    </div>

                    <ul className="space-y-1 mb-4">
                      {service.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="text-sm flex items-center">
                          <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Button className="w-full bg-royal-blue hover:bg-blue-700">
                      Book {service.title}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Current Bookings */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Your Current Bookings</h2>
          {bookings.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {bookings.map((booking: any) => (
                <Card key={booking.id} className="border-l-4 border-l-royal-blue">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold capitalize">{booking.serviceType}</h4>
                      <Badge className={`${getStatusColor(booking.status)} text-white`}>
                        {booking.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {format(new Date(booking.startDate), 'MMM dd, yyyy')}
                    </p>
                    <p className="text-lg font-bold text-royal-blue">
                      ${booking.totalAmount}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center py-8 border-2 border-dashed">
              <CardContent>
                <CalendarIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No bookings yet. Schedule your first service above!</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Booking Form Dialog */}
      <Dialog open={showBookingForm} onOpenChange={setShowBookingForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Book {services.find(s => s.id === selectedService)?.title}
            </DialogTitle>
            <p className="text-muted-foreground">
              Fill out the details below to schedule your service
            </p>
          </DialogHeader>

          <Form {...bookingForm}>
            <form onSubmit={bookingForm.handleSubmit(handleBookingSubmit)} className="space-y-6">
              {/* Pet Selection */}
              <FormField
                control={bookingForm.control}
                name="dogId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Your Pet</FormLabel>
                    <Select onValueChange={(value) => field.onChange(parseInt(value))}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose which pet needs this service" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {pets.map((pet: any) => (
                          <SelectItem key={pet.id} value={pet.id.toString()}>
                            <div className="flex items-center gap-2">
                              <Dog className="h-4 w-4" />
                              {pet.name} - {pet.breed}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Date Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Time Selection for Training/Walking */}
              {(selectedService === "training" || selectedService === "walking") && (
                <FormField
                  control={bookingForm.control}
                  name="serviceTimes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Time Slots</FormLabel>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map((time) => (
                          <Button
                            key={time}
                            type="button"
                            variant={field.value?.includes(time) ? "default" : "outline"}
                            className="text-sm"
                            onClick={() => {
                              const current = field.value || [];
                              if (current.includes(time)) {
                                field.onChange(current.filter(t => t !== time));
                              } else {
                                field.onChange([...current, time]);
                              }
                            }}
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* End Date for Boarding */}
              {selectedService === "boarding" && (
                <FormField
                  control={bookingForm.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Check-out Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? format(new Date(field.value), "PPP") : "Pick check-out date"}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value ? new Date(field.value) : undefined}
                            onSelect={(date) => field.onChange(date?.toISOString())}
                            disabled={(date) => date < (selectedDate || new Date())}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Special Notes */}
              <FormField
                control={bookingForm.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Special Instructions</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any special requests or important information for our staff..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Pricing Summary */}
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Booking Summary</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Service:</span>
                    <span className="capitalize">{selectedService}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Price:</span>
                    <span className="font-semibold">
                      ${services.find(s => s.id === selectedService)?.price}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span>{selectedDate ? format(selectedDate, "MMM dd, yyyy") : "Not selected"}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowBookingForm(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 bg-royal-blue hover:bg-blue-700"
                  disabled={createBookingMutation.isPending || !selectedDate}
                >
                  {createBookingMutation.isPending ? "Confirming..." : "Confirm Booking"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}```

---

## 📄 client/src/pages/client-portal.tsx
```typescript
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { insertClientSchema, insertDogSchema } from "@shared/schema";
import { z } from "zod";
import { Dog, Plus, User, Calendar, FileText, CreditCard, Heart, Camera, Mail, Phone, MapPin } from "lucide-react";

// Extended schemas for forms
const clientRegistrationSchema = insertClientSchema.extend({
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const petSchema = insertDogSchema.extend({
  feedingTimes: z.array(z.string()).optional(),
  medicationSchedule: z.array(z.object({
    medication: z.string(),
    time: z.string(),
    dosage: z.string(),
  })).optional(),
  itemsBrought: z.array(z.string()).optional(),
});

export default function ClientPortal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [currentClient, setCurrentClient] = useState<any>(null);
  const [showAddPet, setShowAddPet] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Login form
  const loginForm = useForm({
    resolver: zodResolver(z.object({
      email: z.string().email(),
      password: z.string().min(6),
    })),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Registration form
  const registrationForm = useForm({
    resolver: zodResolver(clientRegistrationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Pet form
  const petForm = useForm({
    resolver: zodResolver(petSchema),
    defaultValues: {
      name: "",
      breed: "",
      age: 0,
      weight: "",
      photo: "",
      feedingInstructions: "",
      medication: "",
      specialNotes: "",
      behaviorNotes: "",
      emergencyContact: "",
      vetInfo: "",
      allergies: "",
      exerciseRequirements: "",
    },
  });

  // Client pets query
  const { data: pets = [] } = useQuery({
    queryKey: ["/api/dogs", "client", currentClient?.id],
    queryFn: async () => {
      if (!currentClient?.id) return [];
      const response = await apiRequest("GET", `/api/dogs/client/${currentClient.id}`);
      return response.json();
    },
    enabled: !!currentClient?.id,
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const response = await apiRequest("POST", "/api/auth/client-login", data);
      return response.json();
    },
    onSuccess: (data) => {
      setCurrentClient(data.client);
      setIsLoggedIn(true);
      toast({
        title: "Welcome back! ✓",
        description: `Hello ${data.client.name}, great to see you again!`,
      });
    },
    onError: () => {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Registration mutation
  const registrationMutation = useMutation({
    mutationFn: async (data: any) => {
      const { confirmPassword, ...clientData } = data;
      const response = await apiRequest("POST", "/api/clients", clientData);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Registration Successful! ✓",
        description: "Welcome to VIP Elite K9s! You can now log in.",
      });
      setIsRegistering(false);
      registrationForm.reset();
    },
    onError: () => {
      toast({
        title: "Registration Failed",
        description: "Email might already be registered. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Add pet mutation
  const addPetMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/dogs", {
        ...data,
        clientId: currentClient.id,
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Pet Added Successfully! ✓",
        description: "Your furry friend has been added to your account.",
      });
      setShowAddPet(false);
      petForm.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/dogs"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add pet. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleLogin = (data: any) => {
    loginMutation.mutate(data);
  };

  const handleRegistration = (data: any) => {
    registrationMutation.mutate(data);
  };

  const handleAddPet = (data: any) => {
    addPetMutation.mutate(data);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentClient(null);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  // Not logged in view
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-t-4 border-t-royal-blue shadow-xl">
          <CardHeader className="text-center space-y-2">
            <div className="w-16 h-16 bg-royal-blue rounded-full flex items-center justify-center mx-auto mb-4">
              <Dog className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-royal-blue">
              {isRegistering ? "Join VIP Elite K9s" : "Welcome Back"}
            </CardTitle>
            <p className="text-muted-foreground">
              {isRegistering ? "Create your account to get premium pet care" : "Sign in to manage your pets"}
            </p>
          </CardHeader>
          <CardContent>
            {isRegistering ? (
              <Form {...registrationForm}>
                <form onSubmit={registrationForm.handleSubmit(handleRegistration)} className="space-y-4">
                  <FormField
                    control={registrationForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registrationForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Enter your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registrationForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registrationForm.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter your address" className="resize-none" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registrationForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Create a secure password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registrationForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Confirm your password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-royal-blue hover:bg-blue-700 h-11"
                    disabled={registrationMutation.isPending}
                  >
                    {registrationMutation.isPending ? "Creating Account..." : "Create Account"}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full h-11"
                    onClick={() => setIsRegistering(false)}
                  >
                    Already have an account? Sign In
                  </Button>
                </form>
              </Form>
            ) : (
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Enter your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Enter your password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-royal-blue hover:bg-blue-700 h-11"
                    disabled={loginMutation.isPending}
                  >
                    {loginMutation.isPending ? "Signing In..." : "Sign In to Portal"}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full h-11"
                    onClick={() => setIsRegistering(true)}
                  >
                    New to VIP Elite K9s? Join Now
                  </Button>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // Logged in client portal view
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-royal-blue to-blue-600 text-white p-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Welcome back, {currentClient.name}!</h1>
                <p className="text-blue-100">VIP Elite K9s Client Portal</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right text-sm">
                <div className="flex items-center gap-1 text-blue-100">
                  <Mail className="h-3 w-3" />
                  {currentClient.email}
                </div>
                {currentClient.phone && (
                  <div className="flex items-center gap-1 text-blue-100">
                    <Phone className="h-3 w-3" />
                    {currentClient.phone}
                  </div>
                )}
              </div>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-royal-blue"
                onClick={handleLogout}
              >
                <User className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* My Pets Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <Heart className="h-8 w-8 text-red-500" />
              My Beloved Pets
            </h2>
            <Dialog open={showAddPet} onOpenChange={setShowAddPet}>
              <DialogTrigger asChild>
                <Button className="bg-gold hover:bg-yellow-500 text-white shadow-lg">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Pet
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-xl">Add Your Furry Family Member</DialogTitle>
                  <p className="text-muted-foreground">
                    Tell us about your pet so we can provide the best possible care
                  </p>
                </DialogHeader>
                <Form {...petForm}>
                  <form onSubmit={petForm.handleSubmit(handleAddPet)} className="space-y-6">
                    {/* Basic Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold border-b pb-2">Basic Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={petForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Pet Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your pet's name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={petForm.control}
                          name="breed"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Breed *</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., Golden Retriever, Mixed" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={petForm.control}
                          name="age"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Age (years)</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  placeholder="Enter age" 
                                  {...field}
                                  onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={petForm.control}
                          name="weight"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Weight</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., 45 lbs, 20 kg" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Care Instructions */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold border-b pb-2">Care Instructions</h3>
                      <FormField
                        control={petForm.control}
                        name="feedingInstructions"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Feeding Instructions</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Include feeding times, food brand, portions, special diet requirements..."
                                className="min-h-[80px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={petForm.control}
                        name="medication"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Medications & Dosage</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="List all medications, dosages, and timing (e.g., 'Rimadyl 25mg twice daily with food')..."
                                className="min-h-[80px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={petForm.control}
                        name="exerciseRequirements"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Exercise & Activity Needs</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Describe exercise requirements, energy level, favorite activities, any restrictions..."
                                className="min-h-[80px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Health & Behavior */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold border-b pb-2">Health & Behavior</h3>
                      <FormField
                        control={petForm.control}
                        name="allergies"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Allergies & Sensitivities</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Food allergies, environmental allergies, medication sensitivities..."
                                className="min-h-[60px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={petForm.control}
                        name="behaviorNotes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Behavior & Personality Notes</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Temperament, likes/dislikes, fears, social behavior with people and other dogs..."
                                className="min-h-[80px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={petForm.control}
                        name="specialNotes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Special Notes & Instructions</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Any other important information our staff should know..."
                                className="min-h-[60px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Emergency Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold border-b pb-2">Emergency Information</h3>
                      <FormField
                        control={petForm.control}
                        name="vetInfo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Veterinarian Information</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Vet clinic name, address, phone number, emergency contact..."
                                className="min-h-[60px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={petForm.control}
                        name="emergencyContact"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Emergency Contact</FormLabel>
                            <FormControl>
                              <Input placeholder="Alternative emergency contact name and phone number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="flex gap-3 pt-6 border-t">
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => setShowAddPet(false)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="submit" 
                        className="flex-1 bg-royal-blue hover:bg-blue-700"
                        disabled={addPetMutation.isPending}
                      >
                        {addPetMutation.isPending ? "Adding Pet..." : "Add Pet to Family"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>

          {pets.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pets.map((pet: any) => (
                <Card key={pet.id} className="overflow-hidden hover:shadow-lg transition-shadow border-l-4 border-l-royal-blue">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <Avatar className="w-20 h-20">
                        <AvatarImage src={pet.photo || undefined} />
                        <AvatarFallback className="bg-royal-blue text-white text-2xl">
                          {pet.name[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-royal-blue">{pet.name}</h3>
                        <p className="text-muted-foreground font-medium">{pet.breed}</p>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="secondary">{pet.age} years old</Badge>
                          {pet.weight && <Badge variant="outline">{pet.weight}</Badge>}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3 text-sm">
                      {pet.allergies && (
                        <div className="p-2 bg-red-50 rounded border-l-2 border-red-300">
                          <div className="font-medium text-red-800">Allergies:</div>
                          <div className="text-red-700">{pet.allergies}</div>
                        </div>
                      )}
                      {pet.medication && (
                        <div className="p-2 bg-yellow-50 rounded border-l-2 border-yellow-300">
                          <div className="font-medium text-yellow-800">Medications:</div>
                          <div className="text-yellow-700">{pet.medication}</div>
                        </div>
                      )}
                      {pet.behaviorNotes && (
                        <div className="p-2 bg-blue-50 rounded border-l-2 border-blue-300">
                          <div className="font-medium text-blue-800">Behavior Notes:</div>
                          <div className="text-blue-700">{pet.behaviorNotes}</div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center py-12 border-2 border-dashed">
              <CardContent>
                <div className="w-24 h-24 bg-royal-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Dog className="h-12 w-12 text-royal-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No pets added yet</h3>
                <p className="text-muted-foreground mb-6">Add your first pet to get started with VIP Elite K9s services</p>
                <Button 
                  onClick={() => setShowAddPet(true)}
                  className="bg-royal-blue hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Pet
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Services & Account Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 border-t-4 border-t-royal-blue"
            onClick={() => window.location.href = '/booking'}
          >
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="w-12 h-12 bg-royal-blue/10 rounded-full flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-royal-blue" />
              </div>
              <h3 className="font-bold mb-2">Book Services</h3>
              <p className="text-sm text-muted-foreground">Schedule training, boarding, or walking sessions</p>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 border-t-4 border-t-green-500">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-bold mb-2">Daily Reports</h3>
              <p className="text-sm text-muted-foreground">View detailed daily care reports for your pets</p>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 border-t-4 border-t-gold">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center mb-4">
                <CreditCard className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="font-bold mb-2">Billing</h3>
              <p className="text-sm text-muted-foreground">Manage invoices and payment history</p>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 border-t-4 border-t-purple-500">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mb-4">
                <User className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-bold mb-2">My Account</h3>
              <p className="text-sm text-muted-foreground">Update profile and account settings</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}```

---

## 📄 client/src/pages/invoicing.tsx
```typescript
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { insertInvoiceSchema } from "@shared/schema";
import { z } from "zod";
import { 
  DollarSign, 
  FileText, 
  Download, 
  Send,
  Plus,
  Search,
  Filter,
  Calendar,
  CheckCircle,
  AlertCircle,
  Clock,
  CreditCard,
  Eye,
  Edit,
  Trash2
} from "lucide-react";
import { format } from "date-fns";

// Extended invoice schema with validation
const invoiceFormSchema = insertInvoiceSchema.extend({
  items: z.array(z.object({
    description: z.string().min(1, "Description required"),
    quantity: z.number().min(1, "Quantity must be at least 1"),
    rate: z.number().min(0, "Rate must be positive"),
    amount: z.number().min(0, "Amount must be positive")
  })).min(1, "At least one item required")
});

interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export default function InvoicingPage() {
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([
    { description: "", quantity: 1, rate: 0, amount: 0 }
  ]);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Get all invoices
  const { data: invoices = [], isLoading } = useQuery({
    queryKey: ["/api/invoices"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/invoices");
      return response.json();
    },
  });

  // Get all clients for invoice creation
  const { data: clients = [] } = useQuery({
    queryKey: ["/api/clients"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/clients");
      return response.json();
    },
  });

  // Get all bookings for linking invoices
  const { data: bookings = [] } = useQuery({
    queryKey: ["/api/bookings"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/bookings");
      return response.json();
    },
  });

  // Invoice form
  const invoiceForm = useForm({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues: {
      clientId: 0,
      bookingId: null,
      amount: 0,
      description: "",
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: "pending",
      paidDate: null,
    },
  });

  // Create invoice mutation
  const createInvoiceMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/invoices", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Invoice Created! ✓",
        description: "The invoice has been generated successfully.",
      });
      setShowCreateForm(false);
      invoiceForm.reset();
      setInvoiceItems([{ description: "", quantity: 1, rate: 0, amount: 0 }]);
      queryClient.invalidateQueries({ queryKey: ["/api/invoices"] });
    },
    onError: () => {
      toast({
        title: "Creation Failed",
        description: "Unable to create invoice. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Update invoice mutation
  const updateInvoiceMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: number; updates: any }) => {
      const response = await apiRequest("PATCH", `/api/invoices/${id}`, updates);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Invoice Updated! ✓",
        description: "Invoice status has been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/invoices"] });
    },
  });

  const addInvoiceItem = () => {
    setInvoiceItems([...invoiceItems, { description: "", quantity: 1, rate: 0, amount: 0 }]);
  };

  const updateInvoiceItem = (index: number, field: keyof InvoiceItem, value: any) => {
    const updated = [...invoiceItems];
    updated[index] = { ...updated[index], [field]: value };
    
    // Calculate amount when quantity or rate changes
    if (field === 'quantity' || field === 'rate') {
      updated[index].amount = updated[index].quantity * updated[index].rate;
    }
    
    setInvoiceItems(updated);
    
    // Update total amount in form
    const totalAmount = updated.reduce((sum, item) => sum + item.amount, 0);
    invoiceForm.setValue("amount", totalAmount);
  };

  const removeInvoiceItem = (index: number) => {
    if (invoiceItems.length > 1) {
      const updated = invoiceItems.filter((_, i) => i !== index);
      setInvoiceItems(updated);
      const totalAmount = updated.reduce((sum, item) => sum + item.amount, 0);
      invoiceForm.setValue("amount", totalAmount);
    }
  };

  const handleInvoiceSubmit = (data: any) => {
    const invoiceData = {
      ...data,
      items: invoiceItems,
      issueDate: new Date(data.issueDate),
      dueDate: new Date(data.dueDate),
    };
    createInvoiceMutation.mutate(invoiceData);
  };

  const markAsPaid = (invoice: any) => {
    updateInvoiceMutation.mutate({
      id: invoice.id,
      updates: {
        status: "paid",
        paidDate: new Date()
      }
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "bg-green-500";
      case "pending": return "bg-yellow-500";
      case "overdue": return "bg-red-500";
      case "cancelled": return "bg-gray-500";
      default: return "bg-blue-500";
    }
  };

  // Filter invoices
  const filteredInvoices = invoices.filter((invoice: any) => {
    const matchesStatus = filterStatus === "all" || invoice.status === filterStatus;
    const matchesSearch = searchTerm === "" || 
      invoice.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.id.toString().includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  // Calculate totals
  const totalRevenue = invoices.reduce((sum: number, inv: any) => 
    inv.status === "paid" ? sum + inv.amount : sum, 0);
  const pendingAmount = invoices.reduce((sum: number, inv: any) => 
    inv.status === "pending" ? sum + inv.amount : sum, 0);
  const overdueAmount = invoices.reduce((sum: number, inv: any) => 
    inv.status === "overdue" ? sum + inv.amount : sum, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-royal-blue to-blue-600 text-white p-6">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Invoice Management</h1>
              <p className="text-blue-100">Professional billing and payment tracking</p>
            </div>
            <Button 
              onClick={() => setShowCreateForm(true)}
              className="bg-white text-royal-blue hover:bg-gray-100"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Invoice
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Financial Overview */}
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold text-green-600">${totalRevenue.toFixed(2)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-yellow-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">${pendingAmount.toFixed(2)}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Overdue</p>
                  <p className="text-2xl font-bold text-red-600">${overdueAmount.toFixed(2)}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-royal-blue">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Invoices</p>
                  <p className="text-2xl font-bold text-royal-blue">{invoices.length}</p>
                </div>
                <FileText className="h-8 w-8 text-royal-blue" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search invoices..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Invoices Table */}
        <Card>
          <CardHeader>
            <CardTitle>Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
                <p className="mt-2 text-muted-foreground">Loading invoices...</p>
              </div>
            ) : filteredInvoices.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice #</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Issue Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.map((invoice: any) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-mono">#{invoice.id.toString().padStart(4, '0')}</TableCell>
                      <TableCell>
                        {clients.find((c: any) => c.id === invoice.clientId)?.name || 'Unknown Client'}
                      </TableCell>
                      <TableCell className="font-semibold">${invoice.amount.toFixed(2)}</TableCell>
                      <TableCell>{format(new Date(invoice.issueDate), 'MMM dd, yyyy')}</TableCell>
                      <TableCell>{format(new Date(invoice.dueDate), 'MMM dd, yyyy')}</TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(invoice.status)} text-white`}>
                          {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedInvoice(invoice);
                              setShowDetailModal(true);
                            }}
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                          {invoice.status === "pending" && (
                            <Button
                              size="sm"
                              onClick={() => markAsPaid(invoice)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Mark Paid
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 border-2 border-dashed border-muted rounded-lg">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No invoices found matching your criteria</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Create Invoice Dialog */}
      <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">Create New Invoice</DialogTitle>
            <p className="text-muted-foreground">Generate a professional invoice for your services</p>
          </DialogHeader>

          <Form {...invoiceForm}>
            <form onSubmit={invoiceForm.handleSubmit(handleInvoiceSubmit)} className="space-y-6">
              {/* Client and Booking Selection */}
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={invoiceForm.control}
                  name="clientId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client</FormLabel>
                      <Select onValueChange={(value) => field.onChange(parseInt(value))}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select client" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {clients.map((client: any) => (
                            <SelectItem key={client.id} value={client.id.toString()}>
                              {client.name} - {client.email}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={invoiceForm.control}
                  name="bookingId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Related Booking (Optional)</FormLabel>
                      <Select onValueChange={(value) => field.onChange(value ? parseInt(value) : null)}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select booking" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="">No booking</SelectItem>
                          {bookings.map((booking: any) => (
                            <SelectItem key={booking.id} value={booking.id.toString()}>
                              {booking.serviceType} - {format(new Date(booking.startDate), 'MMM dd, yyyy')}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Invoice Items */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Invoice Items</h3>
                  <Button type="button" onClick={addInvoiceItem} variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {invoiceItems.map((item, index) => (
                    <div key={index} className="grid grid-cols-12 gap-3 items-center border p-3 rounded-lg">
                      <div className="col-span-5">
                        <Input
                          placeholder="Description"
                          value={item.description}
                          onChange={(e) => updateInvoiceItem(index, 'description', e.target.value)}
                        />
                      </div>
                      <div className="col-span-2">
                        <Input
                          type="number"
                          placeholder="Qty"
                          value={item.quantity}
                          onChange={(e) => updateInvoiceItem(index, 'quantity', parseInt(e.target.value) || 1)}
                        />
                      </div>
                      <div className="col-span-2">
                        <Input
                          type="number"
                          placeholder="Rate"
                          value={item.rate}
                          onChange={(e) => updateInvoiceItem(index, 'rate', parseFloat(e.target.value) || 0)}
                        />
                      </div>
                      <div className="col-span-2">
                        <Input
                          type="number"
                          placeholder="Amount"
                          value={item.amount}
                          readOnly
                          className="bg-muted"
                        />
                      </div>
                      <div className="col-span-1">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeInvoiceItem(index)}
                          disabled={invoiceItems.length === 1}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span>Total Amount:</span>
                    <span>${invoiceItems.reduce((sum, item) => sum + item.amount, 0).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Dates and Notes */}
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={invoiceForm.control}
                  name="issueDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Issue Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={invoiceForm.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Due Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={invoiceForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any additional notes or terms..."
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-3 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowCreateForm(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 bg-royal-blue hover:bg-blue-700"
                  disabled={createInvoiceMutation.isPending}
                >
                  {createInvoiceMutation.isPending ? "Creating..." : "Create Invoice"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Invoice Detail Modal */}
      <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Invoice Details</DialogTitle>
          </DialogHeader>
          
          {selectedInvoice && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Invoice #</p>
                  <p className="font-mono">#{selectedInvoice.id.toString().padStart(4, '0')}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge className={`${getStatusColor(selectedInvoice.status)} text-white`}>
                    {selectedInvoice.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Amount</p>
                  <p className="text-xl font-bold">${selectedInvoice.amount.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Due Date</p>
                  <p>{format(new Date(selectedInvoice.dueDate), 'MMM dd, yyyy')}</p>
                </div>
              </div>
              
              {selectedInvoice.description && (
                <div>
                  <p className="text-sm text-muted-foreground">Description</p>
                  <p>{selectedInvoice.description}</p>
                </div>
              )}
              
              <div className="flex gap-2 pt-4">
                <Button className="flex-1" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
                <Button className="flex-1" variant="outline">
                  <Send className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}```

---

## 📄 client/src/pages/not-found.tsx
```typescript
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">404 Page Not Found</h1>
          </div>

          <p className="mt-4 text-sm text-gray-600">
            Did you forget to add the page to the router?
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
```

---

## 📄 client/src/pages/reporting.tsx
```typescript
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line, 
  ResponsiveContainer 
} from "recharts";
import { 
  TrendingUp, 
  Users, 
  Clock, 
  DollarSign,
  Calendar,
  Star,
  Activity,
  Target,
  Download,
  Filter,
  BarChart3,
  PieChart as PieChartIcon,
  LineChartIcon
} from "lucide-react";
import { format, subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns";

export default function ReportingPage() {
  const [dateRange, setDateRange] = useState("30days");
  const [selectedMetric, setSelectedMetric] = useState("revenue");

  // Colors for charts
  const chartColors = ['#1e40af', '#059669', '#dc2626', '#7c3aed', '#ea580c'];

  // Get all data for analytics
  const { data: staff = [] } = useQuery({
    queryKey: ["/api/staff"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/staff");
      return response.json();
    },
  });

  const { data: jobs = [] } = useQuery({
    queryKey: ["/api/jobs"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/jobs");
      return response.json();
    },
  });

  const { data: bookings = [] } = useQuery({
    queryKey: ["/api/bookings"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/bookings");
      return response.json();
    },
  });

  const { data: invoices = [] } = useQuery({
    queryKey: ["/api/invoices"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/invoices");
      return response.json();
    },
  });

  const { data: clients = [] } = useQuery({
    queryKey: ["/api/clients"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/clients");
      return response.json();
    },
  });

  const { data: dogs = [] } = useQuery({
    queryKey: ["/api/dogs"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/dogs");
      return response.json();
    },
  });

  // Calculate key metrics
  const totalRevenue = invoices.reduce((sum: number, inv: any) => 
    inv.status === "paid" ? sum + inv.amount : sum, 0);
  
  const pendingRevenue = invoices.reduce((sum: number, inv: any) => 
    inv.status === "pending" ? sum + inv.amount : sum, 0);

  const completedJobs = jobs.filter((job: any) => job.status === "completed").length;
  const totalJobs = jobs.length;
  const jobCompletionRate = totalJobs > 0 ? (completedJobs / totalJobs * 100) : 0;

  const activeStaff = staff.filter((s: any) => s.status === "clocked_in").length;
  const confirmedBookings = bookings.filter((b: any) => b.status === "confirmed").length;

  // Service popularity data
  const serviceStats = bookings.reduce((acc: any, booking: any) => {
    acc[booking.serviceType] = (acc[booking.serviceType] || 0) + 1;
    return acc;
  }, {});

  const serviceData = Object.entries(serviceStats).map(([service, count]) => ({
    name: service.charAt(0).toUpperCase() + service.slice(1),
    value: count,
    revenue: bookings.filter((b: any) => b.serviceType === service)
      .reduce((sum: number, b: any) => sum + (b.totalAmount || 0), 0)
  }));

  // Revenue trend data (last 7 days)
  const revenueTrendData = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), 6 - i);
    const dayRevenue = invoices
      .filter((inv: any) => inv.status === "paid" && 
        format(new Date(inv.paidDate || inv.issueDate), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'))
      .reduce((sum: number, inv: any) => sum + inv.amount, 0);
    
    return {
      date: format(date, 'MMM dd'),
      revenue: dayRevenue,
      bookings: bookings.filter((b: any) => 
        format(new Date(b.startDate), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')).length
    };
  });

  // Staff performance data
  const staffPerformanceData = staff.map((s: any) => {
    const staffJobs = jobs.filter((j: any) => j.assignedStaffId === s.id);
    const completedStaffJobs = staffJobs.filter((j: any) => j.status === "completed");
    
    return {
      name: s.name,
      role: s.role,
      totalJobs: staffJobs.length,
      completedJobs: completedStaffJobs.length,
      completionRate: staffJobs.length > 0 ? (completedStaffJobs.length / staffJobs.length * 100) : 0,
      status: s.status
    };
  });

  // Monthly revenue comparison
  const currentMonth = new Date();
  const lastMonth = subDays(currentMonth, 30);
  
  const currentMonthRevenue = invoices
    .filter((inv: any) => inv.status === "paid" && 
      new Date(inv.paidDate || inv.issueDate) >= startOfMonth(currentMonth))
    .reduce((sum: number, inv: any) => sum + inv.amount, 0);

  const lastMonthRevenue = invoices
    .filter((inv: any) => inv.status === "paid" && 
      new Date(inv.paidDate || inv.issueDate) >= startOfMonth(lastMonth) &&
      new Date(inv.paidDate || inv.issueDate) < startOfMonth(currentMonth))
    .reduce((sum: number, inv: any) => sum + inv.amount, 0);

  const revenueGrowth = lastMonthRevenue > 0 ? 
    ((currentMonthRevenue - lastMonthRevenue) / lastMonthRevenue * 100) : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-royal-blue to-blue-600 text-white p-6">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Business Analytics</h1>
              <p className="text-blue-100">Comprehensive insights and performance metrics</p>
            </div>
            <div className="flex gap-3">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-40 bg-white text-royal-blue">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 Days</SelectItem>
                  <SelectItem value="30days">Last 30 Days</SelectItem>
                  <SelectItem value="90days">Last 90 Days</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="bg-white text-royal-blue hover:bg-gray-100">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Key Performance Indicators */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-3xl font-bold text-green-600">${totalRevenue.toFixed(2)}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+{revenueGrowth.toFixed(1)}% vs last month</span>
                  </div>
                </div>
                <DollarSign className="h-12 w-12 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Clients</p>
                  <p className="text-3xl font-bold text-blue-600">{clients.length}</p>
                  <p className="text-sm text-muted-foreground mt-2">{dogs.length} pets total</p>
                </div>
                <Users className="h-12 w-12 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Job Completion</p>
                  <p className="text-3xl font-bold text-purple-600">{jobCompletionRate.toFixed(1)}%</p>
                  <p className="text-sm text-muted-foreground mt-2">{completedJobs}/{totalJobs} jobs done</p>
                </div>
                <Target className="h-12 w-12 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Staff On Duty</p>
                  <p className="text-3xl font-bold text-orange-600">{activeStaff}</p>
                  <p className="text-sm text-muted-foreground mt-2">of {staff.length} total staff</p>
                </div>
                <Clock className="h-12 w-12 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="staff">Staff Performance</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Revenue Trend */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChartIcon className="h-5 w-5" />
                    Revenue Trend (Last 7 Days)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={revenueTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip formatter={(value: any, name: string) => 
                        name === 'revenue' ? [`$${value}`, 'Revenue'] : [value, 'Bookings']
                      } />
                      <Legend />
                      <Line type="monotone" dataKey="revenue" stroke="#1e40af" strokeWidth={3} />
                      <Line type="monotone" dataKey="bookings" stroke="#059669" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Service Popularity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChartIcon className="h-5 w-5" />
                    Popular Services
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={serviceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {serviceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">{confirmedBookings}</p>
                    <p className="text-sm text-muted-foreground">Confirmed Bookings</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">${pendingRevenue.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">Pending Revenue</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">{jobs.filter((j: any) => j.status === "pending").length}</p>
                    <p className="text-sm text-muted-foreground">Pending Jobs</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Revenue Tab */}
          <TabsContent value="revenue" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Monthly Revenue Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={[
                      { month: 'Last Month', revenue: lastMonthRevenue, invoices: invoices.filter((inv: any) => 
                        new Date(inv.issueDate) >= startOfMonth(lastMonth) &&
                        new Date(inv.issueDate) < startOfMonth(currentMonth)).length },
                      { month: 'This Month', revenue: currentMonthRevenue, invoices: invoices.filter((inv: any) => 
                        new Date(inv.issueDate) >= startOfMonth(currentMonth)).length }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value: any, name: string) => 
                        name === 'revenue' ? [`$${value}`, 'Revenue'] : [value, 'Invoices']
                      } />
                      <Legend />
                      <Bar dataKey="revenue" fill="#1e40af" />
                      <Bar dataKey="invoices" fill="#059669" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {serviceData.map((service, index) => (
                    <div key={service.name} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: chartColors[index % chartColors.length] }}
                        />
                        <span className="font-medium">{service.name}</span>
                      </div>
                      <span className="text-lg font-bold">${service.revenue.toFixed(2)}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Service Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={serviceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#1e40af" name="Bookings" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Service Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {serviceData.map((service, index) => (
                      <div key={service.name} className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-semibold">{service.name}</h4>
                          <Badge variant="outline">{service.value} bookings</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Revenue</p>
                            <p className="font-semibold">${service.revenue.toFixed(2)}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Avg per booking</p>
                            <p className="font-semibold">
                              ${service.value > 0 ? (service.revenue / service.value).toFixed(2) : '0.00'}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Staff Performance Tab */}
          <TabsContent value="staff" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Staff Performance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Staff Member</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Total Jobs</TableHead>
                      <TableHead>Completed</TableHead>
                      <TableHead>Completion Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {staffPerformanceData.map((staff: any) => (
                      <TableRow key={staff.name}>
                        <TableCell className="font-medium">{staff.name}</TableCell>
                        <TableCell>{staff.role}</TableCell>
                        <TableCell>
                          <Badge 
                            className={
                              staff.status === "clocked_in" ? "bg-green-500" :
                              staff.status === "on_break" ? "bg-yellow-500" : "bg-gray-500"
                            }
                          >
                            {staff.status.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>{staff.totalJobs}</TableCell>
                        <TableCell>{staff.completedJobs}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-royal-blue h-2 rounded-full" 
                                style={{ width: `${staff.completionRate}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">{staff.completionRate.toFixed(0)}%</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}```

---

## 📄 client/src/pages/staff-dashboard.tsx
```typescript
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { Clock, Coffee, LogOut, CheckCircle, MapPin, Dog, AlertCircle } from "lucide-react";
import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function StaffDashboard() {
  const { staff, logout } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [jobNotes, setJobNotes] = useState<Record<number, string>>({});

  // Redirect if not logged in
  if (!staff) {
    setLocation("/staff");
    return null;
  }

  const { data: jobs = [], isLoading: jobsLoading } = useQuery({
    queryKey: ["/api/jobs", { staffId: staff.id }],
    queryFn: () => 
      fetch(`/api/jobs?staffId=${staff.id}`, { credentials: "include" }).then(res => res.json())
  });

  const statusMutation = useMutation({
    mutationFn: async (newStatus: string) => {
      return apiRequest("PATCH", `/api/staff/${staff.id}/status`, { status: newStatus });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/staff"] });
      toast({
        title: "Status updated",
        description: "Your status has been updated successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update status. Please try again.",
        variant: "destructive",
      });
    }
  });

  const jobMutation = useMutation({
    mutationFn: async ({ jobId, updates }: { jobId: number; updates: any }) => {
      return apiRequest("PATCH", `/api/jobs/${jobId}`, updates);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/jobs"] });
      toast({
        title: "Job updated",
        description: "Job status has been updated successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update job. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleStatusChange = (newStatus: string) => {
    statusMutation.mutate(newStatus);
  };

  const handleLogout = () => {
    handleStatusChange("clocked_out");
    logout();
    setLocation("/staff");
  };

  const completeJob = (jobId: number) => {
    const notes = jobNotes[jobId] || "";
    jobMutation.mutate({
      jobId,
      updates: {
        status: "completed",
        notes,
        completedAt: new Date().toISOString()
      }
    });
  };

  const updateJobNotes = (jobId: number, notes: string) => {
    setJobNotes(prev => ({ ...prev, [jobId]: notes }));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "clocked_in":
        return <Badge className="bg-green-500 text-white">On Duty</Badge>;
      case "on_break":
        return <Badge className="bg-yellow-500 text-white">On Break</Badge>;
      case "clocked_out":
        return <Badge className="bg-gray-400 text-white">Clocked Out</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getJobTypeIcon = (type: string) => {
    switch (type) {
      case "walk":
        return <MapPin className="h-4 w-4" />;
      case "training":
        return <Dog className="h-4 w-4" />;
      case "feeding":
        return <Coffee className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-royal-blue text-white p-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">{staff.name}</h2>
              <p className="text-blue-200">{staff.role}</p>
            </div>
            <div className="flex items-center space-x-2">
              {getStatusBadge(staff.status)}
              <div className="flex gap-2">
                {staff.status === "clocked_in" && (
                  <Button 
                    className="bg-gold hover:bg-yellow-500"
                    onClick={() => handleStatusChange("on_break")}
                    disabled={statusMutation.isPending}
                  >
                    <Coffee className="mr-2 h-4 w-4" />
                    Take Break
                  </Button>
                )}
                {staff.status === "on_break" && (
                  <Button 
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => handleStatusChange("clocked_in")}
                    disabled={statusMutation.isPending}
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    Return from Break
                  </Button>
                )}
                <Button 
                  className="bg-red-600 hover:bg-red-700"
                  onClick={handleLogout}
                  disabled={statusMutation.isPending}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Clock Out
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Today's Jobs */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <CheckCircle className="mr-2 h-5 w-5" />
                Today's Jobs
              </CardTitle>
            </CardHeader>
            <CardContent>
              {jobsLoading ? (
                <div className="text-center py-4">Loading jobs...</div>
              ) : jobs.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No jobs assigned for today.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {jobs.map((job: any) => (
                    <Card key={job.id} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              {getJobTypeIcon(job.type)}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium capitalize">{job.type}</h4>
                              <p className="text-sm text-muted-foreground">{job.description}</p>
                              {job.scheduledTime && (
                                <p className="text-xs text-muted-foreground">Time: {job.scheduledTime}</p>
                              )}
                              <Badge 
                                variant={job.status === "completed" ? "default" : "secondary"}
                                className="mt-2"
                              >
                                {job.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        {job.status !== "completed" && (
                          <div className="mt-4 space-y-3">
                            <Textarea
                              placeholder="Add notes about this job..."
                              value={jobNotes[job.id] || ""}
                              onChange={(e) => updateJobNotes(job.id, e.target.value)}
                              className="min-h-[60px]"
                            />
                            <Button 
                              onClick={() => completeJob(job.id)}
                              disabled={jobMutation.isPending}
                              className="w-full bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Mark as Completed
                            </Button>
                          </div>
                        )}
                        
                        {job.notes && (
                          <div className="mt-3 p-3 bg-muted rounded-lg">
                            <p className="text-sm"><strong>Notes:</strong> {job.notes}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Boarding Tasks */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Dog className="mr-2 h-5 w-5" />
                Boarding Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground">Boarding management coming soon.</p>
                <p className="text-muted-foreground text-sm mt-2">This will show kennel duties and daily care tasks.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <CheckCircle className="h-6 w-6" />
                <span>View All Jobs</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <Dog className="h-6 w-6" />
                <span>Kennel Management</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <Clock className="h-6 w-6" />
                <span>Time Tracking</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
```

---

## 📄 client/src/pages/staff-login.tsx
```typescript
import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { StaffCard } from "@/components/staff-card";
import { StaffLoginModal } from "@/components/staff-login-modal";
import type { Staff } from "@shared/schema";

export default function StaffLogin() {
  const [, setLocation] = useLocation();
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const { data: staff = [], isLoading } = useQuery({
    queryKey: ["/api/staff"],
  });

  const handleStaffClick = (staffMember: Staff) => {
    setSelectedStaff(staffMember);
    setShowLoginModal(true);
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    setLocation("/staff/dashboard");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading staff...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-royal-blue mb-2">VIP Elite K9s</h1>
            <h2 className="text-xl font-semibold text-foreground">Staff Login</h2>
            <p className="text-muted-foreground mt-2">Click on your profile to log in</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-center">Select Your Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {staff.map((staffMember: Staff) => (
                  <StaffCard 
                    key={staffMember.id}
                    staff={staffMember}
                    onClick={() => handleStaffClick(staffMember)}
                    showStatus={false}
                  />
                ))}
              </div>
              
              {staff.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No staff members found.</p>
                  <p className="text-muted-foreground text-sm mt-2">Ask your administrator to add staff members.</p>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="text-center mt-6">
            <Button variant="outline" onClick={() => setLocation("/")}>
              Back to Admin Dashboard
            </Button>
          </div>
        </div>
      </div>

      {selectedStaff && (
        <StaffLoginModal
          staff={selectedStaff}
          open={showLoginModal}
          onOpenChange={setShowLoginModal}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
}
```

---

## 📄 client/src/components/add-job-modal.tsx
```typescript
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertJobSchema } from "@shared/schema";
import { z } from "zod";

const formSchema = insertJobSchema.extend({
  scheduledDate: z.string().min(1, "Date is required"),
});

interface AddJobModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddJobModal({ open, onOpenChange }: AddJobModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: staff = [] } = useQuery({
    queryKey: ["/api/staff"],
  });

  const { data: dogs = [] } = useQuery({
    queryKey: ["/api/dogs"],
  });

  const { data: kennels = [] } = useQuery({
    queryKey: ["/api/kennels"],
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "",
      description: "",
      assignedStaffId: undefined,
      dogId: undefined,
      kennelId: undefined,
      scheduledDate: new Date().toISOString().split('T')[0],
      scheduledTime: "",
      notes: ""
    }
  });

  const createJobMutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      const jobData = {
        ...data,
        scheduledDate: new Date(data.scheduledDate),
        assignedStaffId: data.assignedStaffId || null,
        dogId: data.dogId || null,
        kennelId: data.kennelId || null,
        scheduledTime: data.scheduledTime || null,
        notes: data.notes || null
      };
      return apiRequest("POST", "/api/jobs", jobData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/jobs"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/stats"] });
      toast({
        title: "Job created",
        description: "New job has been successfully assigned.",
      });
      form.reset();
      onOpenChange(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create job. Please try again.",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    createJobMutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Job</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="type">Job Type</Label>
              <Select onValueChange={(value) => form.setValue("type", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="walk">Dog Walking</SelectItem>
                  <SelectItem value="training">Training Session</SelectItem>
                  <SelectItem value="feeding">Feeding</SelectItem>
                  <SelectItem value="grooming">Grooming</SelectItem>
                  <SelectItem value="cleaning">Kennel Cleaning</SelectItem>
                  <SelectItem value="medication">Medication</SelectItem>
                  <SelectItem value="exercise">Exercise</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.type && (
                <p className="text-sm text-red-500">{form.formState.errors.type.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="assignedStaffId">Assign to Staff</Label>
              <Select onValueChange={(value) => form.setValue("assignedStaffId", parseInt(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select staff member" />
                </SelectTrigger>
                <SelectContent>
                  {staff.map((member: any) => (
                    <SelectItem key={member.id} value={member.id.toString()}>
                      {member.name} - {member.role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...form.register("description")}
              placeholder="Describe the job details..."
              className="min-h-[80px]"
            />
            {form.formState.errors.description && (
              <p className="text-sm text-red-500">{form.formState.errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="scheduledDate">Date</Label>
              <Input
                id="scheduledDate"
                type="date"
                {...form.register("scheduledDate")}
              />
              {form.formState.errors.scheduledDate && (
                <p className="text-sm text-red-500">{form.formState.errors.scheduledDate.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="scheduledTime">Time (Optional)</Label>
              <Input
                id="scheduledTime"
                type="time"
                {...form.register("scheduledTime")}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dogId">Dog (Optional)</Label>
              <Select onValueChange={(value) => form.setValue("dogId", parseInt(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a dog" />
                </SelectTrigger>
                <SelectContent>
                  {dogs.map((dog: any) => (
                    <SelectItem key={dog.id} value={dog.id.toString()}>
                      {dog.name} - {dog.breed}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="kennelId">Kennel (Optional)</Label>
              <Select onValueChange={(value) => form.setValue("kennelId", parseInt(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a kennel" />
                </SelectTrigger>
                <SelectContent>
                  {kennels.map((kennel: any) => (
                    <SelectItem key={kennel.id} value={kennel.id.toString()}>
                      Kennel {kennel.number} - {kennel.status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              {...form.register("notes")}
              placeholder="Additional notes or instructions..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-royal-blue hover:bg-blue-700"
              disabled={createJobMutation.isPending}
            >
              {createJobMutation.isPending ? "Creating..." : "Create Job"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}```

---

## 📄 client/src/components/add-staff-modal.tsx
```typescript
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertStaffSchema } from "@shared/schema";
import { z } from "zod";

const formSchema = insertStaffSchema.extend({
  pin: z.string().length(4, "PIN must be exactly 4 digits").regex(/^\d+$/, "PIN must contain only numbers")
});

interface AddStaffModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddStaffModal({ open, onOpenChange }: AddStaffModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      role: "",
      pin: "",
      profilePhoto: ""
    }
  });

  const createStaffMutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      return apiRequest("POST", "/api/staff", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/staff"] });
      toast({
        title: "Staff member added",
        description: "New staff member has been successfully created.",
      });
      form.reset();
      onOpenChange(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create staff member. Please try again.",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    createStaffMutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Staff Member</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              {...form.register("name")}
              placeholder="Enter full name"
            />
            {form.formState.errors.name && (
              <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="role">Role</Label>
            <Select onValueChange={(value) => form.setValue("role", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Head Trainer">Head Trainer</SelectItem>
                <SelectItem value="Boarding Specialist">Boarding Specialist</SelectItem>
                <SelectItem value="Dog Walker">Dog Walker</SelectItem>
                <SelectItem value="Groomer">Groomer</SelectItem>
                <SelectItem value="Receptionist">Receptionist</SelectItem>
                <SelectItem value="Veterinary Assistant">Veterinary Assistant</SelectItem>
              </SelectContent>
            </Select>
            {form.formState.errors.role && (
              <p className="text-sm text-red-500">{form.formState.errors.role.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="pin">4-Digit PIN</Label>
            <Input
              id="pin"
              {...form.register("pin")}
              placeholder="Enter 4-digit PIN"
              maxLength={4}
              type="password"
            />
            {form.formState.errors.pin && (
              <p className="text-sm text-red-500">{form.formState.errors.pin.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="profilePhoto">Profile Photo URL (Optional)</Label>
            <Input
              id="profilePhoto"
              {...form.register("profilePhoto")}
              placeholder="https://example.com/photo.jpg"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-royal-blue hover:bg-blue-700"
              disabled={createStaffMutation.isPending}
            >
              {createStaffMutation.isPending ? "Adding..." : "Add Staff"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}```

---

## 📄 client/src/components/error-boundary.tsx
```typescript
import React, { Component, ErrorInfo, ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('VIP Elite K9s Error:', error);
      console.error('Error Info:', errorInfo);
    }
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <Card className="w-full max-w-lg">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <CardTitle className="text-xl text-red-600">
                Oops! Something went wrong
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-center text-muted-foreground">
                We apologize for the inconvenience. The VIP Elite K9s system encountered an unexpected error.
              </p>
              
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm font-medium text-red-800 mb-2">
                    Error Details (Development):
                  </p>
                  <pre className="text-xs text-red-700 overflow-auto">
                    {this.state.error.message}
                  </pre>
                </div>
              )}

              <div className="flex gap-3">
                <Button 
                  onClick={this.handleRetry}
                  className="flex-1"
                  variant="outline"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
                <Button 
                  onClick={this.handleGoHome}
                  className="flex-1 bg-royal-blue hover:bg-blue-700"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Go Home
                </Button>
              </div>

              <p className="text-center text-xs text-muted-foreground">
                If this problem persists, please contact VIP Elite K9s support.
              </p>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

// Loading component for better UX
export function LoadingSpinner({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="animate-spin w-8 h-8 border-4 border-royal-blue border-t-transparent rounded-full mb-4" />
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
}

// Network error component
export function NetworkError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="text-center py-12">
      <div className="mx-auto w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
        <AlertTriangle className="h-6 w-6 text-yellow-600" />
      </div>
      <h3 className="text-lg font-semibold mb-2">Connection Problem</h3>
      <p className="text-muted-foreground mb-4">
        Unable to connect to VIP Elite K9s servers. Please check your internet connection.
      </p>
      <Button onClick={onRetry} variant="outline">
        <RefreshCw className="h-4 w-4 mr-2" />
        Try Again
      </Button>
    </div>
  );
}

// Empty state component
export function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  action 
}: { 
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="text-center py-12">
      <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      {action}
    </div>
  );
}```

---

## 📄 client/src/components/kennel-grid.tsx
```typescript
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Home, Fan, Dog, Utensils, Activity, Clock, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import type { Kennel } from "@shared/schema";

interface KennelGridProps {
  kennels: (Kennel & { dog?: any })[];
}

export function KennelGrid({ kennels }: KennelGridProps) {
  const [selectedKennel, setSelectedKennel] = useState<(Kennel & { dog?: any }) | null>(null);
  const [activityType, setActivityType] = useState("");
  const [notes, setNotes] = useState("");
  const { staff } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const logActivityMutation = useMutation({
    mutationFn: async (data: { kennelId: number; dogId?: number; activityType: string; notes: string }) => {
      const response = await apiRequest("POST", "/api/kennel-logs", {
        ...data,
        staffId: staff?.id,
        completed: true
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Activity Logged ✓",
        description: "Kennel activity has been recorded successfully",
      });
      setSelectedKennel(null);
      setActivityType("");
      setNotes("");
      queryClient.invalidateQueries({ queryKey: ["/api/kennels"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to log activity. Please try again.",
        variant: "destructive",
      });
    }
  });

  const updateKennelMutation = useMutation({
    mutationFn: async (data: { kennelId: number; status: string }) => {
      const response = await apiRequest("PATCH", `/api/kennels/${data.kennelId}`, {
        status: data.status
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Kennel Updated ✓",
        description: "Kennel status has been updated",
      });
      setSelectedKennel(null);
      queryClient.invalidateQueries({ queryKey: ["/api/kennels"] });
    }
  });

  const getKennelClasses = (status: string) => {
    const baseClasses = "kennel-card cursor-pointer hover:scale-105 transition-transform";
    switch (status) {
      case "occupied":
        return `${baseClasses} kennel-occupied`;
      case "cleaning":
        return `${baseClasses} kennel-cleaning`;
      default:
        return `${baseClasses} kennel-available`;
    }
  };

  const renderKennelContent = (kennel: Kennel & { dog?: any }) => {
    switch (kennel.status) {
      case "occupied":
        return (
          <>
            <div className="text-xs font-medium text-green-800 mb-1">K{kennel.number}</div>
            <div className="w-8 h-8 mx-auto mb-1">
              {kennel.dog?.photo ? (
                <Avatar className="w-full h-full">
                  <AvatarImage src={kennel.dog.photo} />
                  <AvatarFallback className="text-xs">
                    {kennel.dog.name?.[0]?.toUpperCase() || 'D'}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <div className="w-full h-full bg-green-200 rounded-full flex items-center justify-center">
                  <span className="text-xs text-green-700 font-medium">
                    {kennel.dog?.name?.[0]?.toUpperCase() || 'D'}
                  </span>
                </div>
              )}
            </div>
            <div className="text-xs text-green-700 truncate">
              {kennel.dog?.name || 'Occupied'}
            </div>
          </>
        );
      
      case "cleaning":
        return (
          <>
            <div className="text-xs font-medium text-yellow-800 mb-1">K{kennel.number}</div>
            <div className="w-8 h-8 mx-auto mb-1 bg-yellow-200 rounded-full flex items-center justify-center">
              <Fan className="text-yellow-600 h-4 w-4" />
            </div>
            <div className="text-xs text-yellow-700">Cleaning</div>
          </>
        );
      
      default:
        return (
          <>
            <div className="text-xs font-medium text-gray-600 mb-1">K{kennel.number}</div>
            <div className="w-8 h-8 mx-auto mb-1 bg-gray-200 rounded-full flex items-center justify-center">
              <Home className="text-gray-400 h-4 w-4" />
            </div>
            <div className="text-xs text-gray-500">Empty</div>
          </>
        );
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-3">
      {kennels.map((kennel) => (
        <div
          key={kennel.id}
          className={getKennelClasses(kennel.status)}
          title={`Kennel ${kennel.number} - ${kennel.status}${kennel.dog ? ` - ${kennel.dog.name}` : ''}`}
        >
          {renderKennelContent(kennel)}
        </div>
      ))}
    </div>
  );
}
```

---

## 📄 client/src/components/numeric-keypad.tsx
```typescript
import { Button } from "@/components/ui/button";
import { Delete } from "lucide-react";

interface NumericKeypadProps {
  value: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
  disabled?: boolean;
  maxLength?: number;
}

export function NumericKeypad({ 
  value, 
  onChange, 
  onComplete, 
  disabled = false,
  maxLength = 4 
}: NumericKeypadProps) {
  
  const addDigit = (digit: string) => {
    if (value.length < maxLength && !disabled) {
      const newValue = value + digit;
      onChange(newValue);
      
      if (newValue.length === maxLength && onComplete) {
        onComplete(newValue);
      }
    }
  };

  const removeDigit = () => {
    if (value.length > 0 && !disabled) {
      onChange(value.slice(0, -1));
    }
  };

  const clear = () => {
    if (!disabled) {
      onChange("");
    }
  };

  return (
    <div className="grid grid-cols-3 gap-3">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
        <Button
          key={digit}
          variant="outline"
          className="h-12 text-lg font-semibold hover:bg-muted"
          onClick={() => addDigit(digit.toString())}
          disabled={disabled}
        >
          {digit}
        </Button>
      ))}
      
      <Button
        variant="outline"
        className="h-12 hover:bg-muted"
        onClick={clear}
        disabled={disabled}
      >
        Clear
      </Button>
      
      <Button
        variant="outline"
        className="h-12 text-lg font-semibold hover:bg-muted"
        onClick={() => addDigit("0")}
        disabled={disabled}
      >
        0
      </Button>
      
      <Button
        variant="outline"
        className="h-12 hover:bg-muted"
        onClick={removeDigit}
        disabled={disabled}
      >
        <Delete className="h-4 w-4" />
      </Button>
    </div>
  );
}
```

---

## 📄 client/src/components/staff-card.tsx
```typescript
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { Staff } from "@shared/schema";

interface StaffCardProps {
  staff: Staff;
  onClick?: () => void;
  showStatus?: boolean;
}

export function StaffCard({ staff, onClick, showStatus = true }: StaffCardProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "clocked_in":
        return <Badge className="bg-green-500 text-white">On Duty</Badge>;
      case "on_break":
        return <Badge className="bg-yellow-500 text-white">On Break</Badge>;
      case "clocked_out":
        return <Badge className="bg-gray-400 text-white">Clocked Out</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusIndicator = (status: string) => {
    const baseClasses = "status-indicator";
    switch (status) {
      case "clocked_in":
        return `${baseClasses} status-clocked-in`;
      case "on_break":
        return `${baseClasses} status-on-break`;
      case "clocked_out":
        return `${baseClasses} status-clocked-out`;
      default:
        return `${baseClasses} bg-gray-400`;
    }
  };

  const formatTime = (timestamp: string | null) => {
    if (!timestamp) return null;
    return new Date(timestamp).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  return (
    <Card 
      className={`border border-gray-200 hover:shadow-md transition-shadow ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center space-x-3">
          <Avatar className="w-12 h-12">
            <AvatarImage src={staff.profilePhoto || undefined} />
            <AvatarFallback>
              {staff.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h4 className="font-medium text-foreground">{staff.name}</h4>
            <p className="text-sm text-muted-foreground">{staff.role}</p>
          </div>
          {showStatus && (
            <div className="flex items-center space-x-2">
              <div className={getStatusIndicator(staff.status)} />
              {getStatusBadge(staff.status)}
            </div>
          )}
        </div>
        
        {showStatus && (
          <div className="mt-3 text-xs text-muted-foreground">
            {staff.status === "clocked_in" && staff.clockInTime && (
              <span>Clocked in: {formatTime(staff.clockInTime.toString())}</span>
            )}
            {staff.status === "on_break" && staff.breakStartTime && (
              <span>Break started: {formatTime(staff.breakStartTime.toString())}</span>
            )}
            {staff.status === "clocked_out" && staff.lastClockOut && (
              <span>Last shift: {formatTime(staff.lastClockOut.toString())}</span>
            )}
            {staff.status === "clocked_out" && !staff.lastClockOut && (
              <span>Ready to clock in</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
```

---

## 📄 client/src/components/staff-login-modal.tsx
```typescript
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { NumericKeypad } from "./numeric-keypad";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { Clock, CheckCircle, Coffee, LogOut } from "lucide-react";
import type { Staff } from "@shared/schema";

interface StaffLoginModalProps {
  staff: Staff;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLoginSuccess?: () => void;
}

export function StaffLoginModal({ staff, open, onOpenChange, onLoginSuccess }: StaffLoginModalProps) {
  const [pin, setPin] = useState("");
  const { toast } = useToast();
  const { login } = useAuth();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: async (pin: string) => {
      const response = await apiRequest("POST", "/api/auth/staff-login", { pin });
      return response.json();
    },
    onSuccess: (data) => {
      login(data.staff);
      const clockInTime = new Date().toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
      
      toast({
        title: "Successfully Clocked In! ✓",
        description: `Welcome back ${staff.name}! Clocked in at ${clockInTime}`,
      });
      
      onOpenChange(false);
      setPin("");
      onLoginSuccess?.();
      
      // Refresh staff data and dashboard stats
      queryClient.invalidateQueries({ queryKey: ["/api/staff"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/stats"] });
    },
    onError: () => {
      toast({
        title: "Invalid PIN",
        description: "Please check your PIN and try again.",
        variant: "destructive",
      });
      setPin("");
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "clocked_in": return "bg-green-500 text-white";
      case "on_break": return "bg-yellow-500 text-white";
      case "clocked_out": return "bg-gray-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "clocked_in": return "On Duty";
      case "on_break": return "On Break";
      case "clocked_out": return "Off Duty";
      default: return "Unknown";
    }
  };

  const handleStatusChange = (action: string) => {
    if (pin.length !== 4) return;
    
    // Send different requests based on the action
    const endpoint = action === 'login' ? '/api/auth/staff-login' : '/api/staff/status';
    const payload = action === 'login' 
      ? { pin }
      : { pin, action, staffId: staff.id };
    
    loginMutation.mutate(pin);
  };

  const handleClose = () => {
    setPin("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center flex items-center justify-center gap-2">
            <Clock className="h-5 w-5 text-blue-600" />
            Clock In - {staff.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-center mb-6">
          <Avatar className="w-20 h-20 mx-auto mb-4">
            <AvatarImage src={staff.profilePhoto || undefined} />
            <AvatarFallback className="text-lg">
              {staff.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <h3 className="text-xl font-semibold">{staff.name}</h3>
          <p className="text-muted-foreground mb-2">{staff.role}</p>
          
          {/* Current Status Badge */}
          <Badge className={`${getStatusColor(staff.status)} font-medium`}>
            {getStatusText(staff.status)}
          </Badge>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-center">
            {staff.status === "clocked_out" 
              ? "Enter your 4-digit PIN to clock in and start your shift" 
              : "Enter your PIN to update your status"
            }
          </label>
          <div className="w-full text-center text-2xl font-mono border-2 border-input rounded-lg p-4 focus-within:border-royal-blue">
            {pin.padEnd(4, '•')}
          </div>
        </div>

        <NumericKeypad
          value={pin}
          onChange={setPin}
          onComplete={handlePinComplete}
          disabled={loginMutation.isPending}
        />

        {/* Loading State */}
        {loginMutation.isPending && (
          <div className="text-center space-y-2 mt-4">
            <div className="flex items-center justify-center gap-2 text-sm text-blue-600">
              <Clock className="h-4 w-4 animate-spin" />
              Processing clock-in...
            </div>
          </div>
        )}

        <div className="flex gap-2 mt-6">
          <Button variant="outline" className="flex-1" onClick={handleClose}>
            Cancel
          </Button>
          
          {staff.status === "clocked_out" ? (
            <Button 
              className="flex-1 bg-green-600 hover:bg-green-700 flex items-center gap-2"
              onClick={() => handleStatusChange('clock_in')}
              disabled={pin.length !== 4 || loginMutation.isPending}
            >
              {loginMutation.isPending ? (
                <>
                  <Clock className="h-4 w-4 animate-spin" />
                  Clocking In...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4" />
                  Clock In
                </>
              )}
            </Button>
          ) : staff.status === "clocked_in" ? (
            <>
              <Button 
                className="flex-1 bg-yellow-600 hover:bg-yellow-700 flex items-center gap-2"
                onClick={() => handleStatusChange('take_break')}
                disabled={pin.length !== 4 || loginMutation.isPending}
              >
                <Coffee className="h-4 w-4" />
                Take Break
              </Button>
              <Button 
                className="flex-1 bg-red-600 hover:bg-red-700 flex items-center gap-2"
                onClick={() => handleStatusChange('clock_out')}
                disabled={pin.length !== 4 || loginMutation.isPending}
              >
                <LogOut className="h-4 w-4" />
                Clock Out
              </Button>
            </>
          ) : (
            <Button 
              className="flex-1 bg-green-600 hover:bg-green-700 flex items-center gap-2"
              onClick={() => handleStatusChange('end_break')}
              disabled={pin.length !== 4 || loginMutation.isPending}
            >
              <CheckCircle className="h-4 w-4" />
              End Break
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
```

---

## 📄 client/src/components/vip-header.tsx
```typescript
import { Crown, Menu, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface VIPHeaderProps {
  title?: string;
  subtitle?: string;
  showNavigation?: boolean;
}

export function VIPHeader({ 
  title = "VIP Elite K9s", 
  subtitle = "Premium Dog Care Excellence",
  showNavigation = true 
}: VIPHeaderProps) {
  const navigationItems = [
    { label: "Dashboard", href: "/" },
    { label: "Staff Management", href: "/staff" },
    { label: "Client Portal", href: "/client" },
    { label: "Booking System", href: "/booking" },
    { label: "Invoicing", href: "/invoicing" },
    { label: "Reports", href: "/reporting" },
  ];

  return (
    <div className="vip-header text-white relative z-10">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          {/* VIP Elite K9s Logo & Branding */}
          <div className="flex items-center space-x-4">
            {/* Logo Container */}
            <div className="flex items-center space-x-3">
              {/* Crown Icon representing luxury */}
              <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center shadow-lg">
                <Crown className="h-8 w-8 text-royal-blue" />
              </div>
              
              {/* Brand Text */}
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-white">
                  {title}
                </h1>
                <p className="text-blue-100 text-sm font-medium tracking-wide">
                  {subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation & User Actions */}
          <div className="flex items-center space-x-4">
            {showNavigation && (
              <>
                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center space-x-6">
                  {navigationItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="text-white hover:text-gold transition-colors duration-200 font-medium"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>

                {/* Mobile Navigation */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className="lg:hidden">
                    <Button variant="ghost" size="sm" className="text-white hover:text-gold">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    {navigationItems.map((item) => (
                      <DropdownMenuItem key={item.label} asChild>
                        <a href={item.href} className="w-full">
                          {item.label}
                        </a>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Notifications */}
                <Button variant="ghost" size="sm" className="relative text-white hover:text-gold">
                  <Bell className="h-5 w-5" />
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    3
                  </Badge>
                </Button>

                {/* User Profile */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-white hover:text-gold">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Profile Settings</DropdownMenuItem>
                    <DropdownMenuItem>Account Preferences</DropdownMenuItem>
                    <DropdownMenuItem>Help & Support</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>
        </div>

        {/* Premium Features Badge */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Badge className="bg-gold text-royal-blue font-semibold px-3 py-1">
              ⭐ Premium Service
            </Badge>
            <Badge className="bg-white/10 text-white border-white/20 font-medium px-3 py-1">
              🏆 Elite Care Standards
            </Badge>
          </div>
          
          {/* Live Status Indicator */}
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-blue-100 text-sm font-medium">System Online</span>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-yellow-300 to-gold"></div>
    </div>
  );
}```

