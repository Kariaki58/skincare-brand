"use client"
import useSWR from "swr";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ServiceAdd() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const searchParams = useSearchParams();
    const [error, setError] = useState("");
    const { toast } = useToast();
    const router = useRouter();
    const serviceId = searchParams.get("serviceId");
    const { mutate } = useSWR("/api/services", fetcher);
    const { data: session } = useSession();

    useEffect(() => {
        if (serviceId) {
            fetch(`/api/services/${serviceId}`)
                .then((res) => res.json())
                .then((data) => {
                    setName(data.name);
                    setPrice(data.price);
                    setIsEditing(true);
                }).catch((error) => {
                    setError("Service not found");
                });
        }
    }, [serviceId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (session?.user?.role !== "admin") {
                router.push("/");
                return;
            }
            const userId = session?.user?.id;
            const serviceData = { name, price: Number(price), userId };
    
            const response = await fetch(isEditing ? `/api/services/${serviceId}` : "/api/services", {
                method: isEditing ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(serviceData),
            });
    
            if (response.ok) {
                toast({
                    title: `Service ${isEditing ? "updated" : "added"} successfully!`,
                    description: "The service list has been updated.",
                });
                mutate(); // Trigger re-fetching the service list
                setName("");
                setPrice("");
                setIsEditing(false);
                if (isEditing) {
                    router.push("/dashboard/admin/appointment");
                }
            } else {
                const error = await response.json();
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: error.error,
                });
            }
        } catch (error) {

        } finally {

        }
    };
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow-lg">
            <h1 className="text-center text-xl font-bold mb-4">{isEditing ? "Update" : "Add"} Service</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2">Service Name</label>
                    <input 
                        type="text" 
                        className="w-full p-2 border rounded" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Price</label>
                    <input 
                        type="number" 
                        className="w-full p-2 border rounded" 
                        value={price} 
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                    {isEditing ? "Update" : "Add"} Service
                </button>
            </form>
        </div>
    );
}
