"use client"
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';

export default function Page() {
    const params = useParams();
    const { id } = params;
    const [service, setService] = useState(null);
    const [changeImage, setChangeImage] = useState(null);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const { data: session } = useSession();
    const toast = useToast();

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const serviceRes = await fetch(`/api/services/${id}`, 
                    {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' }
                    }
                );
                if (!serviceRes.ok) {
                    toast({
                        variant: "destructive",
                        title: "Uh oh! Something went wrong.",
                        description: "There was a problem with your request.",
                    });
                    return;
                }
                const serviceData = await serviceRes.json();
                const categoriesRes = await fetch('/api/services/category', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });


                if (!categoriesRes.ok){
                    toast({
                        variant: "destructive",
                        title: "Uh oh! Something went wrong.",
                        description: "There was a problem with your request.",
                    });
                    return;
                }
                const categoriesData = await categoriesRes.json();

                setService(serviceData);
                setCategories(categoriesData);
                setCategory(serviceData.categoryId.name);
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "There was a problem with your request.",
                });
                return;
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        if (name === 'categoryId')
            setCategory(value);
        setService(prev => ({ ...prev, [name]: value }));
    };

    // Handle image upload
    const handleImageChange = (e) => {
        const file = e.target.files?.[0] || null;
        setChangeImage(file);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!service) return;
        console.log(category)
        console.log(service.categoryId.name)
        console.log(category || service.categoryId.name)
        const formData = new FormData();
        formData.append('name', service.name);
        formData.append('price', service.price);
        formData.append('duration', service.duration);
        formData.append('description', service.description);
        formData.append('userId', session?.user?.id);
        formData.append('category', category || service.categoryId.name);
        formData.append('image', changeImage || service.image);

        try {
            const response = await fetch(`/api/services/${id}`, {
                method: 'PUT',
                body: formData,
            });

            if (!response.ok) {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "There was a problem with your request.",
                });
                return;
            }
            await response.json();
            toast({
                variant: "success",
                title: "Service updated successfully",
                description: "Your service update is successful.",
            });
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            });
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!service) return <div>Service not found</div>;

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h1 className="text-2xl text-center font-semibold text-gray-800 mb-6">Service Edit Page</h1>
            <form onSubmit={handleSubmit} className="space-y-4 md:grid md:grid-cols-2 md:gap-6">
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Service Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter service name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2"
                        value={service.name}
                        onChange={handleInputChange}
                    />
                </div>
                
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Upload Image</label>
                    <input
                        type="file"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        onChange={handleImageChange}
                        accept="image/*"
                    />
                    {service.image && (
                        <Image
                            src={service.image}
                            alt="Service Preview"
                            width={100}
                            height={100}
                            className="mt-2 w-24 h-24 object-cover rounded"
                        />
                    )}
                </div>
                
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Service Price</label>
                    <input
                        type="number"
                        name="price"
                        placeholder="Enter service price"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2"
                        value={service.price}
                        onChange={handleInputChange}
                    />
                </div>
                
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Duration (minutes)</label>
                    <input
                        type="number"
                        name="duration"
                        placeholder="Enter service duration"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2"
                        value={service.duration}
                        onChange={handleInputChange}
                    />
                </div>
                
                <div className="md:col-span-2">
                    <label className="block text-gray-700 font-medium mb-2">Category</label>
                    <select
                        name="categoryId"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2"
                        value={service.categoryId.name}
                        onChange={handleInputChange}
                    >
                        {categories.map(category => (
                            <option key={category._id} value={category.name}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                
                <div className="md:col-span-2">
                    <label className="block text-gray-700 font-medium mb-2">Description</label>
                    <textarea
                        name="description"
                        placeholder="Enter service description"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2"
                        value={service.description}
                        onChange={handleInputChange}
                    />
                </div>
                
                <button
                    type="submit"
                    className="w-full bg-black text-white py-3 rounded-lg hover:bg-black/70 transition duration-300 md:col-span-2"
                >
                    Update Service
                </button>
            </form>
        </div>
    );
}