"use client";

import useSWR from "swr";
import { Pencil, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ServiceDisplay() {
    const { data: services, error, mutate } = useSWR("/api/services", fetcher);
    const router = useRouter();
    const { toast } = useToast();
    const { data: session } = useSession();

    if (error) {
        return <div className="text-red-500 font-semibold text-center mt-20">{error.message}</div>;
    }

    const handleEdit = (id) => {
        router.push(`/dashboard/admin/appointment?serviceId=${id}`);
    };

    const handleDelete = async (id) => {
        if (session?.user?.role !== "admin") {
            router.push("/");
            return;
        }
        try {
            const response = await fetch(`/api/services/${id}?userId=${session?.user?.id}`, { method: "DELETE" });
            if (!response.ok) {
                const data = await response.json();
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: data.message,
                });
                return;
            }
            const data = await response.json();
            toast({ 
                variant: "success",
                title: "Service Deleted Successfully",
                description: data.message,
            });
            mutate(); // Re-fetch the services list after deletion
        } catch (err) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            });
        }
    };

    if (!services) {
        return <div className="text-black font-semibold text-center mt-20">Loading...</div>;
    }

    return (
        <div className="max-w-screen-lg mx-auto my-20">
            <h1 className="text-black font-bold text-center text-2xl mb-5">All Services</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {services.map((service) => (
                    <div key={service._id} className="flex items-center justify-between text-black shadow-xl rounded-xl p-6 transition-transform transform hover:scale-105 hover:shadow-xl">
                        <div>
                            <h2 className="text-lg font-semibold">{service.name}</h2>
                            <p className="text-base">From {service.price} USD</p>
                        </div>
                        <div className="flex gap-3">
                            <button className="text-blue-500 hover:text-blue-700" onClick={() => handleEdit(service._id)}>
                                <Pencil size={20} />
                            </button>
                            <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(service._id)}>
                                <Trash size={20} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
