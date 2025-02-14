"use client";
import { useState } from "react";
import AppointMentService from "./appiontment-service";
import AddressForm from "./address-form";
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
        street: "",
        addressLine2: "",
        city: "",
        state: "",
        postalCode: "",
        country: ""
    });
    const [serviceDetails, setServiceDetails] = useState([]);

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
        if (!formData.street || !formData.city || !formData.state || !formData.postalCode || !formData.country || !formData.addressLine2) {
            alert("Please fill in all required address fields");
            return;
        }

        if (serviceDetails.length === 0) {
            alert("Please select at least one service");
            return;
        }
        const response = await fetch('/api/appointments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...formData, services: serviceDetails })
        });
        const data = await response.json();
        alert(data.message);
        setFormData({
            name: "",
            email: "",
            phone: "",
            date: "",
            time: "",
            message: "",
            street: "",
            addressLine2: "",
            city: "",
            state: "",
            postalCode: "",
            country: ""
        });


        console.log(formData)
        console.log(serviceDetails)
    };
    return (
        <div className="max-w-screen-lg mx-auto bg-[#214207] p-4 my-10">
            <AppointMentForm onChange={handleChange} />
            <AddressForm onChange={handleChange} />
            <AppointMentService setServiceDetails={setServiceDetails}/>
            <div className="flex justify-center my-5">
                <Button className="bg-green-950 hover:bg-green-900 px-20 py-4 text-xl font-bold" onClick={handleSubmit}>Submit</Button>
            </div>
        </div>
    )
}