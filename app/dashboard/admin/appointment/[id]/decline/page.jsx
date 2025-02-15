"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ProgressBar } from "react-loader-spinner";


export default function Page() {
    const [reason, setReason] = useState("");
    const [response, setResponse] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const pathname = usePathname();
    const segments = pathname.split("/");
    const appointmentId = segments[segments.length - 2];

    const handleDecline = async () => {
        if (!reason.trim()) {
            alert("Please provide a reason before declining.");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(`/api/appointment/${appointmentId}/decline`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ reason }),
            });

            if (!res.ok) {
                const data = await res.json();
                setError(data.error);
                return;
            }

            setResponse(data.message);
            setTimeout(() => {
                router.push("/dashboard/admin/bookings");
            }, 2000);
        } catch (error) {
            setError("Failed to decline appointment");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-semibold mb-4 text-center">
                    Decline Appointment
                </h1>
                <textarea
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your reason..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows={4}
                />
                {response && (
                    <p className="text-lg text-green-600 mt-4">{response}</p>
                )}
                {error && (
                    <p className="text-sm text-red-600 mt-2">{error}</p>
                )}
                <button
                    className="w-full mt-4 px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg disabled:bg-gray-400"
                    onClick={handleDecline}
                    disabled={loading}
                >
                    {loading ? (
                        <ProgressBar
                        visible={true}
                        height="30"
                        width="30"
                        color="#ffffff"
                        ariaLabel="progress-bar-loading"
                        wrapperStyle={{ display: "inline-block" }}
                        />
                    ) : (
                        "Decline"
                    )}
                </button>
            </div>
        </div>
    );
}
