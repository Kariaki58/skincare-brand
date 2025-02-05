"use client";

import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Page() {
    const params = useParams();
    const { id } = params;
    const router = useRouter();
    const { data: session } = useSession();

    const [category, setCategory] = useState({
        name: "",
        subHeading: "",
        description: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchCategory() {
            try {
                setLoading(true);
                const res = await fetch(`/api/services/category/${id}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });
                if (!res.ok) throw new Error("Failed to fetch category");
                const data = await res.json();

                setCategory({
                    name: data.name,
                    subHeading: data.subHeading || "",
                    description: data.description,
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        if (id) fetchCategory();
    }, [id]);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);
        if (!category.name) {
            setError("Category name is required");
            return;
        }
        if (!category.description) {
            setError("Category description is required");
            return;
        }
        if (!category.subHeading) {
            setError("Subheading is required");
            return;
        }


        try {
            const res = await fetch(`/api/services/category/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({...category, userId: session?.user?.id}),
            });

            if (!res.ok) throw new Error("Failed to update category");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    function handleChange(e) {
        setCategory({ ...category, [e.target.name]: e.target.value });
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-20 bg-white p-4 rounded-md shadow-md">
            <h1 className="text-2xl text-center font-semibold mb-4">Edit Category</h1>
            
            {error && <p className="text-red-500 text-center">{error}</p>}
            {loading && <p className="text-gray-500 text-center">Loading...</p>}

            <div className="grid gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Category Name</label>
                    <Input
                        name="name"
                        value={category.name}
                        onChange={handleChange}
                        placeholder="Update category name"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Category Subheading</label>
                    <Input
                        name="subHeading"
                        value={category.subHeading}
                        onChange={handleChange}
                        placeholder="Update subheading"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Category Description</label>
                    <Textarea
                        name="description"
                        value={category.description}
                        onChange={handleChange}
                        placeholder="Update category description"
                        required
                    />
                </div>
            </div>
            
            <div className="flex justify-center mt-6">
                <button type="submit" className="bg-black text-white px-4 py-2 rounded-lg" disabled={loading}>
                    {loading ? "Updating..." : "Update"}
                </button>
            </div>
        </form>
    );
}
