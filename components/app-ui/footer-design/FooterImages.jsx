import Image from "next/image";
import Image1 from "@/public/hair_braid1.jpg";
import Image2 from "@/public/hair_braid2.jpeg";
import Image3 from "@/public/hair_braid3.webp";
import Image4 from "@/public/hair_braid4.jpeg";
import Image5 from "@/public/hair_braid5.jpeg";


export default function FooterImage() {
    return (
        <section className="grid grid-cols-2 lg:grid-cols-5 gap-4 px-5">
            <div className="h-52 w-full relative">
                <Image
                    src={Image1}
                    alt="country size girl"
                    fill={true}
                    className="object-cover"
                    priority
                />
            </div>
            <div className="h-52 w-full relative">
                <Image
                    src={Image2}
                    alt="cute 1"
                    fill={true}
                    className="object-cover"
                    priority
                />
            </div>
            <div className="h-52 w-full relative">
                <Image
                    src={Image3}
                    alt="eye lashes section"
                    fill={true}
                    className="object-cover"
                    priority
                />
            </div>
            <div className="h-52 w-full relative">
                <Image
                    src={Image4}
                    alt="image"
                    fill={true}
                    className="object-cover"
                    priority
                />
            </div>
            <div className="h-52 w-full relative hidden lg:block">
                <Image
                    src={Image5}
                    alt="skincare girl"
                    fill={true}
                    className="object-cover"
                    priority
                />
            </div>
        </section>
    );
}
