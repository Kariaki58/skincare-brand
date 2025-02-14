"use client"
import ProductForm from "@/components/dashboard/admin/product/ProductForm";
import { useParams } from "next/navigation";

export default function EditProductPage() {
    const params = useParams();
    return <div className="bg-white"><ProductForm productId={params.id} /></div>;
}