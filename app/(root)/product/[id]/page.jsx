import ProductInfo from "@/components/app-ui/product-page/product-info";


export default async function page({ params }) {
    const {id} = await params
    return (
        <ProductInfo id={id}/>
    );
}
