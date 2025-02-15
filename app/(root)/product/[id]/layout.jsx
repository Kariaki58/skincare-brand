import ProductShow from "@/components/app-ui/product-page/product-show";
import Review from "@/components/app-ui/product-page/reviews";



export default function Layout({ children }) {
    return (
        <div className="max-w-7xl mx-auto">
            <ProductShow />
            <Review />
        </div>
    )
}