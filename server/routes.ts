import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage-database";
import { securityMiddleware } from "./security";
import { insertStaffSchema, insertClientSchema, insertDogSchema, insertJobSchema, insertBookingSchema } from "@shared/schema";
import { z } from "zod";
import { generateInvoicePDF } from "./pdf-generator-minimal";
import { registerDailyReportsRoutes } from "./daily-reports-routes";

export async function registerRoutes(app: Express): Promise<Server> {
  // Temporarily disable strict auth for demo - will re-enable after login flow is complete
  // app.use("/api/admin", securityMiddleware.validateAuth(["admin"]));
  // app.use("/api/staff", securityMiddleware.validateAuth(["staff"])); 
  // app.use("/api/client", securityMiddleware.validateAuth(["client"]));

  // Create 5 random test clients with dogs
  app.post('/api/create-test-data', async (req, res) => {
    console.log("🧪 TEST DATA: Route hit! Creating test clients and dogs...");
    try {
      // Test client data
      const testClients = [
        {
          name: "Emma Richardson",
          email: "emma.richardson@gmail.com",
          phone: "07923456789",
          password: "password123",
          address: "78 Elm Close, Birmingham, UK"
        },
        {
          name: "Michael Torres",
          email: "m.torres@outlook.com",
          phone: "07812345678",
          password: "password123",
          address: "15 Pine Road, Liverpool, UK"
        },
        {
          name: "Sophie Mitchell",
          email: "sophie.mitchell@yahoo.co.uk",
          phone: "07798765432",
          password: "password123",
          address: "92 Cedar Lane, Bristol, UK"
        },
        {
          name: "David Campbell",
          email: "david.campbell@hotmail.com",
          phone: "07856789012",
          password: "password123",
          address: "34 Maple Gardens, Leeds, UK"
        },
        {
          name: "Rachel Foster",
          email: "r.foster@gmail.com",
          phone: "07734567890",
          password: "password123",
          address: "67 Willow Street, Sheffield, UK"
        }
      ];

      // Create clients and track their IDs
      const createdClients = [];
      for (const clientData of testClients) {
        const client = await storage.createClient(clientData);
        createdClients.push(client);
      }

      // Test dog data
      const testDogs = [
        {
          name: "Bella",
          breed: "Labrador",
          age: 4,
          clientId: createdClients[0].id,
          notes: "Gentle nature, good with children"
        },
        {
          name: "Max",
          breed: "Border Collie",
          age: 6,
          clientId: createdClients[1].id,
          notes: "Highly intelligent, needs mental stimulation"
        },
        {
          name: "Luna",
          breed: "French Bulldog",
          age: 2,
          clientId: createdClients[2].id,
          notes: "Small but feisty, loves attention"
        },
        {
          name: "Charlie",
          breed: "Cocker Spaniel",
          age: 3,
          clientId: createdClients[3].id,
          notes: "Friendly and social, great with other dogs"
        },
        {
          name: "Ruby",
          breed: "Rottweiler",
          age: 5,
          clientId: createdClients[4].id,
          notes: "Strong and loyal, requires experienced handling"
        }
      ];

      // Create dogs
      const createdDogs = [];
      for (const dogData of testDogs) {
        const dog = await storage.createDog(dogData);
        createdDogs.push(dog);
      }

      res.json({ 
        message: "Test data created successfully!",
        clients: createdClients.length,
        dogs: createdDogs.length,
        clientNames: createdClients.map(c => c.name),
        dogNames: createdDogs.map(d => d.name)
      });
    } catch (error: any) {
      console.error("Error creating test data:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Authentication routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // Create role-based token
      const userData = { id: user.id, username: user.username, role: user.role };
      const token = Buffer.from(JSON.stringify(userData)).toString('base64');
      
      res.json({ 
        user: userData,
        token,
        redirectTo: "/admin"
      });
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

  // Staff routes (temporarily accessible for dashboard demo)
  app.get("/api/staff", async (req, res) => {
    // Bypass auth check for demo
    res.setHeader('Access-Control-Allow-Origin', '*');
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

  // Delete staff member
  app.delete("/api/staff/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const staffId = parseInt(id);
      
      // Check if staff member exists
      const staff = await storage.getStaff(staffId);
      if (!staff) {
        return res.status(404).json({ message: "Staff member not found" });
      }
      
      // Delete the staff member
      await storage.deleteStaff(staffId);
      res.json({ message: "Staff member deleted successfully" });
    } catch (error) {
      console.error("Error deleting staff:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Update staff hourly wage
  app.patch("/api/staff/:id/wage", async (req, res) => {
    try {
      const { id } = req.params;
      const { hourlyRate } = req.body;
      const staffId = parseInt(id);
      
      if (!hourlyRate || hourlyRate < 0) {
        return res.status(400).json({ message: "Valid hourly rate required" });
      }
      
      // Convert pounds to pence for storage
      const hourlyRateInPence = Math.round(hourlyRate * 100);
      
      const updatedStaff = await storage.updateStaff(staffId, { 
        hourlyRate: hourlyRateInPence 
      });
      
      if (!updatedStaff) {
        return res.status(404).json({ message: "Staff member not found" });
      }
      
      res.json({ 
        message: "Hourly wage updated successfully",
        staff: updatedStaff
      });
    } catch (error) {
      console.error("Error updating staff wage:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Weekly wage slip route
  app.get("/api/staff/:id/wage-slip/weekly", async (req, res) => {
    try {
      const staffId = parseInt(req.params.id);
      const { weekOffset = "0" } = req.query;
      
      const weekOffsetNum = parseInt(weekOffset as string);
      const today = new Date();
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay() - (weekOffsetNum * 7));
      startOfWeek.setHours(0, 0, 0, 0);
      
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);
      
      const wageSlip = await storage.calculateWages(staffId, startOfWeek, endOfWeek);
      res.json({
        ...wageSlip,
        period: "weekly",
        startDate: startOfWeek,
        endDate: endOfWeek
      });
    } catch (error) {
      console.error("Error generating weekly wage slip:", error);
      res.status(500).json({ message: "Failed to generate wage slip" });
    }
  });

  // Monthly wage slip route
  app.get("/api/staff/:id/wage-slip/monthly", async (req, res) => {
    try {
      const staffId = parseInt(req.params.id);
      const { monthOffset = "0" } = req.query;
      
      const monthOffsetNum = parseInt(monthOffset as string);
      const today = new Date();
      const targetMonth = new Date(today.getFullYear(), today.getMonth() - monthOffsetNum, 1);
      
      const startOfMonth = new Date(targetMonth.getFullYear(), targetMonth.getMonth(), 1);
      const endOfMonth = new Date(targetMonth.getFullYear(), targetMonth.getMonth() + 1, 0, 23, 59, 59, 999);
      
      const wageSlip = await storage.calculateWages(staffId, startOfMonth, endOfMonth);
      res.json({
        ...wageSlip,
        period: "monthly",
        startDate: startOfMonth,
        endDate: endOfMonth
      });
    } catch (error) {
      console.error("Error generating monthly wage slip:", error);
      res.status(500).json({ message: "Failed to generate wage slip" });
    }
  });

  // Get all wage slips for payroll overview
  app.get("/api/wage-slips/overview", async (req, res) => {
    try {
      const { period = "weekly", offset = "0" } = req.query;
      const offsetNum = parseInt(offset as string);
      
      const allStaff = await storage.getAllStaff();
      const wageSlips = [];
      
      for (const staffMember of allStaff) {
        if (period === "weekly") {
          const weeklySlip = await fetch(`${req.protocol}://${req.get('host')}/api/staff/${staffMember.id}/wage-slip/weekly?weekOffset=${offset}`);
          const data = await weeklySlip.json();
          wageSlips.push(data);
        } else {
          const monthlySlip = await fetch(`${req.protocol}://${req.get('host')}/api/staff/${staffMember.id}/wage-slip/monthly?monthOffset=${offset}`);
          const data = await monthlySlip.json();
          wageSlips.push(data);
        }
      }
      
      const totalWages = wageSlips.reduce((sum, slip) => sum + (slip.totalWages || 0), 0);
      const totalHours = wageSlips.reduce((sum, slip) => sum + (slip.totalHours || 0), 0);
      
      res.json({
        period,
        wageSlips,
        summary: {
          totalStaff: allStaff.length,
          totalWages,
          totalHours,
          averageHoursPerStaff: totalHours / allStaff.length || 0
        }
      });
    } catch (error) {
      console.error("Error getting wage slip overview:", error);
      res.status(500).json({ message: "Failed to get wage overview" });
    }
  });

  // PDF wage slip download routes
  app.get("/api/staff/:id/wage-slip/weekly/pdf", async (req, res) => {
    try {
      const staffId = parseInt(req.params.id);
      const { weekOffset = "0" } = req.query;
      
      const weekOffsetNum = parseInt(weekOffset as string);
      const today = new Date();
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay() - (weekOffsetNum * 7));
      startOfWeek.setHours(0, 0, 0, 0);
      
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);
      
      const wageSlip = await storage.calculateWages(staffId, startOfWeek, endOfWeek);
      const staffMember = await storage.getStaff(staffId);
      
      if (!staffMember) {
        return res.status(404).json({ message: "Staff member not found" });
      }
      
      const { generateWageSlipPDF } = await import('./wage-slip-pdf-generator');
      generateWageSlipPDF(res, {
        ...wageSlip,
        staffRole: staffMember.role,
        hourlyRate: staffMember.hourlyRate || 0,
        period: "weekly",
        startDate: startOfWeek,
        endDate: endOfWeek
      });
    } catch (error) {
      console.error("Error generating weekly wage slip PDF:", error);
      res.status(500).json({ message: "Failed to generate wage slip PDF" });
    }
  });

  app.get("/api/staff/:id/wage-slip/monthly/pdf", async (req, res) => {
    try {
      const staffId = parseInt(req.params.id);
      const { monthOffset = "0" } = req.query;
      
      const monthOffsetNum = parseInt(monthOffset as string);
      const today = new Date();
      const targetMonth = new Date(today.getFullYear(), today.getMonth() - monthOffsetNum, 1);
      
      const startOfMonth = new Date(targetMonth.getFullYear(), targetMonth.getMonth(), 1);
      const endOfMonth = new Date(targetMonth.getFullYear(), targetMonth.getMonth() + 1, 0, 23, 59, 59, 999);
      
      const wageSlip = await storage.calculateWages(staffId, startOfMonth, endOfMonth);
      const staffMember = await storage.getStaff(staffId);
      
      if (!staffMember) {
        return res.status(404).json({ message: "Staff member not found" });
      }
      
      const { generateWageSlipPDF } = await import('./wage-slip-pdf-generator');
      generateWageSlipPDF(res, {
        ...wageSlip,
        staffRole: staffMember.role,
        hourlyRate: staffMember.hourlyRate || 0,
        period: "monthly",
        startDate: startOfMonth,
        endDate: endOfMonth
      });
    } catch (error) {
      console.error("Error generating monthly wage slip PDF:", error);
      res.status(500).json({ message: "Failed to generate wage slip PDF" });
    }
  });

  // Get wage calculation for staff member
  app.get("/api/staff/:id/wages", async (req, res) => {
    try {
      const { id } = req.params;
      const { startDate, endDate } = req.query;
      const staffId = parseInt(id);
      
      if (!startDate || !endDate) {
        return res.status(400).json({ message: "Start date and end date required" });
      }
      
      const wages = await storage.calculateWages(
        staffId,
        new Date(startDate as string),
        new Date(endDate as string)
      );
      
      res.json(wages);
    } catch (error) {
      console.error("Error calculating wages:", error);
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
      console.log("🚀 API: Fetching clients...");
      const clients = await storage.getAllClients();
      console.log("🎯 API: Got clients:", clients.length, clients.map(c => c.name));
      res.json(clients);
    } catch (error) {
      console.error("❌ API Error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/clients", async (req, res) => {
    try {
      console.log("📝 Creating client with data:", req.body);
      const validatedData = insertClientSchema.parse(req.body);
      console.log("✅ Validation passed, creating client...");
      const client = await storage.createClient(validatedData);
      console.log("✅ Client created successfully:", client.id);
      res.json(client);
    } catch (error) {
      console.error("❌ Client creation error:", error);
      if (error instanceof z.ZodError) {
        console.error("❌ Validation errors:", error.errors);
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.patch("/api/clients/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      console.log("Updating client", id, "with data:", req.body);
      
      // Filter out all problematic fields and only keep the ones we want to update
      const { id: _, createdAt, updatedAt, password, ...cleanData } = req.body;
      
      const updated = await storage.updateClient(id, cleanData);
      if (updated) {
        res.json(updated);
      } else {
        res.status(404).json({ message: "Client not found" });
      }
    } catch (error) {
      console.error("Error updating client:", error);
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

  // Delete client route
  app.delete("/api/clients/:id", async (req, res) => {
    try {
      const clientId = parseInt(req.params.id);
      
      // First delete all dogs belonging to this client
      const clientDogs = await storage.getDogsByClient(clientId);
      for (const dog of clientDogs) {
        await storage.deleteDog(dog.id);
      }
      
      // Then delete the client
      const success = await storage.deleteClient(clientId);
      if (success) {
        res.json({ message: "Client and associated dogs deleted successfully" });
      } else {
        res.status(404).json({ message: "Client not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Update dog route
  app.patch("/api/dogs/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      console.log("Updating dog", id, "with data:", req.body);
      
      // Filter out problematic fields like we did for clients
      const { id: _, createdAt, updatedAt, ...cleanData } = req.body;
      
      const updated = await storage.updateDog(id, cleanData);
      if (updated) {
        res.json(updated);
      } else {
        res.status(404).json({ message: "Dog not found" });
      }
    } catch (error) {
      console.error("Error updating dog:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Delete dog route
  app.delete("/api/dogs/:id", async (req, res) => {
    try {
      const dogId = parseInt(req.params.id);
      const success = await storage.deleteDog(dogId);
      if (success) {
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
      res.json(kennels);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // New endpoint: Get kennels with current booking information
  app.get("/api/kennels-with-bookings", async (req, res) => {
    try {
      const kennelsWithBookings = await storage.getKennelsWithBookings();
      res.json(kennelsWithBookings);
    } catch (error) {
      console.error("Error fetching kennels with bookings:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

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

      // Smart validation: check dates and household rules first
      const currentDogIds = kennel.dogIds || [];

      if (currentDogIds.length > 0 && dogIds.length > 0) {
        const existingDog = await storage.getDog(currentDogIds[0]);
        const newDog = await storage.getDog(dogIds[0]);
        
        if (existingDog && newDog) {
          const newCheckIn = new Date(checkInDate);
          const newCheckOut = new Date(checkOutDate);
          const existingCheckIn = kennel.checkInDate ? new Date(kennel.checkInDate) : new Date();
          const existingCheckOut = kennel.checkOutDate ? new Date(kennel.checkOutDate) : new Date();

          // Check for date overlap
          const hasOverlap = newCheckIn < existingCheckOut && newCheckOut > existingCheckIn;

          if (!hasOverlap) {
            // Dates don't overlap — skip validation
            console.log("✅ No date overlap detected, skipping conflict validation");
          } else {
            // Overlapping dates - validate household rules
            if (existingDog.clientId !== newDog.clientId) {
              return res.status(400).json({ 
                message: `Booking conflict: Kennel occupied by ${existingDog.name} until ${existingCheckOut.toLocaleDateString()}` 
              });
            }

            // Only now check the 2 dog limit
            const overlappingDogsCount = currentDogIds.length + dogIds.length;
            if (overlappingDogsCount > 2) {
              return res.status(400).json({ message: "Cannot exceed 2 dogs per kennel for overlapping dates" });
            }
          }
        }
      }

      // Clear any existing boarding bookings for these dogs and create new ones
      console.log("🔍 Creating bookings for dogs:", dogIds);
      for (const dogId of dogIds) {
        const dog = await storage.getDog(dogId);
        console.log("🐕 Found dog:", dog);
        if (dog) {
          // First, get existing bookings for this dog
          const existingBookings = await storage.getAllBookings();
          const dogBookings = existingBookings.filter(b => b.dogId === dogId && b.serviceType === "boarding");
          
          // Cancel existing boarding bookings for this dog
          for (const existingBooking of dogBookings) {
            console.log("🗑️ Canceling existing booking:", existingBooking.id);
            await storage.updateBooking(existingBooking.id, { status: "cancelled" });
          }
          
          // Create new booking
          const booking = await storage.createBooking({
            clientId: dog.clientId,
            dogId: dogId,
            serviceType: "boarding",
            startDate: new Date(checkInDate),
            endDate: new Date(checkOutDate),
            notes: `Kennel #${kennel.number} assignment`,
          });
          console.log("📅 NEW BOOKING CREATED:", booking);
          console.log("📅 Booking dates:", { start: booking.startDate, end: booking.endDate });
        } else {
          console.log("❌ Dog not found for ID:", dogId);
        }
      }

      // Create individual bookings in the system - don't modify kennel directly
      // The kennel will show the queue count, but individual bookings track the actual dates
      console.log("🎯 Creating separate booking entries for queue system");
      
      // Don't update kennel dogIds - let the booking system handle the queue
      // Just mark kennel as occupied so it shows in the grid
      const updated = await storage.updateKennel(kennelId, {
        status: "occupied",
        // Don't set dogIds here - the display logic will get them from bookings
      });

      // AUTO-ESTIMATE: Create automatic estimate for boarding service
      if (dogIds.length > 0) {
        try {
          console.log("🎯 AUTO-ESTIMATE: Starting auto-estimate creation...");
          const firstDog = await storage.getDog(dogIds[0]);
          console.log("🐕 AUTO-ESTIMATE: Found dog:", firstDog?.name);
          
          if (firstDog) {
            const nights = Math.ceil((new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) / (1000 * 60 * 60 * 24));
            console.log("🌙 AUTO-ESTIMATE: Calculated nights:", nights);
            
            const servicePricing = await storage.getAllServicePricing();
            const boardingPricing = servicePricing.find(p => p.serviceType.toLowerCase() === 'boarding');
            console.log("💰 AUTO-ESTIMATE: Found boarding pricing:", boardingPricing);
            
            if (boardingPricing) {
              const totalCost = boardingPricing.pricePerUnit * 100 * nights * dogIds.length; // Convert to pence
              console.log("💵 AUTO-ESTIMATE: Calculated cost:", totalCost, "pence (£" + (totalCost / 100).toFixed(2) + ")");
              
              const autoEstimate = await storage.createInvoice({
                clientId: firstDog.clientId,
                amount: totalCost,
                status: "estimate",
                issueDate: new Date(),
                dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                description: `Auto-generated estimate for Kennel #${kennel.number} boarding (${nights} nights, ${dogIds.length} dog${dogIds.length === 1 ? '' : 's'})`,
                bookingId: null
              });
              
              console.log("✅ AUTO-ESTIMATE CREATED:", autoEstimate.id, "for £" + (totalCost / 100).toFixed(2));
            } else {
              console.log("❌ AUTO-ESTIMATE: No boarding pricing found");
            }
          }
        } catch (estimateError) {
          console.log("⚠️ Auto-estimate failed (kennel assignment still successful):", estimateError);
        }
      }

      console.log("✅ Enhanced assignment complete:", updated);
      console.log("🔍 Updated dogIds:", updated?.dogIds);
      console.log("🔍 dogIds type:", typeof updated?.dogIds, Array.isArray(updated?.dogIds));
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

  app.get("/api/kennels/availability", async (req, res) => {
    try {
      const { start, end } = req.query;

      if (!start || !end) {
        return res.status(400).json({ message: "Missing date range" });
      }

      const startDate = new Date(start as string);
      const endDate = new Date(end as string);

      const kennels = await storage.getAllKennels();

      const availability: Record<string, Record<number, boolean>> = {};

      for (
        let d = new Date(startDate);
        d <= endDate;
        d.setDate(d.getDate() + 1)
      ) {
        const dateKey = d.toISOString().split("T")[0];
        availability[dateKey] = {};

        kennels.forEach((k) => {
          if (
            k.checkInDate &&
            k.checkOutDate &&
            d >= new Date(k.checkInDate) &&
            d <= new Date(k.checkOutDate)
          ) {
            availability[dateKey][k.number] = false;
          } else {
            availability[dateKey][k.number] = true;
          }
        });
      }

      res.json(availability);
    } catch (error) {
      console.error("Error generating availability:", error);
      res.status(500).json({ message: "Failed to fetch availability" });
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

  // Booking routes
  app.get("/api/bookings", async (req, res) => {
    try {
      const allBookings = await storage.getAllBookings();
      // Filter out cancelled bookings for the calendar
      const activeBookings = allBookings.filter(booking => booking.status !== 'cancelled');
      console.log("📋 Returning", activeBookings.length, "active bookings out of", allBookings.length, "total");
      res.json(activeBookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({ message: "Failed to load bookings" });
    }
  });

  app.post("/api/bookings", async (req, res) => {
    try {
      // Fix date formatting for database and ensure time fields are preserved
      const bookingData = {
        ...req.body,
        startDate: new Date(req.body.startDate),
        endDate: req.body.endDate ? new Date(req.body.endDate) : null,
        startTime: req.body.startTime || null,
        endTime: req.body.endTime || null,
        duration: req.body.duration || null,
        staffId: req.body.staffId || null
      };
      
      const booking = await storage.createBooking(bookingData);

      // AUTO-GENERATE ESTIMATE: Create estimate automatically when booking is created
      console.log("🔍 AUTO-ESTIMATE: Checking booking for estimate generation:", {
        id: booking.id,
        serviceType: booking.serviceType,
        startDate: booking.startDate,
        endDate: booking.endDate
      });
      
      // AUTO-GENERATE ESTIMATES: Now works for ALL services (Boarding, Training, Walking)
      if (booking.startDate && (booking.serviceType === 'boarding' || booking.serviceType === 'training' || booking.serviceType === 'walking')) {
        try {
          console.log(`🎯 AUTO-ESTIMATE: Creating estimate for ${booking.serviceType} booking:`, booking.id);
          
          // Get pricing from service pricing table
          const servicePricing = await storage.getAllServicePricing();
          
          let totalAmount: number;
          let units: number;
          let unitType: string;
          
          if (booking.serviceType === 'boarding') {
            // Calculate nights for boarding
            const checkIn = new Date(booking.startDate);
            const checkOut = new Date(booking.endDate || booking.startDate);
            units = Math.max(1, Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)));
            unitType = 'nights';
            
            const boardingPrice = servicePricing.find(p => p.serviceType?.toLowerCase() === 'boarding');
            const pricePerUnit = boardingPrice ? boardingPrice.pricePerUnit * 100 : 4000; // Convert to pence
            totalAmount = units * pricePerUnit;
            
          } else if (booking.serviceType === 'training') {
            // Training uses duration in hours
            units = booking.duration || 1;
            unitType = 'hours';
            
            const trainingPrice = servicePricing.find(p => p.serviceName?.toLowerCase().includes('training'));
            const pricePerUnit = trainingPrice ? trainingPrice.pricePerUnit * 100 : 4500; // Convert to pence
            totalAmount = units * pricePerUnit;
            
          } else if (booking.serviceType === 'walking') {
            // Walking is typically per session
            units = booking.duration || 1;
            unitType = 'sessions';
            
            const walkingPrice = servicePricing.find(p => p.serviceName?.toLowerCase().includes('walking'));
            const pricePerUnit = walkingPrice ? walkingPrice.pricePerUnit * 100 : 2000; // Convert to pence
            totalAmount = units * pricePerUnit;
          } else {
            throw new Error(`Unsupported service type: ${booking.serviceType}`);
          }
          
          console.log(`💰 AUTO-ESTIMATE: Calculated ${units} ${unitType} for ${booking.serviceType} = £${totalAmount / 100}`);
          
          const estimateData = {
            clientId: booking.clientId,
            bookingId: booking.id,
            kennelNumber: booking.serviceType === 'boarding' ? (req.body.kennelNumber || 1) : null,
            dogIds: [booking.dogId],
            serviceType: booking.serviceType,
            checkInDate: new Date(booking.startDate),
            checkOutDate: booking.endDate ? new Date(booking.endDate) : new Date(booking.startDate),
            nights: booking.serviceType === 'boarding' ? units : 1,
            pricePerNight: Math.floor(totalAmount / units),
            totalAmount: totalAmount,
            status: "pending" as const,
            notes: `Auto-generated estimate for ${booking.serviceType} booking #${booking.id} (${units} ${unitType})`
          };

          const estimate = await storage.createEstimate(estimateData);
          console.log("✅ AUTO-ESTIMATE: Created estimate:", estimate.id, "for £" + (totalAmount / 100));
          
          // Return booking with estimate info
          res.json({ 
            ...booking, 
            estimateId: estimate.id,
            estimateTotal: totalAmount / 100,
            message: "Booking created with automatic estimate"
          });
        } catch (estimateError) {
          console.error("❌ AUTO-ESTIMATE: Failed to create estimate:", estimateError);
          // Return booking even if estimate creation fails
          res.json({ ...booking, message: "Booking created but estimate generation failed" });
        }
      } else if (booking.serviceType === 'training') {
        try {
          console.log("🎯 AUTO-ESTIMATE: Creating estimate for training booking:", booking.id);
          
          // Get pricing from service pricing table
          const servicePricing = await storage.getAllServicePricing();
          console.log("📋 Available pricing:", servicePricing.map(p => `${p.serviceName}: £${p.pricePerUnit}`));
          
          // Find training pricing based on training type from booking
          const trainingType = booking.trainingType || "1-on-1"; // Default to 1-on-1
          
          let trainingPrice;
          if (trainingType === "group") {
            // Find group training price (£40)
            trainingPrice = servicePricing.find(p => 
              p.serviceName?.toLowerCase().includes('training') && 
              !p.serviceName?.toLowerCase().includes('1-on-1')
            );
          } else {
            // Find 1-on-1 training price (£45)
            trainingPrice = servicePricing.find(p => 
              p.serviceName?.toLowerCase().includes('training') && 
              p.serviceName?.toLowerCase().includes('1-on-1')
            );
          }
          
          // Fallback to any training price if specific type not found
          if (!trainingPrice) {
            trainingPrice = servicePricing.find(p => p.serviceName?.toLowerCase().includes('training'));
          }
          
          const pricePerSession = trainingPrice ? trainingPrice.pricePerUnit * 100 : 4500; // Convert to pence, default £45
          const sessions = 1; // Default to 1 session for training
          const totalAmount = sessions * pricePerSession;
          
          console.log("💰 Training pricing found:", trainingPrice?.serviceName, "at £", trainingPrice?.pricePerUnit);
          console.log("🎯 Training type selected:", trainingType);
          
          const estimateData = {
            clientId: booking.clientId,
            bookingId: booking.id,
            kennelNumber: 0, // Training doesn't use kennels
            dogIds: [booking.dogId],
            totalAmount: totalAmount,
            services: JSON.stringify({
              serviceType: 'training',
              trainingType: trainingType,
              sessions: sessions,
              pricePerSession: pricePerSession / 100,
              originalTotal: totalAmount / 100
            }),
            notes: `Auto-generated estimate for ${trainingType} training session - booking #${booking.id}`
          };

          const estimate = await storage.createEstimate(estimateData);
          console.log("✅ AUTO-ESTIMATE: Created training estimate:", estimate.id, "for £" + (totalAmount / 100));
          
          // Return booking with estimate info
          res.json({ 
            ...booking, 
            estimateId: estimate.id,
            estimateTotal: totalAmount / 100,
            message: "Training booking created with automatic estimate"
          });
        } catch (estimateError) {
          console.error("❌ AUTO-ESTIMATE: Failed to create training estimate:", estimateError);
          // Return booking even if estimate creation fails
          res.json({ ...booking, message: "Training booking created but estimate generation failed" });
        }
      } else {
        res.json(booking);
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      res.status(500).json({ message: "Failed to create booking" });
    }
  });

  app.delete("/api/bookings/:id", async (req, res) => {
    try {
      const bookingId = parseInt(req.params.id);
      console.log(`🗑️ Canceling booking ${bookingId} and cleaning up financial records...`);
      
      // Find and remove associated estimates (search by booking ID)
      const estimates = await storage.getAllEstimates();
      const relatedEstimates = estimates.filter((est: any) => est.bookingId === bookingId);
      
      for (const estimate of relatedEstimates) {
        console.log(`🧾 Removing estimate #${estimate.id} for canceled booking`);
        await storage.deleteEstimate(estimate.id);
      }
      
      // Find and remove associated invoices
      const invoices = await storage.getAllInvoices();
      const relatedInvoices = invoices.filter((inv: any) => inv.bookingId === bookingId);
      
      for (const invoice of relatedInvoices) {
        console.log(`💰 Removing invoice #${invoice.id} for canceled booking`);
        await storage.deleteInvoice(invoice.id);
      }
      
      // Delete the booking itself
      const success = await storage.deleteBooking(bookingId);
      
      console.log(`✅ Cleaned up: ${relatedEstimates.length} estimates, ${relatedInvoices.length} invoices, booking deleted: ${success}`);
      res.json({ 
        message: "Booking canceled successfully", 
        removedEstimates: relatedEstimates.length,
        removedInvoices: relatedInvoices.length,
        bookingDeleted: success
      });
    } catch (error) {
      console.error("❌ Error canceling booking:", error);
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

  // Service Pricing Routes
  app.get("/api/service-pricing", async (req, res) => {
    try {
      const pricing = await storage.getAllServicePricing();
      res.json(pricing);
    } catch (error) {
      console.error("Error fetching service pricing:", error);
      res.status(500).json({ message: "Failed to fetch service pricing" });
    }
  });

  app.post("/api/service-pricing", async (req, res) => {
    try {
      const pricing = await storage.createServicePricing(req.body);
      res.status(201).json(pricing);
    } catch (error) {
      console.error("Error creating service pricing:", error);
      res.status(500).json({ message: "Failed to create service pricing" });
    }
  });

  app.put("/api/service-pricing/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const pricing = await storage.updateServicePricing(id, req.body);
      if (!pricing) {
        return res.status(404).json({ message: "Service pricing not found" });
      }
      res.json(pricing);
    } catch (error) {
      console.error("Error updating service pricing:", error);
      res.status(500).json({ message: "Failed to update service pricing" });
    }
  });

  app.delete("/api/service-pricing/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteServicePricing(id);
      if (!success) {
        return res.status(404).json({ message: "Service pricing not found" });
      }
      res.json({ message: "Service pricing deleted successfully" });
    } catch (error) {
      console.error("Error deleting service pricing:", error);
      res.status(500).json({ message: "Failed to delete service pricing" });
    }
  });

  // Import the new financial manager
  const { financialManager } = await import("./financial-manager");
  
  // WORKING AROUND ROUTING ISSUE - Using POST instead of DELETE
  console.log("🚨 Registering cancellation routes using POST method");
  
  app.post("/api/cancel-estimate", async (req, res) => {
    console.log("🎯 POST /api/cancel-estimate called!");
    try {
      const { estimateId } = req.body;
      console.log(`🗑️ Using FinancialManager to delete estimate ${estimateId}...`);
      
      const success = await financialManager.deleteEstimate(estimateId);
      
      if (success) {
        console.log(`✅ FinancialManager successfully deleted estimate ${estimateId}`);
        res.json({ message: "Estimate and booking cancelled successfully", success: true });
      } else {
        console.log(`❌ FinancialManager failed to delete estimate ${estimateId}`);
        res.status(500).json({ message: "Failed to cancel estimate", success: false });
      }
    } catch (error) {
      console.error("❌ Error in cancel-estimate route:", error);
      res.status(500).json({ message: "Internal server error", success: false });
    }
  });

  app.post("/api/cancel-booking", async (req, res) => {
    console.log("🎯 POST /api/cancel-booking called!");
    try {
      const { bookingId } = req.body;
      console.log(`🗑️ Using FinancialManager to cancel booking ${bookingId}...`);
      
      const success = await financialManager.cancelBookingCompletely(bookingId);
      
      if (success) {
        console.log(`✅ FinancialManager successfully cancelled booking ${bookingId}`);
        res.json({ message: "Booking completely cancelled", success: true });
      } else {
        console.log(`❌ FinancialManager failed to cancel booking ${bookingId}`);
        res.status(500).json({ message: "Failed to cancel booking", success: false });
      }
    } catch (error) {
      console.error("❌ Error in cancel-booking route:", error);
      res.status(500).json({ message: "Internal server error", success: false });
    }
  });

  app.post("/api/estimates", async (req, res) => {
    try {
      const { clientId, dogIds, services, checkInDate, checkOutDate, notes } = req.body;
      
      // Calculate total cost based on booking duration and service pricing
      const checkIn = new Date(checkInDate);
      const checkOut = new Date(checkOutDate);
      const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
      
      let totalCost = 0;
      const servicePricing = await storage.getAllServicePricing();
      
      for (const serviceType of services) {
        const pricing = servicePricing.find(p => p.serviceType.toLowerCase() === serviceType.toLowerCase());
        if (pricing) {
          if (serviceType.toLowerCase() === 'boarding') {
            // Boarding is per night per dog - convert to pence (£40 = 4000 pence)
            totalCost += pricing.pricePerUnit * 100 * nights * dogIds.length;
          } else {
            // Other services are per session per dog - convert to pence
            totalCost += pricing.pricePerUnit * 100 * dogIds.length;
          }
        }
      }
      
      // Create invoice/estimate record
      const invoice = await storage.createInvoice({
        clientId: clientId,
        amount: totalCost, // amount is stored in pence
        finalAmount: totalCost, // final amount same as amount initially
        issueDate: new Date(),
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        services: Array.isArray(services) ? services.join(', ') : services,
        notes: notes || "",
        bookingId: null // No booking ID for estimates
      });
      
      console.log("💰 Created estimate:", invoice.id, "for £" + (totalCost / 100).toFixed(2));
      res.json(invoice);
    } catch (error) {
      console.error("Error creating estimate:", error);
      res.status(500).json({ message: "Failed to create estimate" });
    }
  });

  // Convert estimate to invoice
  app.patch("/api/invoices/:id/convert", async (req, res) => {
    try {
      const { id } = req.params;
      
      const invoice = await storage.updateInvoice(parseInt(id), {
        status: "unpaid",
        issueDate: new Date(),
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
      });
      
      if (!invoice) {
        return res.status(404).json({ message: "Invoice not found" });
      }
      
      console.log("📋 Converted estimate to invoice:", invoice.id);
      res.json(invoice);
    } catch (error) {
      console.error("Error converting estimate:", error);
      res.status(500).json({ message: "Failed to convert estimate" });
    }
  });

  // Enhanced Invoice Management Routes
  app.get("/api/invoices", async (req, res) => {
    try {
      const invoices = await storage.getAllInvoices();
      console.log("📋 INVOICES: Returning", invoices.length, "invoices");
      res.json(invoices);
    } catch (error) {
      console.error("❌ Error fetching invoices:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Create invoice from estimate with discount support
  app.post("/api/invoices/from-estimate/:estimateId", async (req, res) => {
    try {
      const estimateId = parseInt(req.params.estimateId);
      const { discountAmount, discountReason } = req.body;
      
      console.log("🧾 Creating invoice from estimate:", estimateId, "with discount:", discountAmount);
      
      const estimate = await storage.getEstimate(estimateId);
      if (!estimate) {
        return res.status(404).json({ message: "Estimate not found" });
      }

      // Calculate final amount after discount
      const originalAmount = estimate.totalAmount;
      const discount = discountAmount ? Math.round(discountAmount * 100) : 0; // Convert to pence
      const finalAmount = originalAmount - discount;

      // Create invoice from estimate data
      const invoiceData = {
        estimateId: estimate.id,
        clientId: estimate.clientId,
        bookingId: estimate.bookingId,
        amount: originalAmount,
        discountAmount: discount,
        discountReason: discountReason || null,
        finalAmount: finalAmount,
        paymentStatus: "unpaid" as const,
        paymentDate: null,
        paymentMethod: null,
        issueDate: new Date(),
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        description: `Invoice for ${estimate.serviceType} - ${estimate.nights} nights`,
        services: JSON.stringify({
          serviceType: estimate.serviceType,
          nights: estimate.nights,
          pricePerNight: estimate.pricePerNight,
          originalTotal: originalAmount / 100,
          discount: discount / 100,
          finalTotal: finalAmount / 100
        })
      };

      const invoice = await storage.createInvoice(invoiceData);
      
      console.log("✅ Invoice created from estimate:", invoice.id, "Final amount: £" + (finalAmount / 100));
      
      res.json({
        ...invoice,
        message: "Invoice created successfully from estimate"
      });
    } catch (error) {
      console.error("❌ Error creating invoice from estimate:", error);
      res.status(500).json({ message: "Failed to create invoice from estimate" });
    }
  });

  // Update payment status for invoice
  app.patch("/api/invoices/:id/payment-status", async (req, res) => {
    try {
      const invoiceId = parseInt(req.params.id);
      const { paymentStatus, paymentDate, paymentMethod } = req.body;
      
      console.log("💳 Updating payment status for invoice:", invoiceId, "to:", paymentStatus);
      
      const updateData: any = {
        paymentStatus: paymentStatus,
        paymentDate: paymentStatus === "paid" ? (paymentDate ? new Date(paymentDate) : new Date()) : null,
        paymentMethod: paymentStatus === "paid" ? (paymentMethod || null) : null
      };

      const updatedInvoice = await storage.updateInvoice(invoiceId, updateData);
      
      if (!updatedInvoice) {
        return res.status(404).json({ message: "Invoice not found" });
      }
      
      console.log("✅ Payment status updated for invoice:", invoiceId);
      res.json({
        ...updatedInvoice,
        message: `Invoice marked as ${paymentStatus}`
      });
    } catch (error) {
      console.error("❌ Error updating payment status:", error);
      res.status(500).json({ message: "Failed to update payment status" });
    }
  });

  // Estimates API routes
  app.get("/api/estimates", async (req, res) => {
    try {
      const estimates = await storage.getAllEstimates();
      console.log(`📊 ESTIMATES: Returning ${estimates.length} estimates`);
      res.json(estimates);
    } catch (error) {
      console.error("Error fetching estimates:", error);
      res.status(500).json({ message: "Failed to fetch estimates" });
    }
  });

  app.get("/api/estimates/:id", async (req, res) => {
    try {
      const estimate = await storage.getEstimate(parseInt(req.params.id));
      if (!estimate) {
        return res.status(404).json({ message: "Estimate not found" });
      }
      res.json(estimate);
    } catch (error) {
      console.error("Error fetching estimate:", error);
      res.status(500).json({ message: "Failed to fetch estimate" });
    }
  });

  app.post("/api/estimates/:id/convert-to-invoice", async (req, res) => {
    try {
      const estimateId = parseInt(req.params.id);
      const { depositAmount } = req.body;
      
      const invoice = await storage.convertEstimateToInvoice(estimateId, depositAmount || 0);
      
      res.json({
        ...invoice,
        message: "Estimate converted to invoice successfully"
      });
    } catch (error) {
      console.error("Error converting estimate to invoice:", error);
      res.status(500).json({ message: "Failed to convert estimate to invoice" });
    }
  });

  app.patch("/api/estimates/:id", async (req, res) => {
    try {
      const estimate = await storage.updateEstimate(parseInt(req.params.id), req.body);
      if (!estimate) {
        return res.status(404).json({ message: "Estimate not found" });
      }
      res.json(estimate);
    } catch (error) {
      console.error("Error updating estimate:", error);
      res.status(500).json({ message: "Failed to update estimate" });
    }
  });

  app.patch("/api/invoices/:id/payment", async (req, res) => {
    try {
      const { depositPaid, status, paymentStatus } = req.body;
      const invoiceId = parseInt(req.params.id);
      
      // Get current invoice
      const invoice = await storage.getInvoice(invoiceId);
      if (!invoice) {
        return res.status(404).json({ message: "Invoice not found" });
      }
      
      // Calculate new balance
      const newDepositPaid = depositPaid || invoice.depositPaid;
      const balanceRemaining = invoice.amount - newDepositPaid;
      
      const updatedInvoice = await storage.updateInvoice(invoiceId, {
        depositPaid: newDepositPaid,
        balanceRemaining: balanceRemaining,
        status: status || (balanceRemaining <= 0 ? "paid" : "partially_paid"),
        paymentStatus: paymentStatus || (balanceRemaining <= 0 ? "full_payment" : "deposit_paid"),
        paidDate: balanceRemaining <= 0 ? new Date() : invoice.paidDate
      });
      
      res.json({
        ...updatedInvoice,
        message: "Payment updated successfully"
      });
    } catch (error) {
      console.error("Error updating payment:", error);
      res.status(500).json({ message: "Failed to update payment" });
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
      
      // Revenue calculation based on actual pricing
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

  // Group Training Sessions Management
  app.get("/api/group-training-sessions", async (req, res) => {
    try {
      const sessions = await storage.getAllGroupTrainingSessions();
      res.json(sessions);
    } catch (error) {
      console.error("Error fetching group training sessions:", error);
      res.status(500).json({ message: "Failed to fetch group training sessions" });
    }
  });

  app.get("/api/group-training-sessions/active", async (req, res) => {
    try {
      const sessions = await storage.getActiveGroupTrainingSessions();
      res.json(sessions);
    } catch (error) {
      console.error("Error fetching active group training sessions:", error);
      res.status(500).json({ message: "Failed to fetch active group training sessions" });
    }
  });

  app.post("/api/group-training-sessions", async (req, res) => {
    try {
      const sessionData = req.body;
      console.log("🎓 Creating group training session:", sessionData);
      
      const session = await storage.createGroupTrainingSession({
        sessionName: sessionData.sessionName,
        sessionDate: new Date(sessionData.sessionDate),
        startTime: sessionData.startTime,
        endTime: sessionData.endTime,
        maxParticipants: sessionData.maxParticipants || 6,
        staffId: sessionData.staffId,
        pricePerDog: sessionData.pricePerDog || 40,
        notes: sessionData.notes
      });
      
      res.json(session);
    } catch (error) {
      console.error("Error creating group training session:", error);
      res.status(500).json({ message: "Failed to create group training session" });
    }
  });

  app.get("/api/group-training-sessions/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const session = await storage.getGroupTrainingSession(id);
      
      if (!session) {
        return res.status(404).json({ message: "Group training session not found" });
      }
      
      res.json(session);
    } catch (error) {
      console.error("Error fetching group training session:", error);
      res.status(500).json({ message: "Failed to fetch group training session" });
    }
  });

  app.put("/api/group-training-sessions/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      
      const session = await storage.updateGroupTrainingSession(id, updates);
      
      if (!session) {
        return res.status(404).json({ message: "Group training session not found" });
      }
      
      res.json(session);
    } catch (error) {
      console.error("Error updating group training session:", error);
      res.status(500).json({ message: "Failed to update group training session" });
    }
  });

  app.delete("/api/group-training-sessions/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteGroupTrainingSession(id);
      
      if (!success) {
        return res.status(404).json({ message: "Group training session not found" });
      }
      
      res.json({ message: "Group training session deleted successfully" });
    } catch (error) {
      console.error("Error deleting group training session:", error);
      res.status(500).json({ message: "Failed to delete group training session" });
    }
  });

  // Group Training Bookings
  app.get("/api/group-training-sessions/:sessionId/bookings", async (req, res) => {
    try {
      const sessionId = parseInt(req.params.sessionId);
      const bookings = await storage.getGroupTrainingBookingsBySession(sessionId);
      res.json(bookings);
    } catch (error) {
      console.error("Error fetching group training bookings:", error);
      res.status(500).json({ message: "Failed to fetch group training bookings" });
    }
  });

  app.post("/api/group-training-bookings", async (req, res) => {
    try {
      const bookingData = req.body;
      console.log("🎓 Creating group training booking:", bookingData);
      
      const booking = await storage.createGroupTrainingBooking({
        sessionId: bookingData.sessionId,
        clientId: bookingData.clientId,
        dogId: bookingData.dogId,
        notes: bookingData.notes
      });
      
      res.json(booking);
    } catch (error) {
      console.error("Error creating group training booking:", error);
      res.status(500).json({ message: "Failed to create group training booking" });
    }
  });

  // Staff authentication routes
  app.post("/api/staff/authenticate", async (req, res) => {
    try {
      const { staffId, pin } = req.body;
      console.log(`🔐 Staff authentication attempt for ID: ${staffId}`);
      
      if (!staffId || !pin) {
        return res.status(400).json({ message: "Staff ID and PIN required" });
      }

      const staff = await storage.getStaffById(staffId);
      if (!staff) {
        return res.status(404).json({ message: "Staff member not found" });
      }

      if (!staff.pin) {
        return res.status(401).json({ message: "PIN not set for this staff member" });
      }

      // For now, simple PIN comparison (in production, use bcrypt)
      if (pin !== staff.pin) {
        return res.status(401).json({ message: "Invalid PIN" });
      }

      // Always clock in when authenticating through staff portal
      console.log(`🕐 Clocking in staff member: ${staff.name} (Current status: ${staff.status})`);
      const updatedStaff = await storage.updateStaffStatus(staffId, 'clocked_in', { createTimeEntry: true });
      
      if (!updatedStaff) {
        console.error("❌ Failed to update staff status");
        return res.status(500).json({ message: "Failed to update status" });
      }
      
      console.log(`✅ Staff ${staff.name} successfully clocked in with status: ${updatedStaff.status}`);
      res.json({ 
        success: true, 
        staff: { ...updatedStaff, pin: undefined } // Don't send PIN back
      });
    } catch (error) {
      console.error("PIN authentication error:", error);
      res.status(500).json({ message: "Authentication failed" });
    }
  });

  // Staff time tracking routes
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

  // Add PATCH routes for staff portal compatibility
  app.patch("/api/staff/:id/clock-out", async (req, res) => {
    try {
      const staffId = parseInt(req.params.id);
      console.log(`Clock out request for staff ID: ${staffId}`);
      
      const updatedStaff = await storage.updateStaffStatus(staffId, 'clocked_out', { createTimeEntry: true });
      
      if (!updatedStaff) {
        return res.status(404).json({ message: "Staff member not found" });
      }
      
      console.log(`Staff ${updatedStaff.name} successfully clocked out`);
      res.json({ success: true, staff: updatedStaff });
    } catch (error) {
      console.error("Clock out error:", error);
      res.status(500).json({ message: "Clock out failed" });
    }
  });

  // Break management PATCH routes to match frontend calls
  app.patch("/api/staff/:id/break-start", async (req, res) => {
    try {
      const staffId = parseInt(req.params.id);
      console.log(`Start break request for staff ID: ${staffId}`);
      
      const updatedStaff = await storage.updateStaffStatus(staffId, 'on_break');
      
      if (!updatedStaff) {
        return res.status(404).json({ message: "Staff member not found" });
      }
      
      console.log(`Staff ${updatedStaff.name} successfully started break`);
      res.json({ success: true, staff: updatedStaff });
    } catch (error) {
      console.error("Start break error:", error);
      res.status(500).json({ message: "Break start failed" });
    }
  });

  app.patch("/api/staff/:id/break-end", async (req, res) => {
    try {
      const staffId = parseInt(req.params.id);
      console.log(`End break request for staff ID: ${staffId}`);
      
      const updatedStaff = await storage.updateStaffStatus(staffId, 'clocked_in');
      
      if (!updatedStaff) {
        return res.status(404).json({ message: "Staff member not found" });
      }
      
      console.log(`Staff ${updatedStaff.name} successfully ended break`);
      res.json({ success: true, staff: updatedStaff });
    } catch (error) {
      console.error("End break error:", error);
      res.status(500).json({ message: "Break end failed" });
    }
  });

  // Staff task and assignment routes
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

  // Invoice PDF generation route
  app.get("/api/invoices/:id/pdf", async (req, res) => {
    try {
      const invoiceId = parseInt(req.params.id);
      const invoice = await storage.getInvoice(invoiceId);
      
      if (!invoice) {
        return res.status(404).json({ message: "Invoice not found" });
      }
      
      const client = await storage.getClient(invoice.clientId);
      if (!client) {
        return res.status(404).json({ message: "Client not found" });
      }
      
      // Generate and stream PDF
      generateInvoicePDF(res, invoice, client);
    } catch (error) {
      console.error("Error generating PDF:", error);
      res.status(500).json({ message: "Failed to generate PDF" });
    }
  });

  // Service Pricing routes
  app.get("/api/service-pricing", async (req, res) => {
    try {
      const pricing = await storage.getAllServicePricing();
      res.json(pricing);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch service pricing" });
    }
  });

  app.get("/api/service-pricing/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const pricing = await storage.getServicePricing(id);
      if (!pricing) {
        return res.status(404).json({ message: "Service pricing not found" });
      }
      res.json(pricing);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch service pricing" });
    }
  });

  app.post("/api/service-pricing", async (req, res) => {
    try {
      const pricing = await storage.createServicePricing(req.body);
      res.status(201).json(pricing);
    } catch (error) {
      res.status(500).json({ message: "Failed to create service pricing" });
    }
  });

  app.put("/api/service-pricing/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const pricing = await storage.updateServicePricing(id, req.body);
      if (!pricing) {
        return res.status(404).json({ message: "Service pricing not found" });
      }
      res.json(pricing);
    } catch (error) {
      res.status(500).json({ message: "Failed to update service pricing" });
    }
  });

  app.delete("/api/service-pricing/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteServicePricing(id);
      if (!success) {
        return res.status(404).json({ message: "Service pricing not found" });
      }
      res.json({ message: "Service pricing deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete service pricing" });
    }
  });

  // Staff task management routes from Copilot integration
  app.get("/api/staff-tasks", async (req, res) => {
    try {
      console.log("🚀 API route /api/staff-tasks called with query:", req.query);
      const { staffId, date, status } = req.query;
      const filters: any = {};
      
      if (staffId && staffId !== '') {
        filters.staffId = parseInt(staffId as string);
      }
      if (date && date !== '') {
        filters.date = date as string;
      }
      if (status && status !== '') {
        filters.status = status as string;
      }
      
      console.log("🎯 Calling storage.getStaffTasksFiltered with filters:", filters);
      const tasks = await storage.getStaffTasksFiltered(filters);
      console.log("📊 Received tasks count:", tasks.length);
      console.log("🐕 First task sample:", tasks[0]);
      res.json(tasks);
    } catch (error) {
      console.error("Get staff tasks error:", error);
      res.status(500).json({ message: "Failed to get tasks" });
    }
  });

  app.post("/api/staff-tasks", async (req, res) => {
    try {
      const task = await storage.createStaffTaskAssignment(req.body);
      res.json(task);
    } catch (error) {
      console.error("Create staff task error:", error);
      res.status(500).json({ message: "Failed to create task" });
    }
  });

  app.patch("/api/staff-tasks/:id", async (req, res) => {
    try {
      const task = await storage.updateStaffTaskStatus(parseInt(req.params.id), req.body);
      res.json(task);
    } catch (error) {
      console.error("Update staff task error:", error);
      res.status(500).json({ message: "Failed to update task" });
    }
  });

  // Clear all tasks for a specific staff member
  app.delete("/api/staff/:staffId/tasks", async (req, res) => {
    try {
      const staffId = parseInt(req.params.staffId);
      console.log(`🗑️ Clearing all tasks for staff ID: ${staffId}`);
      
      const deletedCount = await storage.clearAllStaffTasks(staffId);
      console.log(`✅ Cleared ${deletedCount} tasks for staff ${staffId}`);
      
      res.json({ 
        message: "All tasks cleared successfully", 
        deletedCount 
      });
    } catch (error) {
      console.error("Clear staff tasks error:", error);
      res.status(500).json({ message: "Failed to clear tasks" });
    }
  });

  // Task assignment from admin to staff
  app.post("/api/staff/tasks", async (req, res) => {
    try {
      const { staffId, title, description, priority, dueDate, assignedKennelId, assignedKennelIds } = req.body;
      
      // Determine which kennels to assign to
      const kennelsToAssign = assignedKennelIds && assignedKennelIds.length > 0 
        ? assignedKennelIds 
        : assignedKennelId ? [assignedKennelId] : [null];
      
      const createdTasks = [];
      
      // Create individual tasks for each kennel
      for (const kennelId of kennelsToAssign) {
        // Get kennel number for display
        let kennelNumber = null;
        if (kennelId) {
          try {
            const kennel = await storage.getKennel(kennelId);
            kennelNumber = kennel?.number;
          } catch (error) {
            console.log("Could not fetch kennel number for ID:", kennelId);
          }
        }
        
        const taskData = {
          staffId,
          taskType: kennelNumber ? `${title} - Kennel ${kennelNumber}` : title,
          status: "pending" as const,
          notes: kennelNumber ? `${description} (Kennel ${kennelNumber})` : description,
          associatedKennelId: kennelId,
          scheduledDate: dueDate ? new Date(dueDate) : null,
          adminNotes: `Priority: ${priority}`,
          assignedDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        };
        
        const task = await storage.createStaffTask(taskData);
        createdTasks.push(task);
      }
      
      res.json({ 
        message: `Created ${createdTasks.length} task(s)`,
        tasks: createdTasks,
        count: createdTasks.length
      });
    } catch (error) {
      console.error("Create staff task error:", error);
      res.status(500).json({ message: "Failed to create task" });
    }
  });

  // New endpoint: Get kennels with current booking data
  app.get("/api/kennels-with-bookings", async (req, res) => {
    try {
      const kennelsWithBookings = await storage.getKennelsWithBookings();
      res.json(kennelsWithBookings);
    } catch (error) {
      console.error("Get kennels with bookings error:", error);
      res.status(500).json({ message: "Failed to get kennels with bookings" });
    }
  });

  // Enhanced kennel assignment routes
  app.get("/api/kennel-assignments", async (req, res) => {
    try {
      const assignments = await storage.getKennelAssignmentsForStaff({
        staffId: req.query.staffId ? parseInt(req.query.staffId as string) : undefined,
        date: req.query.date as string
      });
      res.json(assignments);
    } catch (error) {
      console.error("Get kennel assignments error:", error);
      res.status(500).json({ message: "Failed to get assignments" });
    }
  });

  app.post("/api/kennel-assignments", async (req, res) => {
    try {
      const assignment = await storage.createKennelAssignmentEntry(req.body);
      res.json(assignment);
    } catch (error) {
      console.error("Create kennel assignment error:", error);
      res.status(500).json({ message: "Failed to create assignment" });
    }
  });

  // Staff schedule endpoint
  app.get("/api/staff/:id/schedule", async (req, res) => {
    try {
      const staffId = parseInt(req.params.id);
      const { date } = req.query;
      
      const tasks = await storage.getStaffTasksFiltered({
        staffId,
        date: date as string || new Date().toISOString().split('T')[0]
      });
      
      const kennelAssignments = await storage.getKennelAssignmentsForStaff({
        staffId,
        date: date as string || new Date().toISOString().split('T')[0]
      });
      
      res.json({
        tasks,
        kennelAssignments,
        date: date || new Date().toISOString().split('T')[0]
      });
    } catch (error) {
      console.error("Get staff schedule error:", error);
      res.status(500).json({ message: "Failed to get schedule" });
    }
  });

  // Register daily reports routes
  registerDailyReportsRoutes(app);

  const httpServer = createServer(app);
  return httpServer;
}
