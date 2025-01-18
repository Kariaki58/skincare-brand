import Header from "@/components/app-ui/Header";
import SectionHeadline from "@/components/app-ui/Section-2";
import ServiceSection from "@/components/app-ui/Section-3";
import CategorySection from "@/components/app-ui/Section-4";
import Review from "@/components/app-ui/Reviews";
import ClientShowCase from "@/components/app-ui/ClientShowCase";


export default async function Home() {
  const data = await fetch('https://skincare-brand.vercel.app/api/products')
  const posts = await data.json()
  console.log(posts)
  console.log(Array.isArray(posts))
  return (
    <div>
      <ul>
      {posts.data.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
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
