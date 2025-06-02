import PDFDocument from "pdfkit";
import type { Response } from "express";
import fs from "fs";
import path from "path";

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

export function generateInvoicePDF(
  res: Response,
  invoice: InvoiceData,
  client: ClientData
) {
  const doc = new PDFDocument({ size: "A4", margin: 0 });
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `inline; filename=VIP_Elite_K9s_Invoice_${invoice.id}.pdf`
  );
  doc.pipe(res);

  // Black background
  doc.rect(0, 0, doc.page.width, doc.page.height).fill("#000000");
  doc.fillColor("#000000");

  // -- Layout grid constants
  const left = 60;
  const right = 535;
  const labelCol = left;
  const valueCol = 370;
  const valueColWide = 410;
  let y = 60;
  const rowH = 20;
  const colPad = 8;

  // --- Logo (center top) ---
  try {
    doc.image("./attached_assets/LOGO JPEG.jpg", doc.page.width / 2 - 80, y, { width: 160 });
  } catch (e) {
    // Logo not found, continue without it
  }
  y += 80;

  // --- Company Header (centered, gold) ---
  doc
    .font("Helvetica-Bold")
    .fontSize(24)
    .fillColor("#FFD700")
    .text("VIP Elite K9s", left, y, { width: right - left, align: "center" });
  y += rowH;
  doc
    .font("Helvetica")
    .fontSize(12)
    .fillColor("#FFD700")
    .text("Premium Pet Care & Training Services", left, y, { width: right - left, align: "center" });
  y += rowH - 5;
  doc
    .font("Helvetica")
    .fontSize(10)
    .fillColor("#FFD700")
    .text("Tel: 07804483561 | Email: vipeliteexercise@gmail.com", left, y, { width: right - left, align: "center" });
  y += rowH + 4;

  // --- Invoice Info (right-aligned, grid position) ---
  let infoY = 60;
  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .fillColor("#FFD700")
    .text(`INVOICE #${invoice.id}`, right - 150, infoY, { width: 140, align: "right" });
  doc
    .font("Helvetica")
    .fontSize(10)
    .fillColor("#FFD700")
    .text(`Date: ${new Date(invoice.issueDate).toLocaleDateString()}`, right - 150, infoY + rowH, { width: 140, align: "right" });
  doc
    .text(
      `Due: ${
        invoice.dueDate
          ? new Date(invoice.dueDate).toLocaleDateString()
          : "N/A"
      }`,
      right - 150,
      infoY + rowH * 2,
      { width: 140, align: "right" }
    );

  // --- Section: Billed To ---
  y += rowH + 12;
  doc
    .font("Helvetica-Bold")
    .fontSize(13)
    .fillColor("#FFD700")
    .text("BILLED TO:", labelCol, y);
  y += rowH;
  doc
    .font("Helvetica")
    .fontSize(11)
    .fillColor("#fff")
    .text(client.name, labelCol, y)
    .text(client.email, labelCol, y + rowH)
    .text(client.phone || "No phone provided", labelCol, y + 2 * rowH);
  if (client.address) {
    doc.text(client.address, labelCol, y + 3 * rowH);
    y += rowH;
  }
  y += 3 * rowH + 6;

  // --- Section: Service Details ---
  doc
    .font("Helvetica-Bold")
    .fontSize(13)
    .fillColor("#FFD700")
    .text("SERVICE DETAILS", labelCol, y);
  y += rowH;
  let serviceDetails = "Professional Pet Services";
  let nights = 0;
  let pricePerNight = 40;
  try {
    const parsedServices = JSON.parse(invoice.services || "{}");
    if (parsedServices.serviceType) {
      serviceDetails = "" + parsedServices.serviceType;
      if (parsedServices.nights) {
        nights = parsedServices.nights;
        serviceDetails += ` - ${parsedServices.nights} nights`;
      }
      if (parsedServices.serviceType === "boarding") {
        pricePerNight = 40;
        serviceDetails += ` @ £${pricePerNight} per night`;
      } else if (
        parsedServices.pricePerNight &&
        parsedServices.pricePerNight <= 100
      ) {
        pricePerNight = parsedServices.pricePerNight;
        serviceDetails += ` @ £${parsedServices.pricePerNight} per night`;
      }
    }
  } catch (e) {}
  doc
    .font("Helvetica")
    .fontSize(11)
    .fillColor("#fff")
    .text(serviceDetails, labelCol, y);
  y += rowH;
  if (nights > 0) {
    doc
      .fontSize(10)
      .fillColor("#FFD700")
      .text(
        `${nights} nights × £${pricePerNight} = £${(nights * pricePerNight).toFixed(2)}`,
        labelCol,
        y
      );
    y += rowH;
  } else {
    y += rowH;
  }
  y += 5;

  // --- Section: Amounts Table (grid, NO align, NO wrapping, fixed X/Y) ---
  doc
    .font("Helvetica")
    .fontSize(12)
    .fillColor("#FFD700")
    .text("Subtotal:", labelCol, y)
    .font("Courier-Bold")
    .fontSize(13)
    .fillColor("#FFD700")
    .text(`£${(invoice.amount / 100).toFixed(2)}`, valueCol, y);
  y += rowH;
  if (invoice.discountAmount && invoice.discountAmount > 0) {
    doc
      .font("Helvetica")
      .fontSize(12)
      .fillColor("#FFD700")
      .text(
        `Discount${invoice.discountReason ? " (" + invoice.discountReason + ")" : ""}:`,
        labelCol,
        y
      )
      .font("Courier-Bold")
      .fontSize(13)
      .fillColor("#FFD700")
      .text(`-£${(invoice.discountAmount / 100).toFixed(2)}`, valueCol, y);
    y += rowH;
  }
  doc
    .font("Helvetica-Bold")
    .fontSize(13)
    .fillColor("#FFD700")
    .text("TOTAL:", labelCol, y)
    .font("Courier-Bold")
    .fontSize(13)
    .fillColor("#FFD700")
    .text(`£${(invoice.finalAmount / 100).toFixed(2)}`, valueCol, y);
  y += rowH + 10;

  // --- Section: Payment Status ---
  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .fillColor(invoice.paymentStatus === "paid" ? "#27ae60" : "#FFD700")
    .text(
      `Payment Status: ${invoice.paymentStatus === "paid" ? "PAID" : "PENDING"}`,
      labelCol,
      y
    );
  y += rowH + 5;

  // --- Section: Payment Information ---
  doc
    .font("Helvetica-Bold")
    .fontSize(13)
    .fillColor("#FFD700")
    .text("PAYMENT INFORMATION", labelCol, y);
  y += rowH;
  doc
    .font("Helvetica")
    .fontSize(11)
    .fillColor("#fff")
    .text("Please make payment to the following bank account:", labelCol, y)
    .text("Account Name: John Wood", labelCol, y + rowH)
    .text("Sort Code: 09-01-29", labelCol, y + 2 * rowH)
    .text("Account Number: 29720653", labelCol, y + 3 * rowH)
    .text(`Reference: Please use Invoice #${invoice.id}`, labelCol, y + 4 * rowH);
  y += 5 * rowH + 5;

  // --- Footer ---
  doc
    .font("Helvetica")
    .fontSize(10)
    .fillColor("#FFD700")
    .text(
      "For any queries, please contact us at vipeliteexercise@gmail.com",
      left,
      790,
      { width: right - left, align: "center" }
    );

  doc.end();
}