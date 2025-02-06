import Header from "@/components/app-ui/Header";
import SectionHeadline from "@/components/app-ui/Section-2";
import ServiceSection from "@/components/app-ui/Section-3";
import CategorySection from "@/components/app-ui/Section-4";
import Review from "@/components/app-ui/Reviews";
import ClientShowCase from "@/components/app-ui/ClientShowCase";
import FeaturedProducts from "@/components/app-ui/shop/featured-products";
import VideoGallery from "@/components/app-ui/video-gallery";
import VideoBackground from "@/components/app-ui/videoBackground";

export default function Home() {
  return (
    <div>
      <VideoBackground />
      {/* <Header /> */}
      <SectionHeadline />
      <ServiceSection />
      <VideoGallery />
      {/* <CategorySection /> */}
      <FeaturedProducts />
      <Review />
      <ClientShowCase />
    </div>
  );
}
