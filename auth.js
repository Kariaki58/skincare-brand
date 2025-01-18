
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { connect } from "./lib/mongodb";


export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google],
    callbacks: {
        async signIn({ user, account, profile }) {
            try {
                await connect();

                // const existingUser = await User.findOne({ email: user.email }).exec();

                // if (existingUser) {
                //     await User.create({
                //         name: user.name,
                //         email: user.email,
                //         googleId: account.providerAccountId,
                //         avatar: user.image,
                //         role: "user",
                //     });
                // }
                return true;
            } catch (error) {
                console.error("Error during sign-in:", error);
                return false;
            }
        },
        async session({ session, token, user }) {
            try {
                await connect();

                // console.log({ token, user, session });

                // const dbUser = await User.findOne({ email: session.user.email });
                // session.user.role = dbUser.role;

                return session;
            } catch (error) {
                console.error("Error during session callback:", error);
                return session;
            }
        }
    },
})