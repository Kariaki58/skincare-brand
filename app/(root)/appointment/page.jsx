"use client";
import { useState } from "react";
import AppointMentService from "./appiontment-service";
import AppointMentForm from "./appointment-form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function Page() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        message: "",
    });
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [serviceDetails, setServiceDetails] = useState([]);
    const { toast } = useToast()

    const handleChange = (field, value) => {
        setFormData(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.phone || !formData.date || !formData.time || !formData.message) {
            alert("Please fill in all required fields");
            return;
        }

        if (serviceDetails.length === 0) {
            alert("Please select at least one service");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('/api/appointment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...formData, services: serviceDetails })
            });

            const data = await response.json();

            if (!response.ok) {
                toast({
                    title: "Booking failed",
                    description: data.error,
                    variant: "destructive",
                });
                return;
            }
            toast({
                variant: "success",
                title: "Booking placed successfully!",
                description: data.message,
            });
            alert("To secure your booking please check your email address")
            setFormData({
                name: "",
                email: "",
                phone: "",
                date: "",
                time: "",
                message: "",
            });
            setTimeout(() => {
                router.push("/")
            }, 1000)
        } catch (error) {
            toast({
                title: "Booking failed",
                description: "Failed to place booking. Please try again later.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-screen-lg mx-auto bg-[#214207] p-4 my-10">
            <AppointMentForm onChange={handleChange} loading={loading}/>
            <AppointMentService setServiceDetails={setServiceDetails}/>
            <div className="flex justify-center my-5">
                <Button className="bg-green-950 hover:bg-green-900 px-20 py-4 text-xl font-bold" disabled={loading} onClick={handleSubmit}>{loading ? "submitting..." : "Submit"}</Button>
            </div>
        </div>
    )
}