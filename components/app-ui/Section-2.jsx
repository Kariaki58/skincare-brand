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
        <section className="mx-auto max-w-screen-xl mt-20">
            <div className="text-center">
                <h1 className={`text-[40px] text-[#A7948B] ${playfair_display.className} antialiased`}>YOUR NATURAL SKIN IS BEAUTIFUL, EMBRACE IT.</h1>
                <h3 className={`${shipporiAntique.className} my-6 text-[#38271F] tracking-widest text-[13px]`}>WE OFFER FACIALS, LASH EXTENSIONS, MAKEUP & ALL THINGS BEAUTY</h3>
                <p className={`max-w-3xl  mx-auto text-[15px] font-light leading-7 ${outfit.className} antialiased`}>
                    Write your mission statement or an introduction to your business right here. 
                    You are only limited by your imagination. Making all those little fluffies that 
                    live in the clouds. By now you should be quite happy about what's happening here. 
                    Now then, let's play. Automatically, all of these beautiful, beautiful things will happen. 
                    Exercising the imagination, experimenting with talents, being creative; these things, to me, 
                    are truly the windows to your soul.
                </p>
            </div>
        </section>
    )
}