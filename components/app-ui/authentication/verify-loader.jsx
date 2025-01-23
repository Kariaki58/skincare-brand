"use client";
import { ThreeDots } from "react-loader-spinner";
import { CheckCheck, FileWarning, RefreshCcw } from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function VerifyLoader() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get('token');
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            setError('Token is missing');
            setLoading(false);
            return;
        }

        const verifyEmail = async () => {
            try {
                const response = await fetch(`/api/auth/verify?token=${token}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();

                if (data.error || !data.verified) {
                    throw new Error(data.error || 'Email verification failed');
                }

                setVerified(true);
                setError(null);

                await signIn('credentials', {
                    email: data.email,
                    redirect: false,
                });

                setTimeout(() => {
                    router.push('/');
                }, 2000);
            } catch (err) {
                setError(err.message);
                setVerified(false);
            } finally {
                setLoading(false);
            }
        };

        verifyEmail();
    }, [token, router]);

    return (
        <div className="flex flex-col items-center">
            {loading && (
                <ThreeDots
                    visible={true}
                    height="80"
                    width="80"
                    color="#4fa94d"
                    radius="9"
                    ariaLabel="three-dots-loading"
                />
            )}
            {error && (
                <div className="flex flex-col items-center">
                    <div className="mt-5 flex items-center justify-center gap-2 bg-red-500 text-gray-50 p-2 rounded-md">
                        <FileWarning />
                        <p className="text-md">{error}</p>
                    </div>
                    <RefreshCcw
                        className="mt-5 cursor-pointer"
                        onClick={() => window.location.reload()}
                    />
                </div>
            )}
            {verified && (
                <div className="flex items-center justify-center gap-2 mt-4 bg-emerald-500 text-gray-50 p-2 rounded-md">
                    <CheckCheck />
                    <p className="text-md">Email Verified</p>
                </div>
            )}
        </div>
    );
}
