"use client";
import { useState } from "react";
import Image from "next/image";
import coffee from "@/public/coffee.jpeg";


export default function AppointmentForm({ onChange, loading }) {
    const now = new Date();
    const currentHour = now.getHours();
    const minDate = now.toISOString().split("T")[0];
    
    const [selectedDate, setSelectedDate] = useState(minDate);
    
    // Determine available times based on selected date
    let startHour = 8;
    let endHour = 18; // Last available time is 6 PM
    
    if (selectedDate === minDate) {
        startHour = Math.max(currentHour + 1, 8); // Ensure at least 1 hour gap, min 8 AM
        if (currentHour >= 18) {
            startHour = 8; // Reset to 8 AM for the next day
        }
    }
    
    const timeOptions = Array.from({ length: endHour - startHour + 1 }, (_, i) => {
        const hour = startHour + i;
        const period = hour < 12 ? "AM" : "PM";
        const formattedHour = hour > 12 ? hour - 12 : hour;
        return `${formattedHour.toString().padStart(2, "0")}:00 ${period}`;
    });

    return (
        <div>
            <h2 className="text-2xl font-semibold text-white mb-4 text-center">Book an Appointment</h2>
            <form className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        disabled={loading}
                        required
                        onChange={(e) => onChange("name", e.target.value)}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            disabled={loading}
                            required
                            onChange={(e) => onChange("email", e.target.value)}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-white">Phone</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            disabled={loading}
                            required
                            onChange={(e) => onChange("phone", e.target.value)}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-white">Date</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            required
                            min={minDate} // Restrict past dates
                            onChange={(e) => {
                                setSelectedDate(e.target.value);
                                onChange("date", e.target.value);
                            }}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label htmlFor="time" className="block text-sm font-medium text-white">Time</label>
                        <select
                            id="time"
                            name="time"
                            required
                            onChange={(e) => onChange("time", e.target.value)}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            <option value="">Select a time</option>
                            {timeOptions.map((time) => (
                                <option key={time} value={time}>{time}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        rows={5}
                        disabled={loading}
                        onChange={(e) => onChange("message", e.target.value)}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>
            </form>
            <Image
                src={coffee}
                alt="Victoria Hair Braiding & Weaving Center"
                // width={200}
                // height={200}
                className="w-full h-80 object-cover rounded-lg"
            />
            <p className="text-white text-xl font-bold">we give complementary coffee and snacks</p>
        </div>
    );
}