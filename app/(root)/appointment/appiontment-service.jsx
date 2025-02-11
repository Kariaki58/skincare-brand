// import { useState } from 'react';

export default function AppointMentService({ setServiceDetails }) {
    const services = [
        { id: 1, name: "Goddess Braids", price: 50 },
        { id: 2, name: "Box Braids", price: 100 },
        { id: 3, name: "Natural Braids", price: 75 },
        { id: 4, name: "Cornrows", price: 25 },
        { id: 5, name: "Twists", price: 50 },
        { id: 6, name: "Weave", price: 150 },
        { id: 7, name: "Extensions", price: 200 },
        { id: 8, name: "Wash & Style", price: 30 },
        { id: 9, name: "Updo", price: 50 },
        { id: 10, name: "Haircut", price: 25 },
    ];

    const handleServiceSelection = (event, service) => {
        if (event.target.checked) {
            setServiceDetails(prevDetails => [...prevDetails, service]);
        } else {
            setServiceDetails(prevDetails => prevDetails.filter(item => item.id !== service.id));
        }
    };

    return (
        <div>
            <h1 className="text-center my-6 text-2xl font-semibold text-white">Victoria Hair Braiding Styles</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {services.map((service) => (
                    <div key={service.id} className="flex items-center gap-4 bg-[#214207] text-white shadow-xl rounded-xl p-6 transition-transform transform hover:scale-105 hover:shadow-xl">
                        <input
                            type="checkbox"
                            className="w-8 h-8 text-[#214207] focus:ring-2 focus:ring-[#214207] rounded"
                            onChange={(event) => handleServiceSelection(event, service)}
                        />
                        <div>
                            <h2 className="text-lg font-semibold text-white">{service.name}</h2>
                            <p className="text-white text-base">{service.price} USD</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
