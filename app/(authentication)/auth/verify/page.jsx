"use client";

import { useState, useEffect } from "react";
import { FaRegPaperPlane } from "react-icons/fa";
import { FaCheckDouble } from "react-icons/fa6";
import { IoWarningOutline } from "react-icons/io5";
import { InputOTPForm } from "./otp";
import { EmailVerification } from "@/actions/auth-email-verify";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function Page() {
    const [message, setMessage] = useState("");
    const [isResending, setIsResending] = useState(false);
    const [timer, setTimer] = useState(30);
    const [email, setEmail] = useState("");
    const router = useRouter();

    useEffect(() => {
        const storedEmail = localStorage.getItem("email");
        if (storedEmail) {
            setEmail(storedEmail);
        } else {
            router.push("/auth/signup");
        }
    }, [router]);

    const handleResend = async () => {
        if (isResending) return;
        if (!email) {
            router.push("/auth/signup");
            return;
        } else {
            setIsResending(true);
            setMessage("Resending email...");

            const sent = await EmailVerification({ email, password: "" });
            if (!sent) {
                setMessage("Email not sent");
                setIsResending(false);
                return;
            }

            setTimeout(() => {
                setMessage("Email sent successfully");
                setIsResending(false);
            }, 2000);
        }
    };

    useEffect(() => {
        if (!isResending) return;

        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setIsResending(false);
                    return 30;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isResending]);

    useEffect(() => {
        if (message === "Email sent successfully") {
            const timerId = setTimeout(() => {
                setMessage("");
            }, 10000);

            return () => clearTimeout(timerId);
        }
    }, [message]);

    return (
        <div className="bg-gradient-to-br from-[rgb(2,248,1)] to-[rgb(248,248,0)] flex items-center justify-center min-h-screen bg-gray-100">
            <div className="flex bg-[#214207] text-white rounded-lg items-center justify-center p-4 shadow-md">
                <div>
                    <div className="flex justify-center">
                        <InputOTPForm setMessage={setMessage}/>
                    </div>

                    {message === "Email sent successfully" && (
                        <div className="mt-5 flex items-center gap-2 bg-teal-800 text-white justify-center p-2 rounded-lg">
                            <FaCheckDouble />
                            <span className="text-sm">{message}</span>
                        </div>
                    )}
                    {message === "Email not sent" && (
                        <div className="mt-5 flex items-center gap-2 bg-red-800 text-white justify-center p-2 rounded-lg">
                            <IoWarningOutline />
                            <span className="text-sm">{message}</span>
                        </div>
                    )}

                    <div className="flex justify-center gap-4 items-center mt-5">
                        <button
                            className="text-sm flex items-center font-medium text-white bg-[#19370f] shadow-lg rounded-md px-6 py-3"
                            onClick={handleResend}
                            disabled={isResending}
                        >
                            {isResending ? (
                                <>Resend in {timer}s</>
                            ) : (
                                <>
                                    <FaRegPaperPlane className="mr-2" />
                                    Resend Email
                                </>
                            )}
                        </button>
                    </div>
                    <Link href="/auth/signup" className="flex flex-col items-center mt-5 text-gray-500 text-sm underline w-full gap-2 font-medium">
                        back to signup
                    </Link>
                </div>
            </div>
        </div>
    );
}
