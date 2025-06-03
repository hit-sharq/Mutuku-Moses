import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import nodemailer from "nodemailer"

// Create email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number.parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, subject, message } = await request.json()

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All required fields must be filled" }, { status: 400 })
    }

    // Save to database
    const contactRequest = await prisma.contactRequest.create({
      data: {
        name,
        email,
        phone: phone || "",
        subject,
        message,
      },
    })

    // Send email to Mutuku Moses
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1a365d; color: white; padding: 2rem; text-align: center;">
          <h1>New Contact Request</h1>
          <p>You have received a new message through your website</p>
        </div>
        
        <div style="padding: 2rem; background: #f7fafc;">
          <div style="background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #1a365d; margin-bottom: 1rem;">Contact Details</h2>
            
            <div style="margin-bottom: 1rem;">
              <strong>Name:</strong> ${name}
            </div>
            
            <div style="margin-bottom: 1rem;">
              <strong>Email:</strong> ${email}
            </div>
            
            ${phone ? `<div style="margin-bottom: 1rem;"><strong>Phone:</strong> ${phone}</div>` : ""}
            
            <div style="margin-bottom: 1rem;">
              <strong>Subject:</strong> ${subject}
            </div>
            
            <div style="margin-bottom: 1rem;">
              <strong>Message:</strong>
              <div style="background: #f7fafc; padding: 1rem; border-radius: 4px; margin-top: 0.5rem;">
                ${message.replace(/\n/g, "<br>")}
              </div>
            </div>
            
            <div style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #e2e8f0;">
              <small style="color: #666;">
                Received on: ${new Date().toLocaleString()}<br>
                Request ID: ${contactRequest.id}
              </small>
            </div>
          </div>
        </div>
        
        <div style="background: #1a365d; color: white; padding: 1rem; text-align: center;">
          <p style="margin: 0;">Mutuku Moses Law Firm - Contact Management System</p>
        </div>
      </div>
    `

    // Send email
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL || "info@mutukumoses.com",
      subject: `New Contact Request: ${subject}`,
      html: emailHtml,
      replyTo: email,
    })

    // Send confirmation email to client
    const confirmationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1a365d; color: white; padding: 2rem; text-align: center;">
          <h1>Thank You for Contacting Us</h1>
          <p>We have received your message and will respond within 24 hours</p>
        </div>
        
        <div style="padding: 2rem; background: #f7fafc;">
          <div style="background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <p>Dear ${name},</p>
            
            <p>Thank you for reaching out to Mutuku Moses Law Firm. We have received your message regarding "${subject}" and will review it promptly.</p>
            
            <p>Our team typically responds to all inquiries within 24 hours during business days. If your matter is urgent, please don't hesitate to call us directly at <strong>+254 700 123 456</strong>.</p>
            
            <div style="background: #f7fafc; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
              <h3 style="color: #1a365d; margin-top: 0;">Your Message Summary:</h3>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Message:</strong> ${message.substring(0, 200)}${message.length > 200 ? "..." : ""}</p>
            </div>
            
            <p>We appreciate your interest in our legal services and look forward to assisting you.</p>
            
            <p>Best regards,<br>
            <strong>Mutuku Moses Law Firm</strong></p>
          </div>
        </div>
        
        <div style="background: #1a365d; color: white; padding: 1rem; text-align: center;">
          <p style="margin: 0;">📧 info@mutukumoses.com | 📞 +254 700 123 456</p>
        </div>
      </div>
    `

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email,
      subject: "Thank you for contacting Mutuku Moses Law Firm",
      html: confirmationHtml,
    })

    return NextResponse.json(
      {
        message: "Message sent successfully! We'll get back to you within 24 hours.",
        id: contactRequest.id,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error processing contact request:", error)
    return NextResponse.json(
      { error: "Failed to send message. Please try again or contact us directly." },
      { status: 500 },
    )
  }
}

export async function GET() {
  try {
    const contacts = await prisma.contactRequest.findMany({
      orderBy: { createdAt: "desc" },
      take: 50, // Limit to last 50 requests
    })

    return NextResponse.json(contacts)
  } catch (error) {
    console.error("Error fetching contact requests:", error)
    return NextResponse.json({ error: "Failed to fetch contact requests" }, { status: 500 })
  }
}
