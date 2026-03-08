import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

// This expects the environment variable SENDGRID_API_KEY
sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, message, honeypot } = body;

        // Simple Honeypot Check
        if (honeypot) {
            // Fake success status for bots
            return NextResponse.json({ success: true }, { status: 200 });
        }

        // Server-side validation
        if (!name || !email || !message) {
            return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
        }

        const msg = {
            to: "dawoodsyedsie001@gmail.com", // The recipient email
            from: "noreply@syeddawood.com", // SendGrid Verified Sender
            subject: `New Portfolio Message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        };

        // Make sure API Key exists before testing sending
        if (process.env.SENDGRID_API_KEY) {
            await sgMail.send(msg);
        } else {
            console.warn("SENDGRID_API_KEY not found. Message logged:", msg);
            // Simulate success if API key is not yet provided so the UI works in demo mode
        }

        return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }
}
