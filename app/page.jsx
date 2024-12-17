import Ads from "@/components/app-ui/Ads";
import Navigation from "@/components/app-ui/Navigation";
import Header from "@/components/app-ui/Header";
import SectionHeadline from "@/components/app-ui/Section-2";
import ServiceSection from "@/components/app-ui/Section-3";
import CategorySection from "@/components/app-ui/Section-4";


export default function Home() {
  return (
    <div className="bg-[#f5f2f1]">
      <Ads />
      <Navigation />
      <Header />
      <SectionHeadline />
      <ServiceSection />
      <CategorySection />
    </div>
  );
}
