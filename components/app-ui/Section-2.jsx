import { Playfair_Display, Shippori_Antique, Outfit } from "next/font/google";


const playfair_display = Playfair_Display({
    subsets: ["latin"],
    weight: "400"
});


const shipporiAntique = Shippori_Antique({
    subsets: ["latin"],
    weight: "400",
});


const outfit = Outfit({
    subsets: ["latin"],
    weight: "300"
});





export default function SectionHeadline() {
    return (
        <section className="mx-auto max-w-screen-xl mt-20 px-5 md:px-2 lg:px-0">
            <div className="text-center">
                <h1 className={`text-[40px] text-[#38271F] ${playfair_display.className} antialiased uppercase`}>Beautiful girls braid quality hair.</h1>
                <h3 className={`${shipporiAntique.className} my-6 text-[#38271F] tracking-widest text-[13px] uppercase`}>WE OFFER Micro braids, Box braids, Comfortability & ALL THINGS Braiding</h3>
                <p className={`max-w-3xl  mx-auto text-[15px] font-light leading-7 ${outfit.className} antialiased`}>
                    At Victoria Hair Braiding and Weaving Center, our mission is to empower 
                    every client with a sense of beauty and confidence through exceptional hair 
                    braiding and styling services. We believe that hair is more than just a look—it’s 
                    an expression of individuality, creativity, and culture. With a passion for the art 
                    of African braiding, our talented team is dedicated to delivering impeccable results 
                    that enhance your natural beauty. Whether you're seeking a timeless classic or a bold new style, 
                    we create custom hair solutions that perfectly reflect your unique personality. 
                    At our salon, every visit is a journey to feel beautiful, confident, and truly yourself.
                </p>
            </div>
        </section>
    )
}