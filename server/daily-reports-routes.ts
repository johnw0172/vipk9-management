import type { Express } from "express";
import { db } from "./db";
import { dailyReports, dogs, kennels, staff, clients } from "@shared/schema";
import { eq, and, desc } from "drizzle-orm";
import { generateDailyReportPDF } from "./daily-report-pdf-generator";

export function registerDailyReportsRoutes(app: Express) {
  
  // GET /api/daily-reports - List all daily reports
  app.get("/api/daily-reports", async (req, res) => {
    try {
      const reports = await db.select()
        .from(dailyReports)
        .orderBy(desc(dailyReports.reportDate), desc(dailyReports.createdAt));

      res.json(reports);
    } catch (error) {
      console.error("Error fetching daily reports:", error);
      res.status(500).json({ message: "Failed to fetch daily reports" });
    }
  });

  // POST /api/daily-reports - Create new daily report
  app.post("/api/daily-reports", async (req, res) => {
    try {
      const reportData = req.body;
      
      // Validate required fields
      const requiredFields = [
        'dogId', 'kennelId', 'staffId', 'reportDate',
        'exerciseNotes', 'healthNotes', 'bondingNotes'
      ];
      
      for (const field of requiredFields) {
        if (!reportData[field]) {
          return res.status(400).json({ 
            message: `Missing required field: ${field}` 
          });
        }
      }

      const [newReport] = await db.insert(dailyReports)
        .values(reportData)
        .returning();

      res.status(201).json(newReport);
    } catch (error) {
      console.error("Error creating daily report:", error);
      res.status(500).json({ message: "Failed to create daily report" });
    }
  });

  // GET /api/daily-reports/dogs-for-today - Get dogs that need reports for today
  app.get("/api/daily-reports/dogs-for-today", async (req, res) => {
    try {
      const { staffId } = req.query;

      if (!staffId) {
        return res.status(400).json({ message: "Staff ID is required" });
      }

      // Get occupied kennels with dogs
      const occupiedKennels = await db.select({
        dog: dogs,
        kennel: kennels,
      })
      .from(kennels)
      .leftJoin(dogs, eq(kennels.dogId, dogs.id))
      .where(eq(kennels.status, "occupied"));

      res.json(occupiedKennels);
    } catch (error) {
      console.error("Error fetching dogs for reports:", error);
      res.status(500).json({ message: "Failed to fetch dogs for reports" });
    }
  });

  // GET /api/daily-reports/:id/pdf - Download daily report as PDF
  app.get("/api/daily-reports/:id/pdf", async (req, res) => {
    try {
      const reportId = parseInt(req.params.id);
      
      if (isNaN(reportId)) {
        return res.status(400).json({ message: "Invalid report ID" });
      }

      // Get the report with related data
      const [report] = await db.select()
        .from(dailyReports)
        .where(eq(dailyReports.id, reportId));

      if (!report) {
        return res.status(404).json({ message: "Report not found" });
      }

      // Get dog information
      const [dog] = await db.select()
        .from(dogs)
        .where(eq(dogs.id, report.dogId));

      // Get staff information
      const [staffMember] = await db.select()
        .from(staff)
        .where(eq(staff.id, report.staffId));

      // Get client information through dog
      let clientName = "Unknown Client";
      if (dog) {
        const [client] = await db.select()
          .from(clients)
          .where(eq(clients.id, dog.clientId));
        if (client) {
          clientName = client.name;
        }
      }

      const reportDetails = {
        dogName: dog?.name || "Unknown Dog",
        dogBreed: dog?.breed || undefined,
        kennelNumber: report.kennelId,
        staffName: staffMember?.name || "Unknown Staff",
        clientName: clientName
      };

      // Convert dates to strings for PDF generator
      const reportForPDF = {
        ...report,
        createdAt: report.createdAt?.toISOString() || '',
        updatedAt: report.updatedAt?.toISOString() || '',
      };

      // Generate and send PDF
      generateDailyReportPDF(res, reportForPDF, reportDetails);
      
    } catch (error) {
      console.error("Error generating daily report PDF:", error);
      res.status(500).json({ message: "Failed to generate PDF" });
    }
  });

  // DELETE /api/daily-reports/:id - Delete a daily report
  app.delete("/api/daily-reports/:id", async (req, res) => {
    try {
      const reportId = parseInt(req.params.id);
      
      if (isNaN(reportId)) {
        return res.status(400).json({ message: "Invalid report ID" });
      }

      // Check if report exists
      const [existingReport] = await db.select()
        .from(dailyReports)
        .where(eq(dailyReports.id, reportId));

      if (!existingReport) {
        return res.status(404).json({ message: "Report not found" });
      }

      // Delete the report
      await db.delete(dailyReports)
        .where(eq(dailyReports.id, reportId));

      console.log(`Daily report ${reportId} successfully deleted`);
      res.json({ message: "Daily report deleted successfully" });
      
    } catch (error) {
      console.error("Error deleting daily report:", error);
      res.status(500).json({ message: "Failed to delete daily report" });
    }
  });
}