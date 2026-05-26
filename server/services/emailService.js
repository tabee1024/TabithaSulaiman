import { Resend } from "resend";

export async function sendContactNotification(contactMessage) {
    const resendApiKey = process.env.RESEND_API_KEY;
    const notificationTo = process.env.CONTACT_NOTIFICATION_TO;
    const notificationFrom = process.env.CONTACT_NOTIFICATION_FROM;

    if (!resendApiKey || !notificationTo || !notificationFrom) {
        console.warn("Contact notification email skipped: Resend environment variables are missing.");
        return;
    }

    const resend = new Resend(resendApiKey);

    const submittedAt = new Date(contactMessage.createdAt).toLocaleString("en-US", {
        timeZone: "America/Los_Angeles",
        dateStyle: "medium",
        timeStyle: "short",
    });

    const subject = `Portfolio: New message from ${contactMessage.name}${contactMessage.title ? `, ${contactMessage.title}` : ""
        }${contactMessage.company ? ` @ ${contactMessage.company}` : ""}`;

    // Awaits Resend API respons after sending an email with contact info.
    await resend.emails.send({
        from: notificationFrom,
        to: notificationTo,
        replyTo: contactMessage.email,
        subject,
        text: `
New portfolio contact message

Name: ${contactMessage.name}
Email: ${contactMessage.email}
Title: ${contactMessage.title || "Not provided"}
Company: ${contactMessage.company || "Not provided"}
Reason: ${contactMessage.reason || "Other"}
Submitted: ${submittedAt}

Message:
${contactMessage.message}
        `.trim(),
    });
}