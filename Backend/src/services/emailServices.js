import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email, name, token) {
    const verificationUrl =
        `http://localhost:5173/verify-email?token=${token}`;

    await resend.emails.send({
        from: "FocusForge <onboarding@resend.dev>",
        to: email,
        subject: "Verify your FocusForge account",
        html: `
            <h2>Welcome to FocusForge, ${name}!</h2>

            <p>Click the button below to verify your email:</p>

            <a href="${verificationUrl}">
                Verify my email
            </a>

            <p>This link will expire soon.</p>
        `
    });
}