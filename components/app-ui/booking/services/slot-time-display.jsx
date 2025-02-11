"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import DatePicker from "react-datepicker";
import Image from "next/image";
import "react-datepicker/dist/react-datepicker.css";

export default function BookingPage() {
    const [selectedServices, setSelectedServices] = useState([]);
    const [serviceDetails, setServiceDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ name: "", email: "", phone: "", additionalInfo: "" });
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedSlot, setSelectedSlot] = useState(null);
    const bookedSlots = {};
    const router = useRouter();

    useEffect(() => {
        const storedServices = JSON.parse(localStorage.getItem("selectedServices")) || [];
        setSelectedServices(storedServices);
    }, []);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                setLoading(true);
                const fetchedDetails = await Promise.all(
                    selectedServices.map(async (id) => {
                        const res = await fetch(`/api/services/${id}`);
                        if (!res.ok) throw new Error("Failed to fetch service");
                        return res.json();
                    })
                );
                setServiceDetails(fetchedDetails);
            } catch (error) {
                console.error("Error fetching services:", error);
            } finally {
                setLoading(false);
            }
        };
        if (selectedServices.length > 0) fetchServices();
    }, [selectedServices]);

    const removeService = (id) => {
        const updatedServices = selectedServices.filter(serviceId => serviceId !== id);
        setSelectedServices(updatedServices);
        localStorage.setItem("selectedServices", JSON.stringify(updatedServices));
    };

    const calculateTotalDuration = () => {
        return serviceDetails.reduce((total, service) => total + service.duration, 0);
    };

    const generateTimeSlots = () => {
        const slots = [];
        const totalDuration = calculateTotalDuration();
        let startTime = 8 * 60; // 8:00 AM in minutes
        const endTime = 18 * 60; // 6:00 PM in minutes
    
        while (startTime + totalDuration <= endTime) {
            const hours = Math.floor(startTime / 60);
            const minutes = startTime % 60;
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const displayHours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
            const displayMinutes = minutes === 0 ? '00' : minutes;
            const timeString = `${displayHours}:${displayMinutes} ${ampm}`;
            slots.push({ time: timeString, bookings: bookedSlots[selectedDate]?.[timeString] || 0 });
            startTime += 15; // Increment by 15 minutes
        }
        return slots;
    };
    

    const filteredTimeSlots = () => {
        const slots = generateTimeSlots();
        const currentTime = new Date();
        const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
        return slots.filter(slot => {
            const [hours, minutes] = slot.time.split(':');
            const slotMinutes = parseInt(hours) * 60 + parseInt(minutes);
            return slotMinutes >= currentMinutes;
        });
    };
    

    const handleBooking = async (e) => {
        e.preventDefault();
        if (!selectedSlot) return alert("Please select a time slot");
        try {
            const res = await fetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, selectedDate, selectedSlot, services: selectedServices }),
            });
            if (!res.ok) throw new Error("Booking failed");
            alert("Booking successful!");
            // router.push("/confirmation");
        } catch (error) {
            console.error("Error booking service:", error);
        }
    };

    return (
        <section className="max-w-screen-lg mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Book Your Service</h1>
            {loading ? (
                <p>Loading services...</p>
            ) : (
                <div>
                    {serviceDetails.map((service, index) => (
                        <div key={index} className="mb-4 flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-semibold">{service.name}</h2>
                                <Image src={service.image} alt={service.name} width={100} height={100} className="w-16 h-16 object-cover rounded-lg"/>
                            </div>
                            <Button className="bg-red-500 text-white px-4 py-2" onClick={() => removeService(service._id)}>Remove</Button>
                        </div>
                    ))}
                    <Button className="bg-blue-600 text-white px-4 py-2 mb-4" onClick={() => router.push("/services")}>Add Another Booking</Button>
                    <h3 className="text-xl font-semibold mt-6">Select a Date</h3>
                    <DatePicker 
                        selected={selectedDate} 
                        onChange={date => setSelectedDate(date)} 
                        onChangeRaw={(e) => e.preventDefault()}
                        className="border p-2 mt-3"
                        minDate={new Date()} 
                        dateFormat="Pp"
                    />
                    <h3 className="text-xl font-semibold mt-6">Select a Time Slot</h3>
                    <div className="grid grid-cols-4 gap-2 mt-3">
                        {filteredTimeSlots().map((slot, index) => (
                            <Button
                                key={index}
                                className={`p-2 ${selectedSlot === slot.time ? "bg-green-600" : "bg-gray-300"}`}
                                onClick={() => setSelectedSlot(slot.time)}
                            >
                                {slot.time}
                            </Button>
                        ))}
                    </div>

                    <form onSubmit={handleBooking} className="mt-6">
                        <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full p-2 border mb-2" required />
                        <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full p-2 border mb-2" required />
                        <input type="tel" placeholder="Phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full p-2 border mb-2" required />
                        <textarea placeholder="Additional Information" value={formData.additionalInfo} onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })} className="w-full p-2 border mb-2"></textarea>
                        <Button type="submit" className="bg-blue-600 text-white px-4 py-2 mt-3">Confirm Booking</Button>
                    </form>
                </div>
            )}
        </section>
    );
}