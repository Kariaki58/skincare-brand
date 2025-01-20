import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/user";
import { connectToDatabase } from "@/lib/mongoose";
import bcrypt from "bcrypt";

export const options = {
    providers: [
        GoogleProvider({
            profile: async (profile) => {
                try {
                    await connectToDatabase();

                    let userRole = "user";
                    if (profile?.email === "kariakistephen809@gmail.com") {
                        userRole = "admin";
                    }

                    // Check if user exists
                    let user = await User.findOne({ email: profile.email }).exec();
                    if (!user) {
                        // Create new user
                        user = await User.create({
                            name: profile.name,
                            email: profile.email,
                            googleId: profile.sub,
                            avatar: profile.picture,
                            role: userRole,
                            provider: "google",
                        });
                    }
                    return {
                        ...profile,
                        id: profile.sub,
                        role: user.role,
                    };
                } catch (error) {
                    return null;
                }
            },
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "your-email" },
                password: { label: "Password", type: "password", placeholder: "your-password" },
            },
            async authorize(credentials) {
                try {
                    await connectToDatabase();

                    let user = await User.findOne({ email: credentials.email }).exec();
                    if (!user) {
                        // Create new user with hashed password
                        const hashedPassword = await bcrypt.hash(credentials.password, 10);
                        user = await User.create({
                            name: credentials.email.split("@")[0], // Default name as part of email
                            email: credentials.email,
                            password: hashedPassword,
                            role: "user",
                            provider: "credentials",
                        });
                    }

                    // Validate password
                    const isPasswordMatch = await bcrypt.compare(credentials.password, user.password);
                    if (!isPasswordMatch) {
                        throw new Error("Invalid email or password");
                    }

                    return {
                        id: user._id.toString(),
                        name: user.name,
                        email: user.email,
                        role: user.role,
                    };
                } catch (error) {
                    return null;
                }
                
            },
        }),
    ],
    pages: {
        signIn: "/auth/signin",
        signUp: "/auth/signup",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) token.role = user.role;
            return token;
        },
        async session({ session, token }) {
            if (session?.user) session.user.role = token.role;
            return session;
        },
    },
};
