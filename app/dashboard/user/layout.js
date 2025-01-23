"use client"
import { signOut } from "next-auth/react"


export default function layout() {
    return (
        <div>
            user layout
            <button onClick={() => signOut()}>Logout</button>
        </div>
    )
}