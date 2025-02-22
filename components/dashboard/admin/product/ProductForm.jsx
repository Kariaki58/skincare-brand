"use client";

import dynamic from "next/dynamic";



import { useState, useRef, useEffect } from "react";
const CreatableSelect = dynamic(() => import("react-select/creatable"), { ssr: false });
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast"
// import { KeyValueAccordion } from "./KeyValueAccordion";



const ProductForm = ({ productId, initialData }) => {
    const fileInputRef = useRef(null);
    const { data: session } = useSession();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(!!productId);
    const [additionalInfo, setAdditionalInfo] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const { toast } = useToast();

    

    const fetchCategories = async () => {
        try {
            const response = await fetch("/api/category",
                { method: "GET", headers: { "Content-Type": "application/json" } }
            );
            if (!response.ok) {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "There was a problem with your request.",
                });
                return;
            }

            const data = await response.json();
            if (Array.isArray(data)) {
                setCategories(data.map((category) => ({ value: category.name, label: category.name })));
            } else {
                
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            });
            return;
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const [product, setProduct] = useState({
        name: "",
        stock: "",
        basePrice: "",
        image: null,
        description: "",
        category: null,
        additionalInfo: [],
    });

    useEffect(() => {
        if (productId) {
            const fetchProduct = async () => {
                try {
                    const response = await fetch(`/api/products/${productId}`);
                    const data = await response.json();
                    setProduct({
                        name: data.name,
                        stock: data.stock,
                        price: data.price,
                        basePrice: data.basePrice,
                        image: data.image,
                        description: data.description,
                        category: data.category.name,
                    });
                    
                    setAdditionalInfo(data.additionalInfo || []);
                    setLoading(false);
                } catch (error) {
                    toast({
                        variant: "destructive",
                        title: "Uh oh! Something went wrong.",
                        description: "There was a problem with your request.",
                    });
                    setLoading(false);
                }
            };

            fetchProduct();
        }
    }, [productId]);

    const handleCategoryChange = (newValue) => {
        setProduct(prev => ({ ...prev, category: newValue?.value || "" }));
    };

    const handleCategoryCreate = (inputValue) => {
        const newOption = { value: inputValue, label: inputValue };
        setCategories(prev => [...prev, newOption]);
        setProduct(prev => ({ ...prev, category: inputValue }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitting(true);

        const formData = new FormData();

        formData.append("name", product.name);
        formData.append("stock", product.stock);
        formData.append("basePrice", product.basePrice);
        formData.append("description", product.description);
        formData.append("category", product.category);
        formData.append("userId", session?.user?.id);
        formData.append("image", product.image);

        const url = productId ? `/api/products/${productId}` : '/api/products';
        const method = productId ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                body: formData,
            });

            if (response.ok) {
                toast({
                    title: `Product ${productId ? 'updated' : 'created'} successfully!`,
                })
                if (!productId) {
                    // Reset form if creating new
                    setProduct({
                        name: "",
                        stock: "",
                        price: "",
                        basePrice: "",
                        image: null,
                        description: "",
                        category: null,
                    });
                    setAdditionalInfo([]);
                    if (fileInputRef.current) fileInputRef.current.value = '';
                }
            } else {
                const responseData = await response.json();
                toast({
                    variant: "destructive",
                    title: "Failed to save product.",
                    description: responseData.error,
                });
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            });
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="p-4 max-w-screen-lg mx-auto">
            <h1 className="text-center text-xl font-bold">
                {productId ? 'Edit Product' : 'Upload Product'}
            </h1>
            <form onSubmit={handleSubmit} className="md:grid md:grid-cols-2 gap-5 mt-5">
                {/* Form fields remain the same as original */}
                <div className="w-full mt-5 md:mt-0">
                    <label>Product Name</label>
                    <input 
                        type="text" 
                        value={product.name} 
                        disabled={submitting}
                        onChange={(e) => setProduct(p => ({ ...p, name: e.target.value }))} 
                        className="border p-2 w-full rounded-md"
                    />
                </div>
                <div className="mt-5 md:mt-0">
                    <label>Stock</label>
                    <input 
                        type="number" 
                        value={product.stock}
                        disabled={submitting}
                        onChange={(e) => setProduct({...product, stock: e.target.value })} 
                        className="border p-2 w-full rounded-md"
                    />
                </div>
                <div className="mt-5">
                    <label>Price</label>
                    <input 
                        type="number" 
                        value={product.basePrice}
                        disabled={submitting}
                        onChange={(e) => setProduct({...product, basePrice: e.target.value })} 
                        className="border p-2 w-full rounded-md"
                    />
                </div>
                <div className="mt-5">
                    <label>Image</label>
                    <input 
                        type="file" 
                        onChange={(e) => setProduct(p => ({ ...p, image: e.target.files[0] }))} 
                        className="border p-2 w-full rounded-md bg-white"
                        ref={fileInputRef}
                    />
                    {product.image && !(product.image instanceof File) && (
                        <div className="mt-2">
                            <Image 
                                src={product.image}
                                width={100}
                                height={100}
                                alt="Current product" 
                                className="h-20 w-20 object-cover rounded-md"
                            />
                            <span className="block text-sm text-gray-500 mt-1">Current image</span>
                        </div>
                    )}
                </div>
                <div className="mt-5 col-span-2">
                    <label className="block">Category</label>
                    <CreatableSelect
                        value={{ value: product.category, label: product.category }}
                        options={categories}
                        onChange={handleCategoryChange}
                        onCreateOption={handleCategoryCreate}
                        className="basic-multi-select"
                        classNamePrefix="select"
                    />
                </div>
                <div className="col-span-2 mt-5">
                    <label>Description</label>
                    <textarea 
                        value={product.description}
                        disabled={submitting}
                        onChange={(e) => setProduct({...product, description: e.target.value })}
                        placeholder="Enter a description for the product" 
                        cols="30" 
                        rows="5" 
                        className="border p-2 w-full"
                    />
                </div>
                {/* <div className="col-span-2">
                    <KeyValueAccordion info={additionalInfo} setInfo={setAdditionalInfo} />
                </div> */}
                <div className="mt-5 flex justify-center col-span-2">
                    <button type="submit" disabled={submitting} className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center">
                        {submitting ? "Processing..." : productId ? 'Update Product' : 'Upload Product'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;