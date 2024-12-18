import Image from "next/image";
import Image1 from "@/public/country-size-girl.jpg";
import Image2 from "@/public/cute-1.jpg";
import Image3 from "@/public/eye-lashes-section.jpg";
import Image4 from "@/public/image.jpg";
import Image5 from "@/public/skincare-girl.jpg";


export default function FooterImage() {
    return (
        <section className="flex gap-1 px-20">
            <div className="h-52 w-96 relative">
                <Image
                    src={Image1}
                    alt="country size girl"
                    fill={true}
                    className="object-cover"
                    priority
                />
            </div>
            <div className="h-52 w-96 relative">
                <Image
                    src={Image2}
                    alt="cute 1"
                    fill={true}
                    className="object-cover"
                    priority
                />
            </div>
            <div className="h-52 w-96 relative">
                <Image
                    src={Image3}
                    alt="eye lashes section"
                    fill={true}
                    className="object-cover"
                    priority
                />
            </div>
            <div className="h-52 w-96 relative">
                <Image
                    src={Image4}
                    alt="image"
                    fill={true}
                    className="object-cover"
                    priority
                />
            </div>
            <div className="h-52 w-96 relative">
                <Image
                    src={Image5}
                    alt="skincare girl"
                    fill={true}
                    className="object-cover"
                    priority
                />
            </div>
        </section>
    )
}