"use client";
import { useState } from "react";
// import CountrySelector from "./address-form";
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        console.log(serviceDetails);
    };
    return (
        <div className="max-w-screen-lg mx-auto bg-[#214207] p-4 my-20">
            <AppointMentForm onChange={handleChange} />
            <AddressForm onChange={handleChange} />
            <AppointMentService setServiceDetails={setServiceDetails}/>
            <div className="flex justify-center my-5">
                <Button className="bg-green-950 hover:bg-green-900 px-20 py-4 text-xl font-bold" onClick={handleSubmit}>Submit</Button>
            </div>
        </div>
    )
}