"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import {
    Drawer,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import SlotTimeDisplay from "../booking/services/slot-time-display";
import ProceedLink from "../booking/ProceedLink";
import { useSession } from "next-auth/react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useRouter } from "next/navigation";


export default function CategoryDisplay() {

    const [openDrawer, setOpenDrawer] = useState(null);
    const [servicesData, setServicesData] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();
    const { data: session } = useSession();


    const fetchData = async () => {
        try {
            const res = await fetch("/api/services", 
                { method: "GET", headers: { "Content-Type": "application/json" } }
            );
            if (!res.ok) throw new Error("Failed to fetch services");
            const data = await res.json();
    
            setServicesData(data);
        } catch (error) {
            console.error("Error fetching services:", error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

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
            price: `$${service.price}`,
            select: false
        });
        return acc;
    }, {});

    const categoryService = Object.values(groupedCategories);

    const handleDrawerOpen = (cid, siv) => {
        const index = `${cid}-${siv}`;
        const serviceSelected = categoryService[cid].categoryServices[siv];
        handleServiceSelect(serviceSelected)
        setOpenDrawer(index);
    }
    const handleDrawerClose = () => setOpenDrawer(null);

    const handleServiceSelect = (service) => {
        if (!selectedServices.includes(service)) {
            setSelectedServices([...selectedServices, service]);
        }
    };

    const handleServiceRemove = (service) => {
        setSelectedServices(selectedServices.filter((item) => item !== service));
    };

    const handleSearch = (e) => setSearchTerm(e.target.value);

    const handleEdit = async (id, option) => {
        router.push(`/dashboard/admin/services/edit/${id}/${option}`);
    }

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this service?")) return;
        try {
            const res = await fetch(`/api/services/${id}`, {
                method: "DELETE",
                body: JSON.stringify({ userId: session?.user?.id }),
                headers: { "Content-Type": "application/json" },
            });
            if (!res.ok) throw new Error("Failed to delete service");
            fetchData();
        } catch (error) {
            console.error("Error deleting service:", error);
        }
    }
    const handleCategoryDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this category?")) return;
        try {
            const res = await fetch(`/api/services/category/${id}`, {
                method: "DELETE",
                body: JSON.stringify({ userId: session?.user?.id }),
                headers: { "Content-Type": "application/json" },
            });
            if (!res.ok) throw new Error("Failed to delete category");
            fetchData();
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    }

    const filteredServices = categoryService
        .flatMap((category) => category.categoryServices)
        .filter((service) =>
            service.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return (
            <section className="max-w-screen-xl px-10 mx-auto text-black">
                {categoryService.map((category, categoryIndex) => (
                    <div key={categoryIndex} className="mb-16">
                        <div className="flex justify-between items-center gap-4">
                            <div>
                                <h2 className="text-5xl font-light text-black uppercase mb-4">{category.categoryServiceName}</h2>
                                <h4 className="text-[16px] font-bold text-black mb-4 uppercase">{category.benefits}</h4>
                            </div>
                            {
                                session?.user?.role === "admin" ? (
                                    <div className="flex gap-2 text-white bg-black p-3">
                                        <FaEdit size={24} className="cursor-pointer"
                                            onClick={() => handleEdit(category._id, "category")}
                                        />
                                        <MdDeleteForever size={24} className="cursor-pointer" onClick={() => handleCategoryDelete(category._id)}/>
                                    </div>
                                ) : <></>
                            }
                            
                            
                        </div>
                        <summary className="leading-[30px] text-black text-[15px] list-none mb-10 max-w-screen-lg">
                            {category.summary}
                        </summary>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {category.categoryServices.map((service, serviceIndex) => (
                                <div key={serviceIndex} className="overflow-hidden">
                                    <div className="relative">
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
                                                <div className="absolute top-0 bg-black text-white right-0 cursor-pointer flex gap-4 p-3">
                                                    <FaEdit size={24} className="cursor-pointer"
                                                        onClick={() => handleEdit(service._id, "service")}
                                                    />
                                                    <MdDeleteForever size={24} className="cursor-pointer" onClick={() => handleDelete(service._id)}/>
                                                </div>
                                            ): <></>
                                        }
                                    </div>
                                    <div className="pt-5">
                                        <h3 className="text-[25px] font-medium mb-2 text-black">{service.title}</h3>
                                        <div className="flex justify-between items-center text-xl my-2">
                                            <p className="text-black text-lg">Duration - {service.duration}</p>
                                            <p className="text-black text-lg">Price - {service.price}</p>
                                        </div>
                                        <p className="leading-[30px] text-black text-[15px]">{service.about}</p>
                                        {
                                            session ? (
                                                <></>
                                            ): (
                                                <div
                                                    className="flex justify-center items-center mt-4"
                                                    onClick={() => handleDrawerOpen(categoryIndex, serviceIndex)}
                                                >
                                                    <Button className="flex items-center gap-4 bg-[#214207]">
                                                        <Plus size={16} />
                                                        <span>SELECT</span>
                                                    </Button>
                                                </div>
                                            )
                                        }
                                        <Drawer
                                            className="h-[60vh] p-4 overflow-y-auto shadow-lg bg-[#214207]"
                                            open={openDrawer === `${categoryIndex}-${serviceIndex}`}
                                            onClose={handleDrawerClose}
                                        >
                                            <DrawerContent className="h-[90vh] pb-">
                                                <DrawerHeader className="scrollbar-none md:scrollbar-thin overflow-y-auto">
                                                <DrawerTitle>
                                                    <div className="max-w-xl mx-auto shadow-md p-4 rounded-lg">
                                                        {selectedServices.length > 0 && (
                                                            <div className="mt-4">
                                                                <h4 className="text-lg font-semibold mb-4">Selected Services:</h4>
                                                                <ul className="space-y-2">
                                                                    {selectedServices.map((selectedService, index) => (
                                                                        <li key={index} className="flex justify-between items-center gap-4">
                                                                            <div className="flex items-center gap-4">
                                                                                <Image
                                                                                    src={selectedService.image}
                                                                                    alt={selectedService.title}
                                                                                    className="w-12 h-12 object-cover rounded"
                                                                                    width={48}
                                                                                    height={48}
                                                                                />
                                                                                <p className="font-thin text-base">{selectedService.title} ({selectedService.duration}) ({selectedService.price})</p>
                                                                            </div>
                                                                            <X
                                                                                size={20}
                                                                                className="cursor-pointer text-red-500"
                                                                                onClick={() => handleServiceRemove(selectedService)}
                                                                            />
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        )}
                                                    </div>
                                                </DrawerTitle>
                                                    <div className="border-t pt-2">
                                                        <Sheet>
                                                            <SheetTrigger className="flex items-center justify-center max-w-md mx-auto my-4">
                                                                <div className="flex items-center gap-2 bg-[#214207] hover:bg-[#2b4715] text-white py-2 px-6 rounded-lg">
                                                                    <Plus size={25} className="hover:cursor-pointer" />
                                                                    <p>Add Services</p>
                                                                </div>
                                                            </SheetTrigger>
                                                            <SheetContent>
                                                                <SheetHeader>
                                                                    <SheetTitle>Manage Services</SheetTitle>
                                                                    <SheetDescription>
                                                                        Use the search bar to filter services. Select to add or click the X icon to remove services.
                                                                    </SheetDescription>
                                                                    <input
                                                                        type="text"
                                                                        placeholder="Search services..."
                                                                        value={searchTerm}
                                                                        onChange={handleSearch}
                                                                        className="mt-4 w-full px-4 py-2 border rounded-lg"
                                                                    />
                                                                </SheetHeader>
                                                                <div className="mt-4 space-y-4">
                                                                    {filteredServices.map((service, index) => (
                                                                        <div key={index} className="flex justify-between items-center border-b pb-2 gap-4">
                                                                            <div className="flex items-center gap-4">
                                                                                <Image
                                                                                    src={service.image}
                                                                                    alt={service.title}
                                                                                    className="w-12 h-12 object-cover rounded"
                                                                                    width={48}
                                                                                    height={48}
                                                                                />
                                                                                <span className="text-sm">{service.title} ({service.duration}) ({service.price})</span>
                                                                            </div>
                                                                            {selectedServices.includes(service) ? (
                                                                                <X
                                                                                    size={20}
                                                                                    className="cursor-pointer text-red-500"
                                                                                    onClick={() => handleServiceRemove(service)}
                                                                                />
                                                                            ) : (
                                                                                <Button onClick={() => handleServiceSelect(service)} className="bg-[#214207] hover:bg-[#2b4715]">
                                                                                    Add
                                                                                </Button>
                                                                            )}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </SheetContent>
                                                        </Sheet>
                                                    </div>
                                                    <SlotTimeDisplay />
                                                </DrawerHeader>
                                            </DrawerContent>
                                        </Drawer>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </section>
    );
}
