"use client";
import { useState } from "react";
import Image from "next/image";
import headerImage from "@/public/about-images/about-picture-1.jpeg";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { sendInquire } from "@/actions/sendEmail";
import { useToast } from "@/hooks/use-toast"


export default function ContactPage() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const { toast } = useToast()

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setMessage(""); 

        const formData = new FormData(event.target);
        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            message: formData.get("message"),
        };

        try {
            const message = `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Message</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f4f4f4;
                            padding: 20px;
                        }
                        .container {
                            background-color: #fff;
                            padding: 20px;
                            border-radius: 8px;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        }
                        h1 {
                            color: #333;
                        }
                        p {
                            font-size: 16px;
                            color: #555;
                        }
                        .label {
                            font-weight: bold;
                            color: #333;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>Contact Message</h1>
                        <p><span class="label">Name:</span> ${data.name}</p>
                        <p><span class="label">Email:</span> ${data.email}</p>
                        <p><span class="label">Phone:</span> ${data.phone}</p>
                        <p><span class="label">${data.message}</p>
                    </div>
                </body>
                </html>`;

            await sendInquire("Inquiry form", message);
            await fetch('/api/customer', {
                method: 'POST',
                body: JSON.stringify({name: data.name, email: data.email, phone: data.phone}),
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            toast({
                variant: "success",
                title: "Message sent successfully!",
                description: "Thank you for contacting us. We will respond shortly.",
            })
            event.target.reset();
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "Failed to send message. Please try again.",
            })
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="flex flex-col md:flex-row max-w-screen-lg mx-auto gap-10 mt-10 mb-20 px-5 sm:px-10">
            <div className="flex flex-col items-center md:w-1/2">
                <div className="w-full h-[300px] md:h-[600px] relative bg-green-300">
                    <Image
                        src={headerImage}
                        alt="Contact page image"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <div className="text-center md:text-left mt-4 md:mt-0">
                    <h1 className="text-2xl md:text-4xl uppercase text-black my-4">Visit Us in Person</h1>
                    <address className="text-lg text-black mb-2">5811 Freedom Drive, Charlotte, NC 28214</address>
                    <h3 className="text-lg text-black uppercase">MONDAY TO SATURDAY - 8 AM TO 6 PM</h3>
                </div>
            </div>
            <div className="space-y-5 md:w-1/2">
                <h1 className="uppercase text-xl md:text-2xl text-center text-black">
                    Contact Victoria Hair Braiding and Weaving Center
                </h1>
                <h3 className="uppercase text-center text-black">
                    Located at 5811 Freedom Drive, Charlotte, NC
                </h3>
                <p className="text-center text-lg text-black tracking-wider leading-relaxed">
                    Please fill out the form below & we’ll get in touch with you shortly! 
                    You can also email us directly at <span>info@victoriahairbraiding.com</span>
                </p>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <Input required name="name" className="py-4 md:py-7 bg-[#214207] text-white shadow-none" type="text" placeholder="FIRST AND LAST NAME*" />
                    </div>
                    <div>
                        <Input required name="email" className="py-4 md:py-7 bg-[#214207] text-white shadow-none" type="email" placeholder="EMAIL ADDRESS*" />
                    </div>
                    <div>
                        <Input required name="phone" className="py-4 md:py-7 bg-[#214207] text-white shadow-none" type="tel" placeholder="PHONE NUMBER*" />
                    </div>
                    <div>
                        <Textarea required name="message" className="bg-[#214207] text-white resize-none h-40 md:h-52 shadow-none" placeholder="WRITE YOUR MESSAGE*" />
                    </div>
                    <div className="flex justify-center">
                        <Button type="submit" disabled={loading} className="p-4 md:p-7 bg-[#214207] text-white hover:bg-[#1e330d]">
                            {loading ? "Sending..." : "SEND AN INQUIRY"}
                        </Button>
                    </div>
                </form>
                {message && <p className="text-center text-green-600">{message}</p>}
            </div>
        </section>
    );
}
