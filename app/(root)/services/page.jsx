import Review from "@/components/app-ui/Reviews";
import ServiceSection1 from "@/components/app-ui/service-page/service-section-1";
import CategoryDisplay from "@/components/app-ui/service-page/category-display";
import ClientShowCase from "@/components/app-ui/ClientShowCase";


export default function servicePage() {
    return (
        <section>
            <ServiceSection1 />
            <Review />
            <CategoryDisplay />
            <ClientShowCase />
        </section>
    )
}