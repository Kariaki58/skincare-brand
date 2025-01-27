"use client";

import Image from "next/image";
import { useState } from "react";
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
import serviceImage1 from "@/public/services-image/service-image-1.jpg"; // Replace with actual images
import serviceImage2 from "@/public/services-image/service-image-2.jpg";
import serviceImage3 from "@/public/services-image/service-image-3.jpeg";
import serviceImage4 from "@/public/services-image/service-image-4.jpeg";
import serviceImage5 from "@/public/services-image/service-image-5.jpg";
import serviceImage6 from "@/public/services-image/service-image-6.jpg";
import ProceedLink from "../booking/ProceedLink";

const categoryService = [
    {
        categoryServiceName: "Braiding Services",
        benefits: "Expert braiding services to create stylish, long-lasting looks.",
        summary:
            "Our braiding services offer a variety of options, from classic box braids to trendy cornrows. Whether you're looking for a protective style or a bold new look, our skilled stylists will craft the perfect braids for you.",
        categoryServices: [
            {
                title: "Box Braids",
                about: "Timeless, versatile braids that can be styled in many ways.",
                image: serviceImage1,
                duration: "3 hours",
                price: "$140",
                select: false
            },
            {
                title: "Cornrows",
                about: "Intricate, close-to-the-scalp braids for a neat and durable style.",
                image: serviceImage2,
                duration: "2 hours",
                price: "$80",
                select: false
            },
            {
                title: "Knotless Braids",
                about: "A lighter, tension-free braiding technique for a comfortable fit.",
                image: serviceImage3,
                duration: "4 hours",
                price: "$160",
                select: false
            },
        ],
    },
    {
        categoryServiceName: "Hair Weaving",
        benefits: "Enhance your natural hair with high-quality weaving options.",
        summary:
            "We offer custom hair weaving services for a seamless blend with your natural hair. Whether you're seeking volume, length, or a completely new look, our stylists will ensure your weave looks natural and flawless.",
        categoryServices: [
            {
                title: "Sew-in Weave",
                about: "A sew-in weave provides a seamless, natural-looking style.",
                image: serviceImage4,
                duration: "4 hours",
                price: "$100",
                select: false
            }
        ],
    },
];

export default function CategoryDisplay() {
    const [openDrawer, setOpenDrawer] = useState(null);
    const [selectedServices, setSelectedServices] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const handleDrawerOpen = (cid, siv) => {
        console.log(cid, siv);
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

    const filteredServices = categoryService
        .flatMap((category) => category.categoryServices)
        .filter((service) =>
            service.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

    return (
        <section className="max-w-screen-xl px-10 mx-auto text-gray-800">
            {categoryService.map((category, categoryIndex) => (
                <div key={categoryIndex} className="mb-16">
                    <h2 className="text-5xl font-light text-gray-700 uppercase mb-4">{category.categoryServiceName}</h2>
                    <h4 className="text-[16px] font-bold text-[#38271F] mb-4 uppercase">{category.benefits}</h4>
                    <summary className="leading-[30px] text-[#2D2D2D] text-[15px] list-none mb-10 max-w-screen-lg">
                        {category.summary}
                    </summary>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {category.categoryServices.map((service, serviceIndex) => (
                            <div key={serviceIndex} className="overflow-hidden">
                                <div>
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-96 object-cover shadow-xl"
                                        width={300}
                                        height={300}
                                        priority
                                    />
                                </div>
                                <div className="pt-5">
                                    <h3 className="text-[25px] font-medium mb-2 text-gray-700">{service.title}</h3>
                                    <div className="flex justify-between items-center text-xl my-2">
                                        <p className="text-[#2D2D2D] text-lg">Duration - {service.duration}</p>
                                        <p className="text-[#2D2D2D] text-lg">Price - {service.price}</p>
                                    </div>
                                    <p className="leading-[30px] text-[#2D2D2D] text-[15px]">{service.about}</p>
                                    <div
                                        className="flex justify-center items-center mt-4"
                                        onClick={() => handleDrawerOpen(categoryIndex, serviceIndex)}
                                    >
                                        <Button className="flex items-center gap-4 bg-[#214207]">
                                            <Plus size={16} />
                                            <span>SELECT</span>
                                        </Button>
                                    </div>
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
