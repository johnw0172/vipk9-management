import PDFDocument from 'pdfkit';
import type { Response } from 'express';

interface DailyReportData {
  id: number;
  dogId: number;
  kennelId: number;
  staffId: number;
  reportDate: string;
  exerciseNotes: string;
  exerciseDuration?: string | null;
  exerciseType?: string | null;
  exerciseEnergyLevel?: string | null;
  healthNotes: string;
  appetite?: string | null;
  behaviorChanges?: string | null;
  healthConcerns?: string | null;
  feedingTime?: string | null;
  feedingAmount?: string | null;
  feedingAppetite?: string | null;
  feedingNotes?: string | null;
  bondingNotes: string;
  playPreferences?: string | null;
  mood?: string | null;
  trainingCommands?: string | null;
  trainingProgress?: string | null;
  trainingNotes?: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
}

interface ReportDetails {
  dogName: string;
  dogBreed?: string | null;
  kennelNumber: number;
  staffName: string;
  clientName?: string | null;
}

export function generateDailyReportPDF(
  res: Response,
  report: DailyReportData,
  details: ReportDetails
) {
  const doc = new PDFDocument({ 
    margin: 40,
    size: 'A4',
    bufferPages: true
  });
  
  // Set response headers
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="VIP-Elite-K9s-Daily-Report-${report.reportDate}-${details.dogName}.pdf"`);
  
  // Pipe the PDF to the response
  doc.pipe(res);

  // Colors and styling
  const goldColor = '#D4AF37';
  const darkGold = '#B8941F';
  const blackColor = '#000000';
  const grayColor = '#666666';
  const lightGray = '#F5F5F5';
  const sectionBg = '#FAFAFA';

  // Page dimensions
  const pageWidth = doc.page.width - 80; // Account for margins
  const leftMargin = 40;
  const rightMargin = 40;

  // Header with elegant styling
  doc.rect(0, 0, doc.page.width, 120)
     .fillColor(blackColor)
     .fill();

  doc.fillColor(goldColor)
     .fontSize(28)
     .font('Helvetica-Bold')
     .text('VIP ELITE K9s', leftMargin, 25, { align: 'center', width: pageWidth });

  doc.fillColor('white')
     .fontSize(16)
     .font('Helvetica')
     .text('Premium Dog Care Services', leftMargin, 55, { align: 'center', width: pageWidth });

  doc.fillColor(goldColor)
     .fontSize(18)
     .font('Helvetica-Bold')
     .text('Daily Care Report', leftMargin, 80, { align: 'center', width: pageWidth });

  // Report details section with improved layout
  let yPos = 140;
  
  // Background for report details
  doc.rect(leftMargin, yPos - 10, pageWidth, 80)
     .fillColor(sectionBg)
     .fill()
     .strokeColor(goldColor)
     .lineWidth(1)
     .stroke();

  doc.fillColor(blackColor)
     .fontSize(14)
     .font('Helvetica-Bold')
     .text('Report Information', leftMargin + 15, yPos + 5);

  yPos += 25;

  // Two-column layout for report details
  const col1X = leftMargin + 15;
  const col2X = leftMargin + 280;

  doc.fillColor(blackColor)
     .fontSize(11)
     .font('Helvetica-Bold');

  // Left column
  doc.text('Dog:', col1X, yPos)
     .font('Helvetica')
     .text(`${details.dogName}${details.dogBreed ? ` (${details.dogBreed})` : ''}`, col1X + 40, yPos);

  doc.font('Helvetica-Bold')
     .text('Kennel:', col1X, yPos + 15)
     .font('Helvetica')
     .text(`#${details.kennelNumber}`, col1X + 40, yPos + 15);

  doc.font('Helvetica-Bold')
     .text('Staff:', col1X, yPos + 30)
     .font('Helvetica')
     .text(details.staffName, col1X + 40, yPos + 30);

  // Right column
  doc.font('Helvetica-Bold')
     .text('Date:', col2X, yPos)
     .font('Helvetica')
     .text(new Date(report.reportDate).toLocaleDateString('en-US', { 
       weekday: 'long', 
       year: 'numeric', 
       month: 'long', 
       day: 'numeric' 
     }), col2X + 35, yPos);

  doc.font('Helvetica-Bold')
     .text('Report ID:', col2X, yPos + 15)
     .font('Helvetica')
     .text(`#${report.id}`, col2X + 60, yPos + 15);

  doc.font('Helvetica-Bold')
     .text('Client:', col2X, yPos + 30)
     .font('Helvetica')
     .text(details.clientName || 'N/A', col2X + 40, yPos + 30);

  let yPosition = 260;

  // Helper function to create section headers with elegant styling
  const createSectionHeader = (title: string, yPos: number): number => {
    // Golden section header with gradient effect
    doc.rect(leftMargin, yPos - 5, pageWidth, 28)
       .fillColor(goldColor)
       .fill();

    // Add subtle border
    doc.rect(leftMargin, yPos - 5, pageWidth, 28)
       .strokeColor(darkGold)
       .lineWidth(1)
       .stroke();

    doc.fillColor('white')
       .fontSize(14)
       .font('Helvetica-Bold')
       .text(title, leftMargin + 15, yPos + 5);

    return yPos + 40;
  };

  // Helper function to create content areas with dynamic height
  const createContentArea = (yPos: number, minHeight: number = 60): { startY: number, endY: number } => {
    const contentHeight = Math.max(minHeight, 60);
    
    doc.rect(leftMargin, yPos, pageWidth, contentHeight)
       .fillColor(sectionBg)
       .fill()
       .strokeColor('#E0E0E0')
       .lineWidth(0.5)
       .stroke();

    return { startY: yPos + 12, endY: yPos + contentHeight };
  };

  // Helper function to check if new page is needed
  const checkPageBreak = (currentY: number, requiredHeight: number): number => {
    if (currentY + requiredHeight > doc.page.height - 120) { // Leave space for footer
      doc.addPage();
      // Add header on new page
      doc.rect(0, 0, doc.page.width, 120)
         .fillColor(blackColor)
         .fill();

      doc.fillColor(goldColor)
         .fontSize(24)
         .font('Helvetica-Bold')
         .text('VIP ELITE K9s', leftMargin, 25, { align: 'center', width: pageWidth });

      doc.fillColor('white')
         .fontSize(14)
         .text('Daily Care Report - Continued', leftMargin, 55, { align: 'center', width: pageWidth });

      return 140; // Start position after header
    }
    return currentY;
  };

  // Exercise Section with improved layout
  if (report.exerciseNotes) {
    yPosition = checkPageBreak(yPosition, 120);
    yPosition = createSectionHeader('EXERCISE & ACTIVITY', yPosition);
    
    const contentArea = createContentArea(yPosition, 80);
    let contentY = contentArea.startY;

    // Exercise details in organized layout
    const detailsY = contentY;
    const col1X = leftMargin + 15;
    const col2X = leftMargin + 180;
    const col3X = leftMargin + 350;

    doc.fillColor(blackColor)
       .fontSize(10)
       .font('Helvetica-Bold');

    if (report.exerciseDuration) {
      doc.text('Duration:', col1X, detailsY)
         .font('Helvetica')
         .text(report.exerciseDuration, col1X + 50, detailsY);
    }

    if (report.exerciseType) {
      doc.font('Helvetica-Bold')
         .text('Activity:', col2X, detailsY)
         .font('Helvetica')
         .text(report.exerciseType, col2X + 50, detailsY);
    }

    if (report.exerciseEnergyLevel) {
      doc.font('Helvetica-Bold')
         .text('Energy Level:', col3X, detailsY)
         .font('Helvetica')
         .text(report.exerciseEnergyLevel, col3X + 70, detailsY);
    }

    // Exercise notes in dedicated area
    contentY += 25;
    doc.font('Helvetica-Bold')
       .fontSize(10)
       .text('Notes:', col1X, contentY);

    contentY += 15;
    doc.font('Helvetica')
       .fontSize(10)
       .text(report.exerciseNotes, col1X, contentY, { 
         width: pageWidth - 30,
         align: 'justify'
       });

    yPosition = contentArea.endY + 20;
  }

  // Health Section with improved layout
  if (report.healthNotes) {
    yPosition = checkPageBreak(yPosition, 120);
    yPosition = createSectionHeader('HEALTH & WELLNESS', yPosition);
    
    const contentArea = createContentArea(yPosition, 80);
    let contentY = contentArea.startY;

    // Health details in organized columns
    const col1X = leftMargin + 15;
    const col2X = leftMargin + 200;
    const col3X = leftMargin + 380;

    doc.fillColor(blackColor)
       .fontSize(10)
       .font('Helvetica-Bold');

    if (report.appetite) {
      doc.text('Appetite:', col1X, contentY)
         .font('Helvetica')
         .text(report.appetite, col1X + 50, contentY);
    }

    if (report.behaviorChanges) {
      doc.font('Helvetica-Bold')
         .text('Behavior:', col2X, contentY)
         .font('Helvetica')
         .text(report.behaviorChanges, col2X + 55, contentY);
    }

    if (report.healthConcerns) {
      doc.font('Helvetica-Bold')
         .text('Concerns:', col3X, contentY)
         .font('Helvetica')
         .text(report.healthConcerns, col3X + 55, contentY);
    }

    // Health notes
    contentY += 25;
    doc.font('Helvetica-Bold')
       .text('Health Notes:', col1X, contentY);

    contentY += 15;
    doc.font('Helvetica')
       .text(report.healthNotes, col1X, contentY, { 
         width: pageWidth - 30,
         align: 'justify'
       });

    yPosition = contentArea.endY + 20;
  }

  // Feeding Section with improved layout
  if (report.feedingNotes || report.feedingTime || report.feedingAmount) {
    yPosition = checkPageBreak(yPosition, 120);
    yPosition = createSectionHeader('FEEDING & NUTRITION', yPosition);
    
    const contentArea = createContentArea(yPosition, 80);
    let contentY = contentArea.startY;

    // Feeding details in organized columns
    const col1X = leftMargin + 15;
    const col2X = leftMargin + 180;
    const col3X = leftMargin + 350;

    doc.fillColor(blackColor)
       .fontSize(10)
       .font('Helvetica-Bold');

    if (report.feedingTime) {
      doc.text('Time:', col1X, contentY)
         .font('Helvetica')
         .text(report.feedingTime, col1X + 35, contentY);
    }

    if (report.feedingAmount) {
      doc.font('Helvetica-Bold')
         .text('Amount:', col2X, contentY)
         .font('Helvetica')
         .text(report.feedingAmount, col2X + 45, contentY);
    }

    if (report.feedingAppetite) {
      doc.font('Helvetica-Bold')
         .text('Appetite:', col3X, contentY)
         .font('Helvetica')
         .text(report.feedingAppetite, col3X + 50, contentY);
    }

    // Feeding notes
    if (report.feedingNotes) {
      contentY += 25;
      doc.font('Helvetica-Bold')
         .text('Feeding Notes:', col1X, contentY);

      contentY += 15;
      doc.font('Helvetica')
         .text(report.feedingNotes, col1X, contentY, { 
           width: pageWidth - 30,
           align: 'justify'
         });
    }

    yPosition = contentArea.endY + 20;
  }

  // Bonding & Playing Section with improved layout
  if (report.bondingNotes) {
    yPosition = checkPageBreak(yPosition, 110);
    yPosition = createSectionHeader('BONDING & SOCIALIZATION', yPosition);
    
    const contentArea = createContentArea(yPosition, 70);
    let contentY = contentArea.startY;

    const col1X = leftMargin + 15;
    const col2X = leftMargin + 300;

    doc.fillColor(blackColor)
       .fontSize(10)
       .font('Helvetica-Bold');

    if (report.playPreferences) {
      doc.text('Play Style:', col1X, contentY)
         .font('Helvetica')
         .text(report.playPreferences, col1X + 60, contentY);
    }

    if (report.mood) {
      doc.font('Helvetica-Bold')
         .text('Mood:', col2X, contentY)
         .font('Helvetica')
         .text(report.mood, col2X + 35, contentY);
    }

    contentY += 25;
    doc.font('Helvetica-Bold')
       .text('Bonding Notes:', col1X, contentY);

    contentY += 15;
    doc.font('Helvetica')
       .text(report.bondingNotes, col1X, contentY, { 
         width: pageWidth - 30,
         align: 'justify'
       });

    yPosition = contentArea.endY + 20;
  }

  // Training Section with improved layout
  if (report.trainingNotes || report.trainingCommands || report.trainingProgress) {
    yPosition = checkPageBreak(yPosition, 110);
    yPosition = createSectionHeader('TRAINING & DEVELOPMENT', yPosition);
    
    const contentArea = createContentArea(yPosition, 70);
    let contentY = contentArea.startY;

    const col1X = leftMargin + 15;
    const col2X = leftMargin + 300;

    doc.fillColor(blackColor)
       .fontSize(10)
       .font('Helvetica-Bold');

    if (report.trainingCommands) {
      doc.text('Commands:', col1X, contentY)
         .font('Helvetica')
         .text(report.trainingCommands, col1X + 65, contentY);
    }

    if (report.trainingProgress) {
      doc.font('Helvetica-Bold')
         .text('Progress:', col2X, contentY)
         .font('Helvetica')
         .text(report.trainingProgress, col2X + 50, contentY);
    }

    if (report.trainingNotes) {
      contentY += 25;
      doc.font('Helvetica-Bold')
         .text('Training Notes:', col1X, contentY);

      contentY += 15;
      doc.font('Helvetica')
         .text(report.trainingNotes, col1X, contentY, { 
           width: pageWidth - 30,
           align: 'justify'
         });
    }

    yPosition = contentArea.endY + 20;
  }

  // Professional Footer
  const footerY = doc.page.height - 80;
  
  // Footer background
  doc.rect(0, footerY, doc.page.width, 80)
     .fillColor('#F8F8F8')
     .fill();

  // Footer content
  doc.fillColor(grayColor)
     .fontSize(10)
     .font('Helvetica')
     .text('VIP Elite K9s - Premium Dog Care Services', leftMargin, footerY + 15, { 
       align: 'center', 
       width: pageWidth 
     });

  doc.fontSize(8)
     .text(`Report generated on ${new Date().toLocaleDateString('en-US', { 
       weekday: 'long', 
       year: 'numeric', 
       month: 'long', 
       day: 'numeric',
       hour: '2-digit',
       minute: '2-digit'
     })}`, leftMargin, footerY + 35, { 
       align: 'center', 
       width: pageWidth 
     });

  doc.fillColor(goldColor)
     .text('Providing exceptional care for your beloved companions', leftMargin, footerY + 50, { 
       align: 'center', 
       width: pageWidth 
     });

  // Finalize the PDF
  doc.end();
}