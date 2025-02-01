import ProductDisplay from "@/components/app-ui/shop/product-display";
import SortedDisplay from "@/components/app-ui/shop/sorted-display";
import { Suspense } from "react";

export default function Page() {
    return (
        <section className="mb-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 px-10 md:px-0">
                <SortedDisplay />
                <Suspense fallback={<p>Loading...</p>}>
                    <ProductDisplay />
                </Suspense>
            </div>
        </section>
    );
}
