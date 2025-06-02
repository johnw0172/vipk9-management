import PDFDocument from 'pdfkit';
import type { Response } from 'express';

interface WageSlipData {
  staffId: number;
  staffName: string;
  staffRole?: string;
  hourlyRate: number;
  totalHours: number;
  totalWages: number;
  period: string;
  startDate: Date;
  endDate: Date;
  regularHours?: number;
  overtimeHours?: number;
  breakHours?: number;
}

export function generateWageSlipPDF(res: Response, wageData: WageSlipData) {
  const doc = new PDFDocument({ size: 'A4', margin: 50 });
  
  // Set response headers for PDF download
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="wage-slip-${wageData.staffName.replace(/\s+/g, '-')}-${wageData.period}.pdf"`);
  
  // Pipe the PDF to the response
  doc.pipe(res);
  
  // Company Header
  doc.fontSize(24).fillColor('#FFD700').text('VIP Elite K9s', 50, 50);
  doc.fontSize(12).fillColor('#000000').text('Staff Wage Slip', 50, 80);
  
  // Add border
  doc.rect(40, 40, 515, 750).stroke('#FFD700');
  
  // Staff Information Section
  let yPosition = 120;
  
  doc.fontSize(16).fillColor('#000000').text('Staff Information', 60, yPosition);
  yPosition += 30;
  
  doc.fontSize(12)
     .text(`Name: ${wageData.staffName}`, 60, yPosition)
     .text(`Role: ${wageData.staffRole || 'Staff Member'}`, 300, yPosition);
  yPosition += 20;
  
  doc.text(`Staff ID: ${wageData.staffId}`, 60, yPosition)
     .text(`Hourly Rate: £${(wageData.hourlyRate / 100).toFixed(2)}`, 300, yPosition);
  yPosition += 40;
  
  // Period Information
  doc.fontSize(16).text('Pay Period', 60, yPosition);
  yPosition += 30;
  
  doc.fontSize(12)
     .text(`Period Type: ${wageData.period.charAt(0).toUpperCase() + wageData.period.slice(1)}`, 60, yPosition)
     .text(`Start Date: ${new Date(wageData.startDate).toLocaleDateString('en-GB')}`, 300, yPosition);
  yPosition += 20;
  
  doc.text(`End Date: ${new Date(wageData.endDate).toLocaleDateString('en-GB')}`, 60, yPosition);
  yPosition += 40;
  
  // Hours Breakdown
  doc.fontSize(16).text('Hours Breakdown', 60, yPosition);
  yPosition += 30;
  
  // Create table for hours
  const tableStartY = yPosition;
  const tableWidth = 450;
  const rowHeight = 25;
  
  // Table headers
  doc.rect(60, tableStartY, tableWidth, rowHeight).stroke();
  doc.fontSize(11).fillColor('#FFD700').text('Description', 70, tableStartY + 8);
  doc.text('Hours', 250, tableStartY + 8);
  doc.text('Rate (£)', 350, tableStartY + 8);
  doc.text('Amount (£)', 450, tableStartY + 8);
  
  yPosition += rowHeight;
  
  // Regular hours row
  doc.rect(60, yPosition, tableWidth, rowHeight).stroke();
  doc.fillColor('#000000').text('Regular Hours', 70, yPosition + 8);
  doc.text((wageData.regularHours || wageData.totalHours).toFixed(1), 250, yPosition + 8);
  doc.text((wageData.hourlyRate / 100).toFixed(2), 350, yPosition + 8);
  doc.text(((wageData.regularHours || wageData.totalHours) * (wageData.hourlyRate / 100)).toFixed(2), 450, yPosition + 8);
  
  yPosition += rowHeight;
  
  // Overtime hours row (if applicable)
  if (wageData.overtimeHours && wageData.overtimeHours > 0) {
    doc.rect(60, yPosition, tableWidth, rowHeight).stroke();
    doc.text('Overtime Hours (1.5x)', 70, yPosition + 8);
    doc.text(wageData.overtimeHours.toFixed(1), 250, yPosition + 8);
    doc.text((wageData.hourlyRate * 1.5 / 100).toFixed(2), 350, yPosition + 8);
    doc.text((wageData.overtimeHours * wageData.hourlyRate * 1.5 / 100).toFixed(2), 450, yPosition + 8);
    yPosition += rowHeight;
  }
  
  // Total row
  doc.rect(60, yPosition, tableWidth, rowHeight).stroke();
  doc.fontSize(12).fillColor('#FFD700').text('TOTAL', 70, yPosition + 8);
  doc.fillColor('#000000').text(wageData.totalHours.toFixed(1), 250, yPosition + 8);
  doc.text('-', 350, yPosition + 8);
  doc.fontSize(14).text(`£${(wageData.totalWages / 100).toFixed(2)}`, 440, yPosition + 6);
  
  yPosition += rowHeight + 30;
  
  // Summary section
  doc.fontSize(16).fillColor('#000000').text('Summary', 60, yPosition);
  yPosition += 30;
  
  doc.fontSize(12)
     .text(`Total Hours Worked: ${wageData.totalHours.toFixed(1)} hours`, 60, yPosition);
  yPosition += 20;
  
  if (wageData.breakHours && wageData.breakHours > 0) {
    doc.text(`Break Time Taken: ${wageData.breakHours.toFixed(1)} hours`, 60, yPosition);
    yPosition += 20;
  }
  
  doc.fontSize(14).fillColor('#FFD700')
     .text(`Gross Pay: £${(wageData.totalWages / 100).toFixed(2)}`, 60, yPosition);
  yPosition += 40;
  
  // Footer
  doc.fontSize(10).fillColor('#666666')
     .text('This wage slip is generated automatically by the VIP Elite K9s staff management system.', 60, yPosition)
     .text(`Generated on: ${new Date().toLocaleDateString('en-GB')} at ${new Date().toLocaleTimeString('en-GB')}`, 60, yPosition + 15);
  
  // Add logo space (placeholder)
  doc.fontSize(8).fillColor('#999999')
     .text('VIP Elite K9s - Professional Dog Training & Boarding Services', 60, 760);
  
  // Finalize the PDF
  doc.end();
}