import PDFDocument from "pdfkit";
import type { Response } from "express";
import fs from "fs";

interface InvoiceData {
  id: number;
  clientId: number;
  amount: number; // in pence
  finalAmount: number; // in pence  
  discountAmount: number | null;
  discountReason: string | null;
  issueDate: Date;
  dueDate: Date | null;
  paymentStatus: string;
  services: string | null; // JSON string with service details
}

interface ClientData {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
}

export function generateInvoicePDF(
  res: Response,
  invoice: InvoiceData,
  client: ClientData
) {
  const doc = new PDFDocument({
    size: "A4",
    margin: 50,
  });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `inline; filename=VIP_Elite_K9s_Invoice_${invoice.id}.pdf`
  );

  doc.pipe(res);

  // --- Black background ---
  doc.rect(0, 0, doc.page.width, doc.page.height).fill("#000000");
  doc.fillColor("#000000"); // Reset after fill

  // --- Logo ---
  let logoY = 50;
  try {
    doc.image("./attached_assets/LOGO JPEG.jpg", 50, logoY, { width: 100 });
  } catch (e) {
    // Logo not found, continue without it
  }

  // --- Company Info (left) ---
  let headerY = logoY;
  doc
    .font("Helvetica-Bold")
    .fontSize(24)
    .fillColor("#FFD700")
    .text("VIP Elite K9s", 170, headerY);

  doc
    .font("Helvetica")
    .fontSize(12)
    .fillColor("#FFD700")
    .text("Premium Pet Care & Training Services", 170, headerY + 28);

  doc
    .fontSize(10)
    .fillColor("#FFD700")
    .text("Tel: 07804483561 | Email: vipeliteexercise@gmail.com", 170, headerY + 46);

  // --- Invoice Info (right) ---
  let infoX = 380;
  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .fillColor("#FFD700")
    .text(`Invoice #: ${invoice.id}`, infoX, headerY)
    .text(`Date: ${new Date(invoice.issueDate).toLocaleDateString()}`, infoX, headerY + 18)
    .text(
      `Due Date: ${
        invoice.dueDate
          ? new Date(invoice.dueDate).toLocaleDateString()
          : "N/A"
      }`,
      infoX,
      headerY + 36
    );

  // --- Move down Y position for body ---
  let y = headerY + 80;

  // --- Billed To ---
  doc
    .font("Helvetica-Bold")
    .fontSize(16)
    .fillColor("#FFD700")
    .text("BILLED TO:", 55, y);

  y += 28;
  doc
    .font("Helvetica")
    .fontSize(12)
    .fillColor("#fff")
    .text(client.name, 55, y)
    .text(client.email, 55, y + 16)
    .text(client.phone || "No phone provided", 55, y + 32);
  if (client.address) {
    doc.text(client.address, 55, y + 48);
    y += 64;
  } else {
    y += 48;
  }

  // --- Service Details ---
  y += 16;
  doc
    .font("Helvetica-Bold")
    .fontSize(16)
    .fillColor("#FFD700")
    .text("SERVICE DETAILS", 55, y);

  let serviceDetails = "Professional Pet Services";
  let nights = 0;
  let pricePerNight = 40;
  try {
    const parsedServices = JSON.parse(invoice.services || "{}");
    if (parsedServices.serviceType) {
      const serviceType = parsedServices.serviceType;
      
      if (serviceType === "boarding") {
        serviceDetails = "Dog Boarding";
        if (parsedServices.nights) {
          nights = parsedServices.nights;
          serviceDetails += ` - ${parsedServices.nights} nights`;
        }
        pricePerNight = 40;
        serviceDetails += ` @ £${pricePerNight} per night`;
      } else if (serviceType === "walking") {
        serviceDetails = "Dog Walking Service";
        if (parsedServices.sessions) {
          serviceDetails += ` - ${parsedServices.sessions} session${parsedServices.sessions > 1 ? 's' : ''}`;
        } else {
          serviceDetails += ` - 1 session`;
        }
        serviceDetails += ` @ £20 per walk`;
      } else if (serviceType === "training") {
        serviceDetails = "Dog Training Service";
        if (parsedServices.sessions) {
          serviceDetails += ` - ${parsedServices.sessions} session${parsedServices.sessions > 1 ? 's' : ''}`;
        } else {
          serviceDetails += ` - 1 session`;
        }
        if (parsedServices.trainingType === "group") {
          serviceDetails += ` @ £40 per session (Group Training)`;
        } else {
          serviceDetails += ` @ £45 per session (1-on-1 Training)`;
        }
      } else {
        serviceDetails = serviceType;
        if (parsedServices.pricePerNight && parsedServices.pricePerNight <= 100) {
          pricePerNight = parsedServices.pricePerNight;
          serviceDetails += ` @ £${parsedServices.pricePerNight} per night`;
        }
      }
    }
  } catch (e) {}
  y += 26;
  doc
    .font("Helvetica")
    .fontSize(12)
    .fillColor("#fff")
    .text(serviceDetails, 55, y);

  if (nights > 0) {
    y += 20;
    doc
      .fontSize(11)
      .fillColor("#FFD700")
      .text(
        `${nights} nights × £${pricePerNight} = £${(nights * pricePerNight).toFixed(2)}`,
        55,
        y
      );
  }

  // --- Amounts Table (fixed columns, no wrapping) ---
  y += 36;
  // Table background
  doc.rect(50, y, 510, 80).fillAndStroke("#000", "#FFD700").fillOpacity(1);

  let leftX = 65;
  let rightX = 480; // Move left for better alignment

  doc
    .font("Helvetica")
    .fontSize(13)
    .fillColor("#FFD700")
    .text("Subtotal:", leftX, y + 12)
    .text(`Discount${invoice.discountReason ? " (" + invoice.discountReason + ")" : ""}:`, leftX, y + 32);

  doc
    .font("Helvetica-Bold")
    .fontSize(18)
    .fillColor("#FFD700")
    .text("TOTAL AMOUNT:", leftX, y + 52);

  // Right-aligned amounts with fixed positioning
  doc
    .font("Helvetica")
    .fontSize(13)
    .fillColor("#fff")
    .text(`£${(invoice.amount / 100).toFixed(2)}`, rightX, y + 12, { 
      width: 70, 
      align: "right" 
    })
    .text(
      invoice.discountAmount && invoice.discountAmount > 0
        ? `-£${(invoice.discountAmount / 100).toFixed(2)}`
        : "-",
      rightX,
      y + 32,
      { 
        width: 70, 
        align: "right" 
      }
    );

  doc
    .font("Helvetica-Bold")
    .fontSize(18)
    .fillColor("#FFD700")
    .text(`£${(invoice.finalAmount / 100).toFixed(2)}`, rightX, y + 52, {
      width: 70,
      align: "right",
    });

  // --- Payment Status ---
  y += 100;
  doc
    .font("Helvetica-Bold")
    .fontSize(13)
    .fillColor(invoice.paymentStatus === "paid" ? "#27ae60" : "#FFD700")
    .text(
      `Payment Status: ${invoice.paymentStatus === "paid" ? "PAID" : "PENDING"}`,
      leftX,
      y
    );

  // --- Payment Information ---
  y += 32;
  doc
    .font("Helvetica-Bold")
    .fontSize(14)
    .fillColor("#FFD700")
    .text("PAYMENT INFORMATION", leftX, y);

  y += 18;
  doc
    .font("Helvetica")
    .fontSize(12)
    .fillColor("#fff")
    .text("Please make payment to the following bank account:", leftX, y)
    .text("Account Name: John Wood", leftX, y + 16)
    .text("Sort Code: 09-01-29", leftX, y + 32)
    .text("Account Number: 29720653", leftX, y + 48)
    .text(`Reference: Please use Invoice #${invoice.id}`, leftX, y + 64);

  // --- Footer ---
  doc
    .font("Helvetica")
    .fontSize(10)
    .fillColor("#FFD700")
    .text(
      "For any queries, please contact us at vipeliteexercise@gmail.com",
      0,
      790,
      { align: "center", width: 612 }
    );

  doc.end();
}