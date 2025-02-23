import InventoryPagination from "@/components/app-ui/inventory/page-pagination";
import getProductDocumentLength from "@/actions/get-product-length";
import ProductInventory from "@/components/app-ui/inventory/product-inventory";
import { Suspense } from "react";
import { SidebarInsetComponent } from "@/components/dashboard/admin/side-bar-inset-component";
import { SidebarInset } from "@/components/ui/sidebar";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/options";


export default async function Page() {
    let productLength = 0;
    const session = await getServerSession(options);
    const errorOccurred = false;
    try {
        productLength = await getProductDocumentLength();
    } catch (error) {
        errorOccurred = true;
    }
    if (errorOccurred) {
        return <div>Error occurred while fetching products</div>;
    }

    const productsPerPage = 20
    const totalPages = Math.ceil(productLength / productsPerPage);

    if (!session) {
        return <div>You need to be logged in to access this page.</div>;
    }
    if (session.user.role!== "admin") {
        return <div>You are not authorized to access this page.</div>;
    }

    return (
        <SidebarInset>
            <SidebarInsetComponent />
            <section className="p-6 bg-white shadow-lg rounded-lg">
                <Suspense fallback={<div>Loading...</div>}>
                    <ProductInventory />
                </Suspense>
                <Suspense fallback={<div>Loading...</div>}>
                    <InventoryPagination totalPages={totalPages}/>
                </Suspense>
            </section>
        </SidebarInset>
        
    );
}
