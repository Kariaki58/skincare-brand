import User from "@/models/user";


export async function POST(request) {
    try {
        const token = request.nextUrl.searchParams.get('token');


        if (!token) {
            return new Response(JSON.stringify({ error: "token is required" }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        console.log({ token })
        const user = await User.findOne({ token }).exec();
        console.log({user})
        if (!user) {
            return new Response(JSON.stringify({ error: "Invalid token" }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        if (user.expires) {
            if (user.expires < Date.now()) {
                return new Response(JSON.stringify({ error: "Token expired" }), {
                    status: 401,
                    headers: { 'Content-Type': 'application/json' },
                });
            }
        } else {
            return new Response(JSON.stringify({ error: "Token expired" }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        user.isVerified = true;
        user.token = null;
        user.expires = null;

        await user.save();

        return new Response(JSON.stringify({ verified: true, email: user.email }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
