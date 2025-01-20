import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";


const Nav = async () => {
    const session = await getServerSession();
    return (
        <nav className="flex gap-10">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            {session && <Link href="/dashboard">Dashboard</Link>}
            {/* {!session && <Link href="/auth/[...nextauth]">Login</Link>} */}
            {session ?(
                <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
            ): (
                <Link href="/api/auth/signin" method="POST">Login</Link>
            )
            }
        </nav>
    )
}

export default Nav