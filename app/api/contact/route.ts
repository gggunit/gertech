import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    const { name, email, phone, message } = formData;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json({ 
        success: false, 
        error: "Name, email, and message are required." 
      }, { status: 400 });
    }

    // TODO: Integrate with email service (SendGrid, Resend, etc.)
    // For now, we'll just log the submission and return success
    console.log("Contact form submission:", { name, email, phone, message });

    // You can integrate with email services here:
    // - SendGrid: https://sendgrid.com/
    // - Resend: https://resend.com/
    // - Nodemailer with SMTP
    // - Or forward to your email via a webhook service

    return NextResponse.json({ 
      success: true, 
      message: "Thank you for your message! German will get back to you soon." 
    });

  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ 
      success: false, 
      error: "Something went wrong. Please try again." 
    }, { status: 500 });
  }
}
