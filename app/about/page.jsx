import AboutHeader from "@/components/app-ui/about-page/about-header";
import WhyChooseUs from "@/components/app-ui/about-page/Section-2";
import TeamSection from "@/components/app-ui/about-page/team-section";


export default function AboutPage() {
    return (
        <section className="">
            <AboutHeader />
            <WhyChooseUs />
            <TeamSection />
        </section>
    )
}