"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ProgressBar } from "react-loader-spinner";


export default function Page() {
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const pathname = usePathname();
    const segments = pathname.split("/");
    const appointmentId = segments[segments.length - 2];


    const handleSetAppointment = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/appointment/${appointmentId}/accept`, { method: "PUT" });
            const data = await res.json();

            if (!res.ok) {
                setError(data.error)
                return;
            }

            setResponse(data.message);
            setTimeout(() => {
                router.push("/dashboard/admin/bookings");
            }, 2000);
        } catch (error) {
            setError("Failed to set appointment");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-2xl font-bold mb-4">Set Appointment</h1>
            <p className="text-md text-gray-600 mb-4">Appointment ID: {appointmentId}</p>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                onClick={handleSetAppointment}
                disabled={loading}
            >
                Set Appointment
            </button>
            {loading && (
                <div className="mt-4">
                    <ProgressBar
                        visible={true}
                        height="80"
                        width="80"
                        color="#4fa94d"
                        ariaLabel="progress-bar-loading"
                    />
                </div>
            )}
            {response && <p className="mt-4 text-lg text-green-600">{response}</p>}
            {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        </div>
    );
}
