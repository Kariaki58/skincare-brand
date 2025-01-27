import Navigation from "@/components/app-ui/product-page/navigation"
import ProductInfo from "@/components/app-ui/product-page/product-info";
import ProductShow from "@/components/app-ui/product-page/product-show";


export default function Layout({ children }) {
    return (
        <div className="max-w-7xl mx-auto">
            <ProductShow />
            <Navigation />
            <div className="border border-black p-4 mb-10 rounded-xl">
                {children}
            </div>
        </div>
    )
}