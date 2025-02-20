"use client";
import { useState } from "react";
import AppointMentService from "./appiontment-service";
import AppointMentForm from "./appointment-form";
import { Button } from "@/components/ui/button";

export default function Page() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        message: "",
    });
    const [loading, setLoading] = useState(false)
    const [serviceDetails, setServiceDetails] = useState([]);

    const handleChange = (field, value) => {
        setFormData(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true)
        try {
            if (!formData.name || !formData.email || !formData.phone || !formData.date || !formData.time || !formData.message) {
                alert("Please fill in all required fields");
                return;
            }
    
            if (serviceDetails.length === 0) {
                alert("Please select at least one service");
                return;
            }
            const response = await fetch('/api/appointment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...formData, services: serviceDetails })
            });
            if (!response.ok) {
                const errorData = await response.json();
                alert(errorData.error || "An unknown error occurred.");
                return;
            }
            const data = await response.json();
            alert(data.message);
            setFormData({
                name: "",
                email: "",
                phone: "",
                date: "",
                time: "",
                message: "",
            });
        } catch (error) {
            console.error(error);
            alert("An error occurred. Please try again.");
        } finally {
            setLoading(false)
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