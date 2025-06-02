import PDFDocument from "pdfkit";
import type { Response } from "express";
import path from "path";
import fs from "fs";

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

/**
 * Full black and gold invoice PDF with logo and elegant styling.
 * Place your logo image as 'vip-elite-k9s-logo.png' in the 'public/assets' folder
 * or update the logoPath below to your desired image path.
 */
export function generateInvoicePDF(res: Response, invoice: InvoiceData, client: ClientData) {
  console.log(`🎯 Starting PDF generation for invoice ${invoice.id}`);
  const doc = new PDFDocument({
    margin: 50,
    size: 'A4'
  });

  // Set response headers for PDF
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `inline; filename="VIP_Elite_K9s_Invoice_${invoice.id}.pdf"`);

  doc.pipe(res);

  // --- Black background ---
  doc.rect(0, 0, doc.page.width, doc.page.height)
    .fill("#000000");

  // --- Add Logo (centered, top) ---
  let currentY = 50;
  const logoPathOptions = [
    path.join(__dirname, "../attached_assets/LOGO JPEG.jpg"),
    "./attached_assets/LOGO JPEG.jpg",
    "attached_assets/LOGO JPEG.jpg"
  ];
  
  let logoLoaded = false;
  for (const logoPath of logoPathOptions) {
    try {
      if (fs.existsSync(logoPath)) {
        console.log(`🖼️ Loading logo from: ${logoPath}`);
        doc.image(logoPath, doc.page.width / 2 - 100, currentY, { width: 200 });
        logoLoaded = true;
        console.log("✅ Logo loaded successfully");
        currentY += 120;
        break;
      }
    } catch (e) {
      console.log(`❌ Failed to load logo from ${logoPath}:`, e.message);
    }
  }
  
  if (!logoLoaded) {
    console.log("📝 Using text fallback for logo");
    doc
      .fillColor("#FFD700")
      .font("Helvetica-Bold")
      .fontSize(28)
      .text("VIP ELITE K9'S", 50, currentY, { align: "center", width: doc.page.width - 100 });
    currentY += 50;
  }

  // --- Company Details ---
  doc
    .fillColor("#FFD700")
    .font("Helvetica")
    .fontSize(12)
    .text("Professional Pet Care Services", 50, currentY, { align: "center", width: doc.page.width - 100 });

  currentY += 20;
  doc
    .fillColor("#bfa126")
    .fontSize(10)
    .text("Tel: 07804483561 | Email: vipeliteexercise@gmail.com", 50, currentY, { align: "center", width: doc.page.width - 100 });

  // --- Invoice Header ---
  currentY += 40;
  
  // Invoice number on the right
  doc
    .fillColor("#FFD700")
    .font("Helvetica-Bold")
    .fontSize(24)
    .text("INVOICE", 400, currentY);

  doc
    .font("Helvetica")
    .fontSize(12)
    .text(`Invoice #: ${invoice.id}`, 400, currentY + 30)
    .text(`Date: ${new Date(invoice.issueDate).toLocaleDateString()}`, 400, currentY + 45)
    .text(`Due Date: ${invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : 'N/A'}`, 400, currentY + 60);

  // Client information on the left
  doc
    .font("Helvetica-Bold")
    .fontSize(14)
    .fillColor("#FFD700")
    .text("BILLED TO:", 50, currentY);

  doc
    .font("Helvetica")
    .fontSize(12)
    .fillColor("#fff")
    .text(client.name, 50, currentY + 25)
    .text(client.email, 50, currentY + 40)
    .text(client.phone || 'No phone provided', 50, currentY + 55);
  
  if (client.address) {
    doc.text(client.address, 50, currentY + 70);
  }

  // --- Service Details Box ---
  const serviceBoxY = invoiceBoxY + 120;
  doc
    .roundedRect(50, serviceBoxY, 490, 60, 10)
    .stroke("#FFD700");

  doc
    .font("Helvetica-Bold")
    .fontSize(13)
    .fillColor("#FFD700")
    .text("Service Details", 60, serviceBoxY + 8);

  // Parse services from JSON if available
  let serviceDetails = invoice.description || "Professional Pet Services";
  let nights = 0;
  let pricePerNight = 40;

  try {
    const parsedServices = JSON.parse(invoice.services || '{}');
    if (parsedServices.serviceType) {
      serviceDetails = `${parsedServices.serviceType}`;
      if (parsedServices.nights) {
        nights = parsedServices.nights;
        serviceDetails += ` - ${parsedServices.nights} nights`;
      }
      if (parsedServices.serviceType === 'boarding') {
        pricePerNight = 40;
        serviceDetails += ` @ £${pricePerNight} per night`;
      } else if (parsedServices.pricePerNight && parsedServices.pricePerNight <= 100) {
        pricePerNight = parsedServices.pricePerNight;
        serviceDetails += ` @ £${parsedServices.pricePerNight} per night`;
      }
    }
  } catch (e) {}

  doc
    .font("Helvetica")
    .fontSize(11)
    .fillColor("#fff")
    .text(serviceDetails, 60, serviceBoxY + 28);

  if (nights > 0) {
    doc
      .fontSize(10)
      .fillColor("#FFD700")
      .text(`${nights} nights × £${pricePerNight} = £${(nights * pricePerNight).toFixed(2)}`, 60, serviceBoxY + 45);
  }

  // --- Amounts ---
  let amountsY = serviceBoxY + 85;
  doc
    .font("Helvetica")
    .fontSize(12)
    .fillColor("#FFD700")
    .text("Subtotal:", 360, amountsY)
    .fillColor("#fff")
    .text(`£${(invoice.amount / 100).toFixed(2)}`, 470, amountsY, { align: "right", width: 70 });

  if (invoice.discountAmount && invoice.discountAmount > 0) {
    amountsY += 20;
    doc
      .fillColor("#FFD700")
      .text(`Discount (${invoice.discountReason || 'Applied'}):`, 360, amountsY)
      .fillColor("#fff")
      .text(`-£${(invoice.discountAmount / 100).toFixed(2)}`, 470, amountsY, { align: "right", width: 70 });
  }

  // --- Gold line above total ---
  const totalY = (invoice.discountAmount && invoice.discountAmount > 0) ? amountsY + 30 : amountsY + 20;
  doc
    .moveTo(50, totalY)
    .lineTo(540, totalY)
    .lineWidth(1.5)
    .stroke("#FFD700");

  doc
    .font("Helvetica-Bold")
    .fontSize(16)
    .fillColor("#FFD700")
    .text("TOTAL:", 360, totalY + 7)
    .text(`£${(invoice.finalAmount / 100).toFixed(2)}`, 470, totalY + 7, { align: "right", width: 70 });

  // --- Payment Status ---
  let payStatusY = totalY + 40;
  doc
    .fontSize(12)
    .fillColor(invoice.paymentStatus === "paid" ? "#27ae60" : "#e67e22")
    .text(`Payment Status: ${invoice.paymentStatus === "paid" ? "Paid" : "Pending"}`, 60, payStatusY);

  if (invoice.paymentDate) {
    payStatusY += 16;
    doc
      .fontSize(11)
      .fillColor("#fff")
      .text(`Payment Date: ${new Date(invoice.paymentDate).toLocaleDateString()}`, 60, payStatusY);
  }
  if (invoice.paymentMethod) {
    payStatusY += 16;
    doc
      .fontSize(11)
      .fillColor("#fff")
      .text(`Payment Method: ${invoice.paymentMethod}`, 60, payStatusY);
  }

  // --- Payment Information (Bank Details) ---
  payStatusY += 27;
  doc
    .font("Helvetica-Bold")
    .fontSize(13)
    .fillColor("#FFD700")
    .text("Payment Information", 60, payStatusY, { underline: true });

  payStatusY += 18;
  doc
    .font("Helvetica")
    .fontSize(11)
    .fillColor("#fff")
    .text("Please make payment to the following bank account:", 60, payStatusY)
    .text("Account Name: John Wood", 60, payStatusY + 18)
    .text("Sort Code: 09-01-29", 60, payStatusY + 33)
    .text("Account Number: 29720653", 60, payStatusY + 48)
    .text(`Reference: Please use Invoice #${invoice.id}`, 60, payStatusY + 63);

  // --- Payment Terms ---
  payStatusY += 90;
  doc
    .fontSize(10)
    .fillColor("#bfa126")
    .text(
      "Payment Terms: Please pay within 14 days. Thank you for choosing VIP Elite K9s!",
      60, payStatusY, { align: "center", width: 480 }
    );

  // --- Gold border around the page ---
  doc
    .roundedRect(20, 20, doc.page.width - 40, doc.page.height - 40, 16)
    .lineWidth(3)
    .stroke("#FFD700");

  // --- Footer ---
  doc
    .fontSize(10)
    .fillColor("#fff")
    .text("For any queries, please contact us at vipeliteexercise@gmail.com", 0, doc.page.height - 55, { align: "center", width: doc.page.width });

  doc.end();
  console.log(`✅ PDF generated successfully for invoice ${invoice.id}`);
}