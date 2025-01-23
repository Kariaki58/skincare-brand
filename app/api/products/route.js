import { connectToDatabase } from "@/lib/mongoose";
import User from "@/models/user";

export const dynamic = 'force-static';

export async function GET() {
    await connectToDatabase();
    const users = await User.find()
    const res = await fetch('https:/api.vercel.app/blog')
    const data = await res.json()

    
    return Response.json({ data })
}
