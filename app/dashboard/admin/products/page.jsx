"use client";

import { useState, useRef } from "react";
import CreatableSelect from "react-select/creatable";
import { FiPlus, FiMinus } from "react-icons/fi";
import { useSession } from "next-auth/react";


export function KeyValueAccordion({ info, setInfo }) {
    const [key, setKey] = useState("");
    const [value, setValue] = useState("");

    const addInfo = () => {
        if (key && value) {
            setInfo([...info, { key, value }]);
            setKey("");
            setValue("");
        }
    };

    const removeInfo = (index) => {
        setInfo(info.filter((_, i) => i !== index));
    };

    return (
        <div>
            <h3 className="font-bold text-lg">Additional Information</h3>
            <div className="flex gap-2 mt-2">
                <input 
                    type="text" 
                    placeholder="Key (e.g., Brand)" 
                    value={key} 
                    onChange={(e) => setKey(e.target.value)} 
                    className="border p-2 w-1/2 rounded-md"
                />
                <input 
                    type="text" 
                    placeholder="Value (e.g., Vently)" 
                    value={value} 
                    onChange={(e) => setValue(e.target.value)} 
                    className="border p-2 w-1/2 rounded-md"
                />
                <button type="button" onClick={addInfo} className="bg-blue-500 text-white px-3 py-2 rounded-md flex items-center">
                    <FiPlus size={20} />
                </button>
            </div>
            <div className="mt-4 max-w-lg mx-auto">
                {info.map((item, index) => (
                    <div key={index} className="flex justify-between items-center border p-2 rounded-md mt-2">
                        <span>{item.key}: {item.value}</span>
                        <button onClick={() => removeInfo(index)} className="text-red-500">
                            <FiMinus size={20} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Page() {
    const fileInputRef = useRef(null);
    const [product, setProduct] = useState({
        name: "",
        stock: "",
        price: "",
        basePrice: "",
        image: null,
        description: "",
        category: null,
        additionalInfo: null,
    });
    const session = useSession()


    const [categories, setCategories] = useState([
        { value: "Category 1", label: "Category 1" },
        { value: "Category 2", label: "Category 2" },
        { value: "Category 3", label: "Category 3" }
    ]);

    const handleCategoryChange = (newValue) => {
        setProduct({ ...product, category: newValue ? newValue.value : "" });
    };

    const handleCategoryCreate = (inputValue) => {
        const newOption = { value: inputValue, label: inputValue };
        setCategories((prev) => [...prev, newOption]);
        setProduct({ ...product, category: inputValue });
    };

    const [additionalInfo, setAdditionalInfo] = useState([]); // State for additional info

    async function create(event) {
        event.preventDefault();

        const updatedProduct = { ...product, additionalInfo };
        const formData = new FormData();
        
        formData.append("name", updatedProduct.name);
        formData.append("stock", updatedProduct.stock);
        formData.append("price", updatedProduct.price);
        formData.append("basePrice", updatedProduct.basePrice);
        formData.append("image", updatedProduct.image);
        formData.append("description", updatedProduct.description);
        formData.append("category", updatedProduct.category);
        formData.append("additionalInfo", JSON.stringify(updatedProduct.additionalInfo));
        formData.append("userId", session?.data?.user?.id)


        const response = await fetch('/api/products', {
            method: 'POST',
            body: formData,
        })
        if (response.ok) {
            alert("Product created successfully!");
            setProduct({
                name: "",
                stock: "",
                price: "",
                basePrice: "",
                image: null,
                description: "",
                category: null,
                additionalInfo: [],
            });
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            setAdditionalInfo([]);
            setCategories([{ value: "Category 1", label: "Category 1" }, { value: "Category 2", label: "Category 2" }, { value: "Category 3", label: "Category 3" }]);
        } else {
            alert("Failed to create product.");
        }
    }

    return (
        <div className="p-4 max-w-screen-lg mx-auto">
            <h1 className="text-center text-xl font-bold">Upload Products</h1>
            <form onSubmit={create} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-lg">
                <div>
                    <label>Product Name</label>
                    <input 
                        type="text" 
                        value={product.name} 
                        onChange={(e) => setProduct({ ...product, name: e.target.value })} 
                        className="border p-2 w-full rounded-md"
                    />
                </div>
                <div>
                    <label>Stock</label>
                    <input 
                        type="number" 
                        value={product.stock} 
                        onChange={(e) => setProduct({...product, stock: e.target.value })} 
                        className="border p-2 w-full rounded-md"
                    />
                </div>
                <div className="mt-5">
                    <label>Base Price</label>
                    <input 
                        type="number" 
                        value={product.price} 
                        onChange={(e) => setProduct({...product, price: e.target.value })} 
                        className="border p-2 w-full rounded-md"
                    />
                </div>
                <div className="mt-5">
                    <label>Discounted Price</label>
                    <input 
                        type="number" 
                        value={product.basePrice} 
                        onChange={(e) => setProduct({...product, basePrice: e.target.value })} 
                        className="border p-2 w-full rounded-md"
                    />
                </div>
                <div className="mt-5">
                    <label>Image</label>
                    <input 
                        type="file" 
                        onChange={(e) => setProduct({...product, image: e.target.files[0] })} 
                        className="border p-2 w-full rounded-md bg-white"
                        ref={fileInputRef}
                    />
                </div>
                <div className="mt-5">
                    <label className="block">Category</label>
                    <CreatableSelect
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
                        onChange={(e) => setProduct({...product, description: e.target.value })}
                        placeholder="Enter a description for the product" 
                        cols="30" 
                        rows="5" 
                        className="border p-2 w-full"
                    />
                </div>
                <div className="col-span-2">
                    <KeyValueAccordion info={additionalInfo} setInfo={setAdditionalInfo} />
                </div>
                <div className="mt-5 flex justify-center col-span-2">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Upload</button>
                </div>
            </form>
        </div>
    );
}
