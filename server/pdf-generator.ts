import PDFDocument from "pdfkit";
import type { Response } from "express";

interface InvoiceData {
  id: number;
  clientId: number;
  amount: number;
  finalAmount: number;
  discountAmount: number | null;
  discountReason: string | null;
  issueDate: Date;
  dueDate: Date | null;
  paymentStatus: string;
  description: string | null;
  services: string | null;
  estimateId?: number | null;
  bookingId?: number | null;
  paymentDate?: Date | null;
  paymentMethod?: string | null;
  balanceRemaining?: number;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

interface ClientData {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
}

export function generateInvoicePDF(res: Response, invoice: InvoiceData, client: ClientData) {
  const doc = new PDFDocument({ 
    margin: 50,
    size: 'A4'
  });

  // Set response headers for PDF
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `inline; filename="VIP_Elite_K9s_Invoice_${invoice.id}.pdf"`);
  
  // Pipe PDF to response
  doc.pipe(res);

  // Header with VIP Elite K9s branding
  doc
    .fillColor("#FFD700")
    .fontSize(32)
    .font("Helvetica-Bold")
    .text("VIP Elite K9s", 50, 50);
    
  doc
    .fillColor("#666666")
    .fontSize(12)
    .font("Helvetica")
    .text("Premium Dog Boarding & Training Services", 50, 85);

  // Golden decorative line
  doc
    .strokeColor("#FFD700")
    .lineWidth(3)
    .moveTo(50, 110)
    .lineTo(550, 110)
    .stroke();

  // Invoice title and details
  doc
    .fillColor("#000000")
    .fontSize(24)
    .font("Helvetica-Bold")
    .text("INVOICE", 400, 50);

  doc
    .fillColor("#666666")
    .fontSize(12)
    .font("Helvetica")
    .text(`Invoice #: ${invoice.id}`, 400, 80)
    .text(`Date: ${new Date(invoice.issueDate).toLocaleDateString()}`, 400, 95)
    .text(`Due Date: ${invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : 'N/A'}`, 400, 110);

  // Client information
  doc
    .fillColor("#FFD700")
    .fontSize(14)
    .font("Helvetica-Bold")
    .text("BILL TO:", 50, 150);

  doc
    .fillColor("#000000")
    .fontSize(12)
    .font("Helvetica")
    .text(client.name, 50, 170)
    .text(client.email, 50, 185)
    .text(client.phone || 'No phone provided', 50, 200);
    
  if (client.address) {
    doc.text(client.address, 50, 215);
  }

  // Service details section
  doc
    .fillColor("#FFD700")
    .fontSize(14)
    .font("Helvetica-Bold")
    .text("SERVICE DETAILS:", 50, 260);

  // Parse services from JSON if available
  let serviceDetails = invoice.description || "Professional Pet Services";
  try {
    const parsedServices = JSON.parse(invoice.services || '{}');
    if (parsedServices.serviceType) {
      serviceDetails = `${parsedServices.serviceType}`;
      if (parsedServices.nights) {
        serviceDetails += ` - ${parsedServices.nights} nights`;
      }
      if (parsedServices.pricePerNight) {
        serviceDetails += ` @ £${parsedServices.pricePerNight} per night`;
      }
    }
  } catch (e) {
    // Use description as fallback
  }

  doc
    .fillColor("#000000")
    .fontSize(12)
    .font("Helvetica")
    .text(serviceDetails, 50, 280);

  // Financial breakdown
  const yPos = 340;
  
  doc
    .fillColor("#FFD700")
    .fontSize(14)
    .font("Helvetica-Bold")
    .text("AMOUNT BREAKDOWN:", 50, yPos);

  // Original amount
  doc
    .fillColor("#000000")
    .fontSize(12)
    .font("Helvetica")
    .text("Original Amount:", 50, yPos + 25)
    .text(`£${(invoice.amount / 100).toFixed(2)}`, 450, yPos + 25, { align: "right" });

  // Discount if applicable
  if (invoice.discountAmount && invoice.discountAmount > 0) {
    doc
      .fillColor("#27ae60")
      .text("Discount Applied:", 50, yPos + 45)
      .text(`-£${(invoice.discountAmount / 100).toFixed(2)}`, 450, yPos + 45, { align: "right" });
      
    if (invoice.discountReason) {
      doc
        .fillColor("#666666")
        .fontSize(10)
        .text(`(${invoice.discountReason})`, 50, yPos + 60);
    }
  }

  // Total amount (golden highlight)
  const totalYPos = (invoice.discountAmount && invoice.discountAmount > 0) ? yPos + 80 : yPos + 50;
  
  doc
    .strokeColor("#FFD700")
    .lineWidth(1)
    .moveTo(50, totalYPos - 5)
    .lineTo(550, totalYPos - 5)
    .stroke();

  doc
    .fillColor("#FFD700")
    .fontSize(16)
    .font("Helvetica-Bold")
    .text("TOTAL AMOUNT:", 50, totalYPos)
    .text(`£${(invoice.finalAmount / 100).toFixed(2)}`, 450, totalYPos, { align: "right" });

  // Payment status
  const statusColor = invoice.paymentStatus === 'paid' ? "#27ae60" : 
                     invoice.paymentStatus === 'partially_paid' ? "#f39c12" : "#e74c3c";
  
  doc
    .fillColor(statusColor)
    .fontSize(14)
    .font("Helvetica-Bold")
    .text(`Payment Status: ${invoice.paymentStatus.toUpperCase()}`, 50, totalYPos + 40);

  // Footer section
  doc
    .fillColor("#666666")
    .fontSize(10)
    .font("Helvetica")
    .text("Thank you for choosing VIP Elite K9s for your premium pet care needs!", 50, 700, { align: "center" })
    .text("Payment terms: Due within 14 days of invoice date", 50, 715, { align: "center" });

  // Golden footer line
  doc
    .strokeColor("#FFD700")
    .lineWidth(3)
    .moveTo(50, 740)
    .lineTo(550, 740)
    .stroke();

  // Close the document
  doc.end();
}