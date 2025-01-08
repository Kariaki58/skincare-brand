import GalleryUploadButton from "@/components/dashboard/admin/gallery-upload-button/gallery-upload-button";
import { SidebarInsetComponent } from "@/components/dashboard/admin/side-bar-inset-component";
import { SidebarInset } from "@/components/ui/sidebar";


export default function gallery() {
    return (
        <SidebarInset>
            <SidebarInsetComponent />
            <GalleryUploadButton />
            
        </SidebarInset>
    )
}