import ProductForm from "@/components/dashboard/admin/product/ProductForm";
import { SidebarInsetComponent } from "@/components/dashboard/admin/side-bar-inset-component";
import { SidebarInset } from "@/components/ui/sidebar";

export default function page() {
    return (
        <SidebarInset>
            <SidebarInsetComponent />
            <div className="bg-white">
                <ProductForm />;
            </div>
        </SidebarInset>
        
    )
}