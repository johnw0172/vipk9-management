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
  console.log(`🎯 Starting PDF generation for invoice ${invoice.id}`);
  console.log(`💰 Invoice amounts: amount=${invoice.amount}, finalAmount=${invoice.finalAmount}, discountAmount=${invoice.discountAmount}`);
  console.log(`📋 Services data:`, invoice.services);
  
  const doc = new PDFDocument({
    margin: 50,
    size: 'A4'
  });

  // Set response headers for PDF
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `inline; filename="VIP_Elite_K9s_Invoice_${invoice.id}.pdf"`);
  
  // Pipe PDF to response
  doc.pipe(res);

  // Black header background
  doc
    .rect(0, 0, 595, 140)
    .fill("#000000");

  // Add your stunning logo
  try {
    console.log("🖼️ Loading your VIP Elite K9s logo");
    doc.image("./attached_assets/LOGO JPEG.jpg", doc.page.width / 2 - 80, 25, { width: 160 });
    console.log("✅ Logo loaded successfully");
  } catch (e) {
    console.log("❌ Logo loading failed, using elegant text");
    doc
      .fillColor("#FFD700")
      .fontSize(28)
      .font("Helvetica-Bold")
      .text("VIP ELITE K9'S", 50, 40, { align: "center", width: doc.page.width - 100 });
  }

  // Company details below logo
  doc
    .fillColor("#FFD700")
    .fontSize(12)
    .font("Helvetica")
    .text("Professional Pet Care & Training Services", 50, 110, { align: "center", width: doc.page.width - 100 });

  // Gold border line
  doc
    .strokeColor("#FFD700")
    .lineWidth(2)
    .moveTo(30, 150)
    .lineTo(565, 150)
    .stroke();

  // Invoice header (right side, below header)
  doc
    .fillColor("#FFD700")
    .fontSize(24)
    .font("Helvetica-Bold")
    .text("INVOICE", 400, 170);

  doc
    .fillColor("#000000")
    .fontSize(12)
    .font("Helvetica")
    .text(`Invoice #: ${invoice.id}`, 400, 200)
    .text(`Date: ${new Date(invoice.issueDate).toLocaleDateString()}`, 400, 215)
    .text(`Due Date: ${invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : 'N/A'}`, 400, 230);

  // Client information
  doc
    .fillColor("#FFD700")
    .fontSize(14)
    .font("Helvetica-Bold")
    .text("BILLED TO:", 50, 170);

  doc
    .fillColor("#000000")
    .fontSize(12)
    .font("Helvetica")
    .text(client.name, 50, 190)
    .text(client.email, 50, 205)
    .text(client.phone || 'No phone provided', 50, 220);
    
  if (client.address) {
    doc.text(client.address, 50, 235);
  }

  // Service details section
  doc
    .fillColor("#FFD700")
    .fontSize(14)
    .font("Helvetica-Bold")
    .text("SERVICE DETAILS", 50, 270);

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
    .fillColor("#000000")
    .fontSize(12)
    .font("Helvetica")
    .text(serviceDetails, 50, 295);
    
  if (nights > 0) {
    doc
      .fillColor("#666666")
      .fontSize(11)
      .text(`${nights} nights × £${pricePerNight} = £${(nights * pricePerNight).toFixed(2)}`, 50, 315);
  }

  // Financial breakdown with elegant black background section
  const yPos = 350;
  
  // Black background for financial section
  doc
    .rect(30, yPos - 10, 535, 80)
    .fill("#000000");

  // Gold border around financial section
  doc
    .strokeColor("#FFD700")
    .lineWidth(2)
    .rect(30, yPos - 10, 535, 80)
    .stroke();
  
  doc
    .fillColor("#FFD700")
    .fontSize(12)
    .font("Helvetica")
    .text(`Subtotal:`, 50, yPos)
    .text(`£${(invoice.amount / 100).toFixed(2)}`, 530, yPos, { align: 'right' });

  // Discount info
  let discountY = yPos;
  if (invoice.discountAmount && invoice.discountAmount > 0) {
    discountY += 20;
    doc
      .fillColor("#FFD700")
      .fontSize(12)
      .font("Helvetica")
      .text(`Discount (${invoice.discountReason || 'Applied'}):`, 50, discountY)
      .text(`-£${(invoice.discountAmount / 100).toFixed(2)}`, 530, discountY, { align: 'right' });
  }

  // Total amount with elegant gold styling
  const totalYPos = (invoice.discountAmount && invoice.discountAmount > 0) ? yPos + 50 : yPos + 30;
  
  // Gold line separator
  doc
    .strokeColor("#FFD700")
    .lineWidth(2)
    .moveTo(50, totalYPos - 5)
    .lineTo(530, totalYPos - 5)
    .stroke();

  doc
    .fillColor("#FFD700")
    .fontSize(18)
    .font("Helvetica-Bold")
    .text("TOTAL AMOUNT:", 50, totalYPos)
    .text(`£${(invoice.finalAmount / 100).toFixed(2)}`, 450, totalYPos);

  // Payment status and details block with elegant styling
  let paymentBlockY = totalYPos + 50;
  doc
    .fontSize(12)
    .fillColor(invoice.paymentStatus === "paid" ? "#FFD700" : "#FFD700")
    .font("Helvetica-Bold")
    .text(`Payment Status: ${invoice.paymentStatus === "paid" ? "PAID" : "PENDING"}`, 50, paymentBlockY);

  if (invoice.paymentDate) {
    paymentBlockY += 15;
    doc.fillColor("#000000").text(`Payment Date: ${new Date(invoice.paymentDate).toLocaleDateString()}`, 50, paymentBlockY);
  }

  if (invoice.paymentMethod) {
    paymentBlockY += 15;
    doc.fillColor("#000000").text(`Payment Method: ${invoice.paymentMethod}`, 50, paymentBlockY);
  }

  // Elegant bank details section with black background
  paymentBlockY += 35;

  // Black background for bank details
  doc
    .rect(30, paymentBlockY - 10, 535, 110)
    .fill("#000000");

  // Gold border around bank details
  doc
    .strokeColor("#FFD700")
    .lineWidth(2)
    .rect(30, paymentBlockY - 10, 535, 110)
    .stroke();

  doc
    .fillColor("#FFD700")
    .fontSize(14)
    .font("Helvetica-Bold")
    .text("PAYMENT INFORMATION", 50, paymentBlockY, { underline: true });

  paymentBlockY += 25;
  doc
    .fillColor("#FFD700")
    .fontSize(11)
    .font("Helvetica")
    .text("Please make payment to the following bank account:", 50, paymentBlockY)
    .text("Account Name: John Wood", 50, paymentBlockY + 18)
    .text("Sort Code: 09-01-29", 50, paymentBlockY + 36)
    .text("Account Number: 29720653", 50, paymentBlockY + 54)
    .text("Reference: Please use Invoice #" + invoice.id, 50, paymentBlockY + 72);

  // Elegant footer section
  paymentBlockY += 130;
  doc
    .fontSize(11)
    .fillColor("#000000")
    .text("Payment Terms: Please pay within 14 days. Thank you for choosing VIP Elite K9s!", 50, paymentBlockY, { align: "center" });

  // Gold decorative footer line
  paymentBlockY += 25;
  doc
    .strokeColor("#FFD700")
    .lineWidth(4)
    .moveTo(50, paymentBlockY)
    .lineTo(545, paymentBlockY)
    .stroke();

  // Footer contact
  paymentBlockY += 20;
  doc
    .fillColor("#666666")
    .fontSize(10)
    .font("Helvetica")
    .text("For any queries, please contact us at vipeliteexercise@gmail.com | 07804483561", 50, paymentBlockY, { align: "center" });

  // Elegant outer border
  doc
    .strokeColor("#FFD700")
    .lineWidth(3)
    .rect(20, 20, 555, 780)
    .stroke();

  // End the document
  doc.end();
  
  console.log(`✅ PDF generated successfully for invoice ${invoice.id}`);
}