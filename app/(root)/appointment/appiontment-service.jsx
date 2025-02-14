"use client";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function AppointmentService({ setServiceDetails }) {
    const { data: services, error } = useSWR("/api/services", fetcher);

    const handleServiceSelection = (event, service) => {
        if (event.target.checked) {
            setServiceDetails(prevDetails => [...prevDetails, service]);
        } else {
            setServiceDetails(prevDetails => prevDetails.filter(item => item.id !== service.id));
        }
    };

    if (error) return <div className="text-red-500">Failed to load services</div>;
    if (!services) return <div className="text-white text-center font-bold text-lg mt-5">Loading Services...</div>;

    return (
        <div>
            <h1 className="text-center my-6 text-2xl font-semibold text-white">Victoria Hair Braiding Styles</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {services.map((service) => (
                    <div key={service._id} className="flex items-center gap-4 bg-[#214207] text-white shadow-xl rounded-xl p-6 transition-transform transform hover:scale-105 hover:shadow-xl">
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
