import Header from "@/components/app-ui/Header";
import SectionHeadline from "@/components/app-ui/Section-2";
import ServiceSection from "@/components/app-ui/Section-3";
import CategorySection from "@/components/app-ui/Section-4";
import Review from "@/components/app-ui/Reviews";
import ClientShowCase from "@/components/app-ui/ClientShowCase";


export default async function Home() {
  const data = await fetch('http://localhost:3000/api/products')

  const posts = await data.json()
  console.log(posts)
  return (
    <div>
      <ul>
        {JSON.stringify(posts)}
      </ul>
      {/* <Header />
      <SectionHeadline />
      <ServiceSection />
      <CategorySection />
      <Review />
      <ClientShowCase /> */}
    </div>
  );
}
