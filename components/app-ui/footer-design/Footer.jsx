import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import FooterImage from "./FooterImages";
import FooterLinks from "./FooterLinks";
import FooterWorkingHours from "./FooterWorkingHours";
import instagramIcon from "@/public/social-icons/icons8-instagram-logo.svg";
import facebookIcon from "@/public/social-icons/icons8-facebook-logo.svg";
import twitterIcon from "@/public/social-icons/icons8-x-logo.svg";
import pinterestIcon from "@/public/social-icons/icons8-pinterest-logo.svg";
import youtubeIcon from "@/public/social-icons/icons8-youtube.svg";
import linkedinIcon from "@/public/social-icons/icons8-linkedin-logo.svg";
import tiktokIcon from "@/public/social-icons/icons8-tiktok.svg";
import whatsappIcons from "@/public/social-icons/icons8-whatsapp.svg";



export default function Footer() {
    return (
        <footer>
            <FooterWorkingHours />
            <FooterImage />
            <FooterLinks />
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center max-w-screen-xl mx-auto  space-y-10 md:space-y-0 py-5">
                <div className="max-w-lg">
                    <h1 className="text-3xl font-bold text-gray-900 uppercase">Bare Beauty</h1>
                    <h2 className="text-lg font-medium text-gray-700 mt-2">Aesthetics Clinic</h2>
                    <p className="text-gray-600 mt-4 leading-relaxed">
                        Bare Beauty is an aesthetics & beauty clinic located in Yorkville, 
                        Toronto, offering a variety of beauty and skin services.
                    </p>
                    <div className="flex mt-6 space-x-2">
                        <Link href="https://www.instagram.com">
                            <Image
                                src={instagramIcon}
                                alt="Instagram icon"
                                className="h-8 w-8 hover:opacity-75 transition-opacity"
                            />
                        </Link>
                        <Link href="https://www.facebook.com">
                            <Image
                                src={facebookIcon}
                                alt="Facebook icon"
                                className="h-8 w-8 hover:opacity-75 transition-opacity"
                            />
                        </Link>
                        <Link href="https://www.x.com">
                            <Image
                                src={twitterIcon}
                                alt="Twitter icon"
                                className="h-8 w-8 hover:opacity-75 transition-opacity"
                            />
                        </Link>
                        <Link href="https://www.pinterest.com">
                            <Image
                                src={pinterestIcon}
                                alt="Pinterest icon"
                                className="h-8 w-8 hover:opacity-75 transition-opacity"
                            />
                        </Link>
                        <Link href="https://www.linkedin.com">
                            <Image
                                src={linkedinIcon}
                                alt="LinkedIn icon"
                                className="h-8 w-8 hover:opacity-75 transition-opacity"
                            />
                        </Link>
                        <Link href="https://tiktok.com">
                            <Image
                                src={tiktokIcon}
                                alt="TikTok icon"
                                className="h-8 w-8 hover:opacity-75 transition-opacity"
                            />
                        </Link>
                        <Link href="https://wa.me/+234-9138314501">
                            <Image
                                src={whatsappIcons}
                                alt="WhatsApp icon"
                                className="h-8 w-8 hover:opacity-75 transition-opacity"
                            />
                        </Link>
                    </div>
                </div>
                <div className="max-w-sm">
                    <h1 className="text-2xl font-bold text-gray-900 uppercase">Join the List</h1>
                    <p className="text-gray-600 mt-2 mb-4">Subscribe to our newsletter for updates and exclusive offers.</p>
                    <div className="items-start space-y-4">
                        <input 
                            type="email" 
                            placeholder="Enter your email" 
                            className="w-full sm:w-auto flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-gray-400 focus:outline-none"
                        />
                        <Button className="uppercase bg-white  font-bold py-5 px-10 hover:bg-gray-200  text-sm rounded-none text-gray-700 transition-colors">
                            Join Newsletter
                        </Button>
                    </div>
                </div>
            </div>
            <div className="flex justify-center pt-10 pb-5">
                <p className="text-sm text-gray-900">© 2024 <span>BUSSINESS NAME</span> | AWESOME DESIGN AGENCY</p>
            </div>
        </footer>
    )
}