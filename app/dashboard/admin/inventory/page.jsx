import InventoryPagination from "@/components/app-ui/inventory/page-pagination";
import getProductDocumentLength from "@/actions/get-product-length";
import ProductInventory from "@/components/app-ui/inventory/product-inventory";


export default async function Page() {
    let productLength = 0;
    try {
        productLength = await getProductDocumentLength();
    } catch (error) {
        console.error(error);
    }

    const productsPerPage = 20
    const totalPages = Math.ceil(productLength / productsPerPage);

    return (
        <section className="p-6 bg-white shadow-lg rounded-lg">
            <ProductInventory />
            <InventoryPagination totalPages={totalPages}/>
        </section>
    );
}
