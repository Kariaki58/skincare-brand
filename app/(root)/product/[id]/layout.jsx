// import ProductDisplay from "@/components/app-ui/product-display/product-display";
import Navigation from "@/components/app-ui/product-page/navigation"
// import ProductInfo from "@/components/app-ui/product-page/product-info";
import ProductShow from "@/components/app-ui/product-page/product-show";
import image1 from "@/public/product-images/image2.jpg";
import image2 from "@/public/product-images/image3.jpg";
import image3 from "@/public/product-images/image4.jpg";
import image4 from "@/public/product-images/image5.jpg";
// import { Suspense } from "react";

const images = [image1, image2, image3, image4];


export default function Layout({ children }) {
    return (
        <div className="max-w-7xl mx-auto">
            <ProductShow />
            <Navigation />
            <div className="border border-black p-4 mb-10 rounded-xl">
                {children}
            </div>
            {/* <div className="mb-20">
                <h1 className="text-3xl">Related products</h1>
                <Suspense fallback={<div>Loading...</div>}>
                    <ProductDisplay images={images}/>
                </Suspense>
            </div> */}
        </div>
    )
}