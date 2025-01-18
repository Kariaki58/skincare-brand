import { connectToDatabase } from "@/lib/mongodb";
import User from "@/app/models/user";


export async function GET() {
    try {
        await connectToDatabase();

        const users = await User.find({});
        console.log(users)
        const data = await fetch('https://api.vercel.app/blog')
        const posts = await data.json()

        return Response.json(posts)

    } catch (error) {
        return Response.status(500).json({ error: "Something went wrong" })
    }
}