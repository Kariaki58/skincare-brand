import Navigation from "@/components/app-ui/Navigation";
import Footer from "@/components/app-ui/footer-design/Footer";
import Ads from "@/components/app-ui/Ads";


export default function RootLayout({ children }) {
    return (
        <>
            <Ads />
            <Navigation />
            {children}
            <Footer />
        </>
    );
}
