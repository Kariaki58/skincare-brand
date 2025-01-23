"use server";
import { sendEmail } from "./sendEmail";
import { connectToDatabase } from "@/lib/mongoose";
import User from "@/models/user";


const token = () => {
    return Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);
}

export async function EmailVerification(email) {
    try {
        const verifyToken = token();
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
                        .email-body a {
                        display: inline-block;
                        margin: 20px 0;
                        padding: 10px 20px;
                        background: #4caf50;
                        color: white;
                        text-decoration: none;
                        border-radius: 5px;
                        font-size: 16px;
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
                        <p>Thank you for signing up! Please verify your email address by clicking the button below:</p>
                        <a href="http://localhost:3000/auth/verify?token=${verifyToken}" target="_blank">Verify Email</a>
                        <p>If you didn’t request this, you can safely ignore this email.</p>
                    </div>
                    <div class="email-footer">
                        <p>&copy; 2025 Your Company Name. All rights reserved.</p>
                    </div>
                    </div>
                </body>
                </html>
            `
        await connectToDatabase();
        const exitingUser = await User.findOne({ email })

        if (!exitingUser) {
            await User.create({ 
                name: email.split('@')[0], 
                email, 
                token: verifyToken, 
                expires: new Date(Date.now() + 3600000), 
                provider: "email" 
            });
        } else {
            exitingUser.token = verifyToken;
            exitingUser.expires = new Date(Date.now() + 3600000);
            await exitingUser.save();
        }
        
        if (sendEmail(email, "verify your email address", html)) {
            console.log(`Verification email sent to ${email}`);
            return true;
        }
    } catch (error) {
        return false;
    }
}
