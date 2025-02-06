"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CategoryDisplay() {
    const [servicesData, setServicesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [selectedServices, setSelectedServices] = useState([]);
    const { data: session } = useSession();

    useEffect(() => {
        const storedSelected = localStorage.getItem("selectedServices");
        if (storedSelected) {
            try {
                setSelectedServices(JSON.parse(storedSelected));
            } catch (error) {
                console.error("Error parsing selected services from localStorage", error);
            }
        }
    }, []);

    useEffect(() => {
        if (selectedServices.length > 0) {
            try {
                localStorage.setItem("selectedServices", JSON.stringify(selectedServices));
            } catch (error) {
                console.error("Error saving selected services to localStorage", error);
            }
        }
    }, [selectedServices]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/services", { method: "GET", headers: { "Content-Type": "application/json" } });
            if (!res.ok) throw new Error("Failed to fetch services");
            const data = await res.json();
            setServicesData(data);
        } catch (error) {
            console.error("Error fetching services:", error);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchData();
    }, []);

    const toggleSelection = (id) => {
        setSelectedServices((prev) => {
            if (prev.includes(id)) {
                return prev.filter((serviceId) => serviceId !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    const groupedCategories = servicesData.reduce((acc, service) => {
        const categoryName = service.categoryId.name;
        if (!acc[categoryName]) {
            acc[categoryName] = {
                _id: service.categoryId._id,
                categoryServiceName: categoryName,
                benefits: service.categoryId.subHeading,
                summary: service.categoryId.description,
                categoryServices: []
            };
        }
        acc[categoryName].categoryServices.push({
            _id: service._id,
            title: service.name,
            about: service.description,
            image: service.image,
            duration: `${service.duration}mins`,
            price: `$${service.price}`
        });
        return acc;
    }, {});

    const handleEdit = (categoryId, type) => {
        router.push(`/admin/categories/edit/${categoryId}`)
    };
    

    const categoryService = Object.values(groupedCategories);

    return (
        <section className="max-w-screen-xl px-10 mx-auto text-black">
            {loading ? (
                <div className="text-center text-xl font-semibold mt-10">Loading services...</div>
            ) : (
                categoryService.map((category, categoryIndex) => (
                    <div key={categoryIndex} className="mb-16">
                        <h2 className="text-5xl font-light uppercase mb-4">{category.categoryServiceName}</h2>
                        <h4 className="text-[16px] font-bold uppercase mb-4">{category.benefits}</h4>
                        <summary className="leading-[30px] text-[15px] list-none mb-10 max-w-screen-lg">{category.summary}</summary>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {category.categoryServices.map((service, serviceIndex) => (
                                <div key={serviceIndex} className="relative">
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-96 object-cover shadow-xl"
                                        width={300}
                                        height={300}
                                        priority
                                    />
                                    {
                                        session?.user?.role === "admin" ? (
                                            <div className="flex absolute top-0 right-0 gap-2 text-white bg-black p-3">
                                                <FaEdit size={24} className="cursor-pointer"
                                                    onClick={() => handleEdit(category._id, "category")}
                                                />
                                                <MdDeleteForever size={24} className="cursor-pointer" onClick={() => handleCategoryDelete(category._id)}/>
                                            </div>
                                        ) : <>
                                        <div className="flex absolute top-80 left-1/2 transform -translate-x-1/2 z-50 items-center justify-center right-0 gap-2">
                                        <Button 
                                            onClick={() => toggleSelection(service._id)}
                                            className={`flex items-center gap-4 px-4 py-2 rounded-sm ${selectedServices.includes(service._id) ? 'bg-green-600' : 'bg-black/80 hover:bg-black/90'}`}
                                        >
                                            {selectedServices.includes(service._id) ? <X size={16} /> : <Plus size={16} />}
                                            <span>{selectedServices.includes(service._id) ? "SELECTED" : "SELECT"}</span>
                                        </Button>
                                    </div>
                                        </>
                                    }
                                    
                                    <div className="pt-5">
                                        <h3 className="text-[25px] font-medium mb-2">{service.title}</h3>
                                        <div className="flex justify-between items-center text-xl my-2">
                                            <p className="text-lg">Duration - {service.duration}</p>
                                            <p className="text-lg">Price - {service.price}</p>
                                        </div>
                                        <p className="leading-[30px] text-[15px]">{service.about}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}
            {selectedServices.length > 0 && session?.user?.role !== "admin" ? (
                <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50">
                    <Link href="/services/booking/confirmed" className="bg-black/70 text-white px-10 py-5 rounded-full shadow-lg hover:bg-[#1b3606]">
                        Proceed
                    </Link>
                </div>
            ):<></>}
        </section>
    );
}
