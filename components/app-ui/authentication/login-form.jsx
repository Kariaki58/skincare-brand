"use client";
import { useState } from "react";
import { GalleryVerticalEnd } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { loginSchema } from "@/schemas/login-schema";
import { z } from "zod";

export function LoginForm({ className, ...props }) {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false); // Add loading state

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true
        try {
            loginSchema.parse(formData);
            setErrors({ email: "", password: "" });
            await signIn("credentials", {
                callbackUrl: "/",
                email: formData.email,
                password: formData.password,
            });
        } catch (err) {
            if (err instanceof z.ZodError) {
                const fieldErrors = err.errors.reduce((acc, curr) => {
                    acc[curr.path[0]] = curr.message;
                    return acc;
                }, {});
                setErrors(fieldErrors);
            }
        } finally {
            setLoading(false); // Set loading to false
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <form
                onSubmit={handleSubmit}
                className="bg-[#214207] p-4 rounded-md text-white"
            >
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center gap-2">
                        <Link href="/" className="flex flex-col items-center gap-2 font-medium">
                            <div className="flex h-8 w-8 items-center justify-center rounded-md">
                                <GalleryVerticalEnd className="size-6" />
                            </div>
                            <span className="sr-only">Acme Inc.</span>
                        </Link>
                        <h1 className="text-xl font-bold">Welcome to Acme Inc.</h1>
                        <div className="text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <Link href="/auth/signup" className="underline underline-offset-4">
                                Sign up
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                                value={formData.email}
                                onChange={handleInputChange}
                                disabled={loading} // Disable input during loading
                                className={cn(errors.email && "border-red-500", "bg-[#214207] text-white")}
                            />
                            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                        </div>
                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="********"
                                required
                                value={formData.password}
                                onChange={handleInputChange}
                                disabled={loading} // Disable input during loading
                                className={cn(errors.password && "border-red-500", "bg-[#214207] text-white")}
                            />
                            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                            <div className="flex items-center gap-2">
                                <Link href="/password-reset" className="text-sm text-gray-500 hover:text-gray-700">
                                    Forgot Password?
                                </Link>
                            </div>
                        </div>
                        <Button
                            type="submit"
                            disabled={loading} // Disable button during loading
                            className={cn("w-full bg-[#214207] hover:bg-[#294613] text-white", {
                                "opacity-50": loading, // Add visual indication of loading
                            })}
                        >
                            {loading ? "Signing In..." : "Sign In"}
                        </Button>
                    </div>
                    <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                        <span className="relative z-10 bg-[#214207] text-white px-2 text-muted-foreground">
                            Or
                        </span>
                    </div>
                    <div className="w-full">
                        <Button
                            variant="outline"
                            className="w-full bg-[#214207] text-white"
                            onClick={() => {
                                setLoading(true);
                                signIn("google", { callbackUrl: "/" }).finally(() =>
                                    setLoading(false)
                                );
                            }}
                            disabled={loading} // Disable button during loading
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path
                                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                    fill="currentColor"
                                />
                            </svg>
                            Continue with Google
                        </Button>
                    </div>
                </div>
            </form>
            <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                By clicking continue, you agree to our{" "}
                <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
            </div>
        </div>
    );
}
