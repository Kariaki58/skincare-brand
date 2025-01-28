import { LoginForm } from "@/components/app-ui/authentication/login-form"


export default function page() {
    return (
        <div className="bg-gradient-to-br from-[rgb(2,248,1)] to-[rgb(248,248,0)] flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
            <div className="w-full max-w-sm">
                <LoginForm />
            </div>
        </div>
    )
}
