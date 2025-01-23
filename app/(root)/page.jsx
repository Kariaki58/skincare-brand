import Header from "@/components/app-ui/Header";
import SectionHeadline from "@/components/app-ui/Section-2";
import ServiceSection from "@/components/app-ui/Section-3";
import CategorySection from "@/components/app-ui/Section-4";
import Review from "@/components/app-ui/Reviews";
import ClientShowCase from "@/components/app-ui/ClientShowCase";


export default function Home() {
  return (
    <div>
      <Header />
      <SectionHeadline />
      <ServiceSection />
      <CategorySection />
      {/* <Review /> */}
      {/* <ClientShowCase /> */}
    </div>
  );
}
