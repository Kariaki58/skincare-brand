import User from "@/models/user";


export async function POST(request) {
    try {
        const {pin} = await request.json()
        
        if (!pin) {
            return new Response(JSON.stringify({ error: "token is required", verified: false }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        const user = await User.findOne({ token: pin }).exec();
        console.log({user})
        if (!user) {
            return new Response(JSON.stringify({ error: "Invalid token", verified: false }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        if (user.expires) {
            if (user.expires < Date.now()) {
                return new Response(JSON.stringify({ error: "Token expired", verified: false }), {
                    status: 401,
                    headers: { 'Content-Type': 'application/json' },
                });
            }
        } else {
            return new Response(JSON.stringify({ error: "Token expired", verified: false }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        user.isVerified = true;

        await user.save();

        return new Response(JSON.stringify({ verified: true, email: user.email }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message, verified: false }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
