"use server";
import { sendEmail } from "./sendEmail";
import { connectToDatabase } from "@/lib/mongoose";
import User from "@/models/user";

// Function to generate a 6-digit numeric token
const generateToken = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

export async function EmailVerification(formData) {
    try {
        const { email, password } = formData;
        const verifyToken = generateToken();
        const html = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Email Verification</title>
                    <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 0;
                        background-color: #f4f4f4;
                        color: #333;
                    }
                    .email-container {
                        max-width: 600px;
                        margin: 20px auto;
                        background: #ffffff;
                        border: 1px solid #ddd;
                        border-radius: 8px;
                        overflow: hidden;
                    }
                    .email-header {
                        background: #4caf50;
                        color: white;
                        text-align: center;
                        padding: 20px;
                    }
                    .email-body {
                        padding: 20px;
                    }
                    .email-body p {
                        line-height: 1.6;
                    }
                    .email-body .token {
                        font-size: 24px;
                        font-weight: bold;
                        color: #4caf50;
                        text-align: center;
                        margin: 20px 0;
                    }
                    .email-footer {
                        text-align: center;
                        padding: 10px;
                        background: #f4f4f4;
                        font-size: 12px;
                        color: #666;
                    }
                    </style>
                </head>
                <body>
                    <div class="email-container">
                    <div class="email-header">
                        <h1>Verify Your Email</h1>
                    </div>
                    <div class="email-body">
                        <p>Hi there,</p>
                        <p>Thank you for signing up! Please verify your email address by entering the code below:</p>
                        <div class="token">${verifyToken}</div>
                        <p>If you didn’t request this, you can safely ignore this email.</p>
                    </div>
                    <div class="email-footer">
                        <p>&copy; 2025 Your Company Name. All rights reserved.</p>
                    </div>
                    </div>
                </body>
                </html>
            `;
        await connectToDatabase();
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            await User.create({ 
                name: email.split('@')[0], 
                email,
                password,
                token: verifyToken,
                expires: new Date(Date.now() + 3600000), // Expires in 1 hour
                provider: "email" 
            });
        } else {
            existingUser.token = verifyToken;
            existingUser.expires = new Date(Date.now() + 3600000);
            await existingUser.save();
        }

        if (sendEmail(email, "Verify Your Email Address", html)) {
            return true;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
}
