import InventoryPagination from "@/components/app-ui/inventory/page-pagination";
import getProductDocumentLength from "@/actions/get-product-length";
import ProductInventory from "@/components/app-ui/inventory/product-inventory";
import { Suspense } from "react";
import CustomerTable from "@/components/dashboard/admin/customers/customer-table";
import { SidebarInsetComponent } from "@/components/dashboard/admin/side-bar-inset-component";
import { SidebarInset } from "@/components/ui/sidebar";



export default async function Page() {
    let productLength = 0;
    try {
        productLength = await getProductDocumentLength();
    } catch (error) {
        console.error(error);
    }

    const productsPerPage = 20
    const totalPages = Math.ceil(productLength / productsPerPage);

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
