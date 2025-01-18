import { connectToDatabase } from "@/lib/mongodb";
import User from "@/app/models/user";

export const dynamic = 'force-static';

export async function GET() {
    await connectToDatabase();
    const users = await User.find()
    console.log(users)
    const res = await fetch('https://api.vercel.app/blog', {
        headers: {
        'Content-Type': 'application/json',
        },
    })
    const data = await res.json()
    
    return Response.json({ data })
}