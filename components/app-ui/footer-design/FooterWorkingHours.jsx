import { PhoneCall, MapPin, CalendarClock } from "lucide-react";


export default function FooterWorkingHours() {
    return (
        <section className="bg-[#214207] p-10">
            <div className="flex justify-center flex-col md:flex-row gap-16 items-start text-white flex-wrap">
                <div className="flex gap-3">
                    <PhoneCall size={42} className="text-white"/>
                    <div>
                        <h2 className="uppercase font-medium tracking-widest text-base mb-2">HAVE QUESTION?</h2>
                        <p className="text-sm">Call Us at <span>704-713-8472</span></p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <MapPin size={42} className="text-white"/>
                    <div>
                        <h2 className="uppercase font-medium tracking-widest text-base mb-2">LOCATED IN</h2>
                        <p className="text-sm">Visit our location at <span>123 Maple Street, Toronto, ON</span></p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <CalendarClock size={42} className="text-white"/>
                    <div>
                        <h2 className="uppercase font-medium tracking-widest text-base mb-2">business hours</h2>
                        <p className="text-sm">Monday - Saturday: <span>8:00 AM - 6:00 PM</span></p>
                        <p className="text-sm">Sunday: <span>Closed</span></p>
                    </div>
                </div>
            </div>
        </section>
    )
}