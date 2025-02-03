import Navigation from "@/components/app-ui/Navigation";
import Footer from "@/components/app-ui/footer-design/Footer";
import Ads from "@/components/app-ui/Ads";


export default function RootLayout({ children }) {
    return (
        <div className="bg-gradient-to-br from-[rgb(20,68,20)] to-[rgb(248,248,0)]">
            <Ads />
            <Navigation />
            {children}
            <Footer />
        </div>
    );
}
