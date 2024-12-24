import Link from "next/link";
import Image from "next/image";
import serviceImage1 from "@/public/services-image/service-image-1.jpg";
import serviceImage2 from "@/public/services-image/service-image-2.jpg";
import serviceImage3 from "@/public/services-image/service-image-3.jpeg";
import serviceImage4 from "@/public/services-image/service-image-4.jpeg";
import serviceImage5 from "@/public/services-image/service-image-5.jpg";
import serviceImage6 from "@/public/services-image/service-image-6.jpg";
import ClientShowCase from "../ClientShowCase";

export default function CategoryDisplay() {
    const categoryService = [
        {
            categoryServiceName: "Skin Treatments",
            benefits: "Enhance your skin health and glow with our tailored treatments.",
            summary: "Our skin treatments are designed to address a variety of skin concerns, from acne to aging. With expert care and advanced techniques, we aim to rejuvenate your skin, leaving it radiant and refreshed.",
            categoryServices: [
                {
                    title: "Skincare Consultation",
                    about: "Personalized skincare solutions tailored to your unique skin type.",
                    image: serviceImage1,
                },
                {
                    title: "Facials and Peels",
                    about: "Gentle exfoliation and nourishment for a youthful, healthy complexion.",
                    image: serviceImage2,
                },
                {
                    title: "Microdermabrasion",
                    about: "Smooth and refine your skin's texture with this advanced treatment.",
                    image: serviceImage3,
                },
            ],
        },
        {
            categoryServiceName: "Beauty Services",
            benefits: "Enhance your natural beauty with expert techniques and high-quality products.",
            summary: "Our beauty services cater to all your aesthetic needs, ensuring you look and feel your best. From stunning eyelash extensions to flawless makeup, we bring out your inner confidence.",
            categoryServices: [
                {
                    title: "Eyelash Extensions",
                    about: "Achieve a fuller, more dramatic lash look with our expert application.",
                    image: serviceImage4,
                },
                {
                    title: "Waxing and Laser Removal",
                    about: "Smooth, hair-free skin with minimal discomfort and long-lasting results.",
                    image: serviceImage5,
                },
                {
                    title: "Makeup and Hair",
                    about: "Perfect your look for any occasion with our professional artists.",
                    image: serviceImage6,
                },
            ],
        },
    ];

    return (
        <section className="max-w-screen-xl px-10 mx-auto text-gray-800">
            {categoryService.map((category, index) => (
                <div key={index} className="mb-16">
                    <h2 className="text-4xl font-light text-gray-700 uppercase mb-4">{category.categoryServiceName}</h2>
                    <h4 className="text-xl font-bold text-[#A7948B] mb-4">{category.benefits}</h4>
                    <summary className="text-gray-600 mb-8 leading-relaxed pr-32">{category.summary}</summary>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {category.categoryServices.map((service, index) => (
                            <div
                                key={index}
                                className="overflow-hidden"
                            >
                                <Link href={`/services/${service.title}`}>
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
                                    <h3 className="text-2xl tracking-widest font-medium mb-2 text-[#A7948B]">{service.title}</h3>
                                    <p className="text-gray-600 mb-4">{service.about}</p>
                                    <Link
                                        href={`/services/${service.title.replace(/ /g, '-').toLowerCase()}`}
                                        className="uppercase bg-transparent border border-black outline-black rounded-none text-gray-900 px-10 py-3 bg-white hover:bg-gray-200 inline-block text-sm mt-3"
                                    >
                                        View More Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            <ClientShowCase />
        </section>
    );
}
