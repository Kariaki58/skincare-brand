"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import SlotTimeDisplay from "@/app/(root)/book/slots/slot-time-display";

import serviceImage1 from "@/public/services-image/service-image-1.jpg";
import serviceImage2 from "@/public/services-image/service-image-2.jpg";
import serviceImage3 from "@/public/services-image/service-image-3.jpeg";
import serviceImage4 from "@/public/services-image/service-image-4.jpeg";
import serviceImage5 from "@/public/services-image/service-image-5.jpg";
import serviceImage6 from "@/public/services-image/service-image-6.jpg";

const categoryService = [
    {
        categoryServiceName: "Skin Treatments",
        benefits: "Enhance your skin health and glow with our tailored treatments.",
        summary:
            "Our skin treatments are designed to address a variety of skin concerns, from acne to aging. With expert care and advanced techniques, we aim to rejuvenate your skin, leaving it radiant and refreshed.",
        categoryServices: [
            {
                title: "Skincare Consultation",
                about: "Personalized skincare solutions tailored to your unique skin type.",
                image: serviceImage1,
                booked: false,
            },
            {
                title: "Facials and Peels",
                about: "Gentle exfoliation and nourishment for a youthful, healthy complexion.",
                image: serviceImage2,
                booked: false,
            },
            {
                title: "Microdermabrasion",
                about: "Smooth and refine your skin's texture with this advanced treatment.",
                image: serviceImage3,
                booked: false,
            },
        ],
    },
    {
        categoryServiceName: "Beauty Services",
        benefits: "Enhance your natural beauty with expert techniques and high-quality products.",
        summary:
            "Our beauty services cater to all your aesthetic needs, ensuring you look and feel your best. From stunning eyelash extensions to flawless makeup, we bring out your inner confidence.",
        categoryServices: [
            {
                title: "Eyelash Extensions",
                about: "Achieve a fuller, more dramatic lash look with our expert application.",
                image: serviceImage4,
                booked: false,
            },
            {
                title: "Waxing and Laser Removal",
                about: "Smooth, hair-free skin with minimal discomfort and long-lasting results.",
                image: serviceImage5,
                booked: false,
            },
            {
                title: "Makeup and Hair",
                about: "Perfect your look for any occasion with our professional artists.",
                image: serviceImage6,
                booked: false,
            },
        ],
    },
];

export default function CategoryDisplay() {
    const [openDrawer, setOpenDrawer] = useState(null);

    const handleDrawerOpen = (index) => setOpenDrawer(index);
    const handleDrawerClose = () => setOpenDrawer(null);

    return (
        <section className="max-w-screen-xl px-10 mx-auto text-gray-800">
            {categoryService.map((category, categoryIndex) => (
                <div key={categoryIndex} className="mb-16">
                    <h2 className="text-5xl font-light text-gray-700 uppercase mb-4">{category.categoryServiceName}</h2>
                    <h4 className="text-[16px] font-bold text-[#A7948B] mb-4 uppercase">{category.benefits}</h4>
                    <summary className="leading-[30px] text-[#2D2D2D] text-[15px] list-none mb-10 max-w-screen-lg">
                        {category.summary}
                    </summary>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {category.categoryServices.map((service, serviceIndex) => (
                            <div key={serviceIndex} className="overflow-hidden">
                                <Link href={`/services/${service.title.replace(/\s+/g, "-").toLowerCase()}`}>
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-96 object-cover shadow-xl"
                                        width={300}
                                        height={300}
                                        priority
                                    />
                                </Link>
                                <div className="pt-5">
                                    <h3 className="text-[25px] font-medium mb-2 text-[#A7948B]">{service.title}</h3>
                                    <p className="leading-[30px] text-[#2D2D2D] text-[15px]">{service.about}</p>
                                    <Button
                                        className="flex mt-2"
                                        onClick={() => handleDrawerOpen(`${categoryIndex}-${serviceIndex}`)}
                                    >
                                        <Plus size={16} />
                                        <span>SELECT</span>
                                    </Button>
                                    <Drawer className="p-4 h-16 overflow-y-auto shadow-lg" open={openDrawer === `${categoryIndex}-${serviceIndex}`} onClose={handleDrawerClose}>
                                        <DrawerContent className="pb-10">
                                            <DrawerHeader>
                                                <DrawerTitle>
                                                    <div className="shadow-lg p-5 flex justify-center">

                                                        <div className="flex items-center justify-center gap-10 mb-3">
                                                            <p>{service.title}</p>
                                                            <X size={25} className="hover:cursor-pointer"/>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-center items-center gap-2 border-t pt-5">
                                                        <Button>
                                                            <Plus size={25} className="text-green-700 hover:cursor-pointer"/>
                                                            <p>Add Services</p>
                                                        </Button>
                                                    </div>                                                  
                                                </DrawerTitle>
                                                <DrawerDescription>Select your desired date and time slot below:</DrawerDescription>
                                            </DrawerHeader>
                                            <SlotTimeDisplay />
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
