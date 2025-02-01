"use client";
import { FaEdit, FaTrash } from "react-icons/fa";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";


export default function ProductInventory() {
    const [products, setProducts] = useState([]);
    const searchParams = useSearchParams();
    const router = useRouter();
    const { data: session } = useSession();


    console.log(session)

    const currentPage = Number(searchParams.get("page")) || 1;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`/api/products?page=${currentPage}`);
                
                if (!response.ok) throw new Error("Failed to fetch products");
    
                const data = await response.json();

                console.log({data})
                if (Array.isArray(data.products)) {
                    setProducts(data.products);
                } else {
                    console.error("API response is not an array:", data);
                    setProducts([]);
                }
            } catch (err) {
                console.error("Error fetching products:", err);
                setProducts([]);
            }
        };
        fetchProducts();
    }, [currentPage]);

    const editProduct = (id) => {
        router.push(`/dashboard/admin/products/edit/${id}`);
    };

    const deleteProduct = async (id) => {
        if (!confirm("Are you sure you want to delete this product?")) return;

        try {
            const response = await fetch(`/api/products/${id}`, {
                method: "DELETE",
                body: JSON.stringify({ userId: session?.user?.id }),
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) throw new Error("Failed to delete product");

            setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
        } catch (err) {
            console.error("Error deleting product:", err);
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
                <thead>
                    <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                        <th className="px-4 py-2 border-b">Product</th>
                        <th className="px-4 py-2 border-b">Price</th>
                        <th className="px-4 py-2 border-b">Stock</th>
                        <th className="px-4 py-2 border-b">Total</th>
                        <th className="px-4 py-2 border-b">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 border-b flex items-center gap-4">
                                <div className="w-20 h-20 relative">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        className="object-contain rounded-md"
                                        priority
                                        layout="fill"
                                    />
                                </div>
                                <span className="font-medium text-gray-900">{product.name}</span>
                            </td>
                            <td className="px-4 py-3 border-b text-gray-800">${product.price.toFixed(2)}</td>
                            <td className="px-4 py-3 border-b">{product.stock}</td>
                            <td className="px-4 py-3 border-b text-gray-800">
                                ${(product.price * product.stock).toFixed(2)}
                            </td>
                            <td className="px-4 py-3 border-b">
                                <button
                                    className="text-blue-500 hover:text-blue-700"
                                    onClick={() => editProduct(product._id)}
                                >
                                    <FaEdit size={18} />
                                </button>
                                <button
                                    className="text-red-500 hover:text-red-700 ml-5"
                                    onClick={() => deleteProduct(product._id)}
                                >
                                    <FaTrash size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
