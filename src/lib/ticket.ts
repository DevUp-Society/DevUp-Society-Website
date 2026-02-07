<<<<<<< HEAD
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import QRCode from "qrcode";
=======
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import QRCode from 'qrcode';
import type { TeamMember } from './resend';
>>>>>>> b29a5b1854d49719119855953f0686e67163ab5e

interface TicketData {
  teamNumber: string;
  teamName: string;
  leadName: string;
  teamSize: number;
  teamMembers?: TeamMember[]; // Array of member objects with name and optional phone
  eventName: string;
  eventDate: string;
  eventVenue: string;
}

export async function generateTicket(data: TicketData): Promise<Uint8Array> {
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 400]);

  // Load fonts
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const { width, height } = page.getSize();

  // Colors - Updated for better visibility
  const signalYellow = rgb(0.8, 1, 0); // #ccff00
  const white = rgb(1, 1, 1);
  const darkBg = rgb(0.015, 0.015, 0.015); // Very dark #040404
  const cardBg = rgb(0.06, 0.06, 0.07); // #0f0f12
  const borderGray = rgb(0.2, 0.2, 0.21); // #333336
  const textGray = rgb(0.63, 0.63, 0.67); // zinc-400
  const labelGray = rgb(0.44, 0.44, 0.48); // zinc-500

  // Background
  page.drawRectangle({
    x: 0,
    y: 0,
    width,
    height,
    color: darkBg,
  });

  // Decorative corner accents (top-left)
  page.drawLine({
    start: { x: 20, y: height - 20 },
    end: { x: 60, y: height - 20 },
    thickness: 3,
    color: signalYellow,
  });
  page.drawLine({
    start: { x: 20, y: height - 20 },
    end: { x: 20, y: height - 60 },
    thickness: 3,
    color: signalYellow,
  });

  // Decorative corner accents (bottom-right)
  page.drawLine({
    start: { x: width - 20, y: 20 },
    end: { x: width - 60, y: 20 },
    thickness: 3,
    color: signalYellow,
  });
  page.drawLine({
    start: { x: width - 20, y: 20 },
    end: { x: width - 20, y: 60 },
    thickness: 3,
    color: signalYellow,
  });

  // Main border
  page.drawRectangle({
    x: 15,
    y: 15,
    width: width - 30,
    height: height - 30,
    borderColor: borderGray,
    borderWidth: 1,
  });

  // Header bar
  page.drawRectangle({
    x: 15,
    y: height - 100,
    width: width - 30,
    height: 85,
    color: cardBg,
  });

  // Accent line under header
  page.drawLine({
    start: { x: 30, y: height - 100 },
    end: { x: width - 30, y: height - 100 },
    thickness: 2,
    color: signalYellow,
  });

  // Event title
  page.drawText("DEVTHON 2026", {
    x: 30,
    y: height - 40,
    size: 32,
    font: boldFont,
    color: white,
  });

  page.drawText("36-HOUR HACKATHON", {
    x: 30,
    y: height - 65,
    size: 12,
    font: regularFont,
    color: signalYellow,
  });

  // Team Number (top right)
  const teamNumWidth = boldFont.widthOfTextAtSize(data.teamNumber, 24);
  page.drawText(data.teamNumber, {
    x: width - teamNumWidth - 30,
    y: height - 50,
    size: 24,
    font: boldFont,
    color: signalYellow,
  });

  // Content area - left side
  let yPos = height - 130;
  const leftX = 30;
  const labelSize = 9;
  const valueSize = 14;
  const lineHeight = 40;

  // Team Name
  page.drawText("TEAM NAME", {
    x: leftX,
    y: yPos,
    size: labelSize,
    font: regularFont,
    color: labelGray,
  });
  page.drawText(data.teamName, {
    x: leftX,
    y: yPos - 18,
    size: valueSize,
    font: boldFont,
    color: white,
  });

  yPos -= lineHeight;

  // Team Lead
  page.drawText("TEAM LEAD", {
    x: leftX,
    y: yPos,
    size: labelSize,
    font: regularFont,
    color: labelGray,
  });
  page.drawText(data.leadName, {
    x: leftX,
    y: yPos - 18,
    size: valueSize,
    font: regularFont,
    color: white,
  });

  yPos -= lineHeight;

  // Team Size
  page.drawText("TEAM SIZE", {
    x: leftX,
    y: yPos,
    size: labelSize,
    font: regularFont,
    color: labelGray,
  });
  page.drawText(`${data.teamSize} Members`, {
    x: leftX,
    y: yPos - 18,
    size: valueSize,
    font: regularFont,
    color: white,
  });

  yPos -= lineHeight;

  // Team Members
  if (data.teamMembers && data.teamMembers.length > 0) {
    page.drawText("TEAM MEMBERS", {
      x: leftX,
      y: yPos,
      size: labelSize,
      font: regularFont,
      color: labelGray,
    });
<<<<<<< HEAD

    const membersList = data.teamMembers.join(", ");
=======
    
    const membersList = data.teamMembers.map(m => typeof m === 'string' ? m : m.name).join(', ');
>>>>>>> b29a5b1854d49719119855953f0686e67163ab5e
    const maxWidth = 250;
    let memberText = membersList;

    // Truncate if too long
    if (regularFont.widthOfTextAtSize(membersList, 12) > maxWidth) {
      let truncated = membersList;
      while (
        regularFont.widthOfTextAtSize(truncated + "...", 12) > maxWidth &&
        truncated.length > 10
      ) {
        truncated = truncated.substring(0, truncated.lastIndexOf(","));
      }
      memberText = truncated + "...";
    }

    page.drawText(memberText, {
      x: leftX,
      y: yPos - 18,
      size: 12,
      font: regularFont,
      color: white,
    });

    yPos -= lineHeight;
  }

  // Event Details
  page.drawText("EVENT DATE", {
    x: leftX,
    y: yPos,
    size: labelSize,
    font: regularFont,
    color: labelGray,
  });
  page.drawText(data.eventDate, {
    x: leftX,
    y: yPos - 18,
    size: valueSize,
    font: regularFont,
    color: white,
  });

  yPos -= lineHeight;

  // Venue
  page.drawText("VENUE", {
    x: leftX,
    y: yPos,
    size: labelSize,
    font: regularFont,
    color: labelGray,
  });
  page.drawText(data.eventVenue, {
    x: leftX,
    y: yPos - 18,
    size: valueSize,
    font: regularFont,
    color: white,
  });

  // QR Code - right side
  const qrCodeData = JSON.stringify({
    teamNumber: data.teamNumber,
    teamName: data.teamName,
    leadName: data.leadName,
    eventName: data.eventName,
    verified: true,
  });

  const qrCodeDataUrl = await QRCode.toDataURL(qrCodeData, {
    width: 150,
    margin: 1,
    color: {
      dark: "#000000",
      light: "#FFFFFF",
    },
  });

  // Embed QR code
  const qrImageBytes = Buffer.from(qrCodeDataUrl.split(",")[1], "base64");
  const qrImage = await pdfDoc.embedPng(qrImageBytes);

  const qrSize = 150;
  const qrX = width - qrSize - 40;
  const qrY = height - 280;

  // QR code background
  page.drawRectangle({
    x: qrX - 10,
    y: qrY - 10,
    width: qrSize + 20,
    height: qrSize + 20,
    color: white,
  });

  page.drawImage(qrImage, {
    x: qrX,
    y: qrY,
    width: qrSize,
    height: qrSize,
  });

  // QR code label
  const qrLabelText = "SCAN FOR CHECK-IN";
  const qrLabelWidth = regularFont.widthOfTextAtSize(qrLabelText, 10);
  page.drawText(qrLabelText, {
    x: qrX + (qrSize - qrLabelWidth) / 2,
    y: qrY - 25,
    size: 10,
    font: boldFont,
    color: signalYellow,
  });

  // Footer
  page.drawText("DevUp Society | VJIT Hyderabad", {
    x: 30,
    y: 25,
    size: 10,
    font: regularFont,
    color: textGray,
  });

  // Important notice with icon substitute
  page.drawText("[!] IMPORTANT: Present this ticket at the venue for entry", {
    x: width - 360,
    y: 25,
    size: 9,
    font: boldFont,
    color: signalYellow,
  });

  // Save the PDF
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}
