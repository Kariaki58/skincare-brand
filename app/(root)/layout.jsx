import Navigation from "@/components/app-ui/Navigation";
import Footer from "@/components/app-ui/footer-design/Footer";


export default function RootLayout({ children }) {
    return (
        <div className="bg-gradient-to-br from-[rgb(20,68,20)] to-[rgb(248,248,0)]">
            <Navigation />
            {children}
            <Footer />
        </div>
    );
}
