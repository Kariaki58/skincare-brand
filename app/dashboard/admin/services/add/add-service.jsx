"use client";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";


export default function AddService() {
    const [open, setOpen] = useState(false);
    const [isNewCategory, setIsNewCategory] = useState(false);
    const [serviceName, setServiceName] = useState('');
    const [serviceImage, setServiceImage] = useState(null);
    const [servicePrice, setServicePrice] = useState('');
    const [serviceDuration, setServiceDuration] = useState('');
    const [category, setCategory] = useState('');
    const [newCategoryName, setNewCategoryName] = useState('');
    const [categorySubheading, setCategorySubheading] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');
    const [serviceDescription, setServiceDescription] = useState('');
    const [categorySelect, setCategorySelect] = useState([]);
    const { data: session } = useSession();
    const { toast } = useToast();


    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/services/category');

            if (!response.ok) {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "There was a problem with your request.",
                });
                return;
            }

            const data = await response.json();
            setCategorySelect(data.map((category) => ({ value: category.name, label: category.name })));
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            });
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('name', serviceName);
        if (serviceImage) formData.append('image', serviceImage);
        formData.append('price', servicePrice);
        formData.append('duration', serviceDuration);
        formData.append('description', serviceDescription);
        formData.append('userId', session?.user?.id || '');

        if (isNewCategory) {
            formData.append('newCategory', 'true');
            formData.append('categoryName', newCategoryName);
            formData.append('categorySubheading', categorySubheading);
            formData.append('categoryDescription', categoryDescription);
        } else {
            formData.append('category', category);
        }

        try {
            const response = await fetch('/api/services', {
                method: 'POST',
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
            toast({
                variant: "success",
                title: "Service added successfully",
                description: "your service upload is successful.",
            });

            resetForm();
            setOpen(false);
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "Failed to add the service. Please try again.",
            });
        }
    };

    const resetForm = () => {
        setServiceName('');
        setServiceImage(null);
        setServicePrice('');
        setServiceDuration('');
        setCategory('');
        setIsNewCategory(false);
        setNewCategoryName('');
        setCategorySubheading('');
        setCategoryDescription('');
        setServiceDescription('');
    };

    return (
        <div>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger asChild>
                    <div className="flex justify-center mb-10">
                        <Button className="py-8 px-5">ADD SERVICES</Button>
                    </div>
                </AlertDialogTrigger>
                <AlertDialogContent className="max-w-2xl">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Add New Service</AlertDialogTitle>
                        <AlertDialogDescription>
                            Fill in the details below to add a new service.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <form id="service-form" onSubmit={handleSubmit}>
                        <div className="overflow-y-auto max-h-[70vh] px-4 scrollable-content">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Form fields remain the same as before */}
                                {/* Service Name */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">Service Name</label>
                                    <Input
                                        placeholder="Enter the service name"
                                        value={serviceName}
                                        onChange={(e) => setServiceName(e.target.value)}
                                        required
                                    />
                                </div>

                                {/* Service Image */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">Upload Service Image</label>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setServiceImage(e.target.files?.[0] || null)}
                                        required
                                    />
                                </div>

                                {/* Service Price */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">Service Price ($)</label>
                                    <Input
                                        type="number"
                                        placeholder="Enter the service price"
                                        value={servicePrice}
                                        onChange={(e) => setServicePrice(e.target.value)}
                                        required
                                    />
                                </div>

                                {/* Service Duration */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">Service Duration (Minutes)</label>
                                    <Input
                                        type="number"
                                        placeholder="Enter the duration in minutes"
                                        value={serviceDuration}
                                        onChange={(e) => setServiceDuration(e.target.value)}
                                        required
                                    />
                                </div>

                                {/* Category Selection */}
                                <div className="col-span-1 md:col-span-2">
                                    <label className="block text-sm font-medium mb-1">Category</label>
                                    <Select
                                        onValueChange={(value) => {
                                            if (value === "new") {
                                                setIsNewCategory(true);
                                                setCategory('');
                                            } else {
                                                setIsNewCategory(false);
                                                setCategory(value);
                                            }
                                        }}
                                        required
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categorySelect.map((category) => (
                                                <SelectItem key={category.value} value={category.value}>
                                                    {category.label}
                                                </SelectItem>
                                            ))}
                                            <SelectItem value="new">Create New Category</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* New Category Fields */}
                                {isNewCategory && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">New Category Name</label>
                                            <Input
                                                placeholder="Enter new category name"
                                                value={newCategoryName}
                                                onChange={(e) => setNewCategoryName(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Category Subheading</label>
                                            <Input
                                                placeholder="Enter subheading"
                                                value={categorySubheading}
                                                onChange={(e) => setCategorySubheading(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="col-span-1 md:col-span-2">
                                            <label className="block text-sm font-medium mb-1">Category Description</label>
                                            <Textarea
                                                placeholder="Enter a description for the category"
                                                value={categoryDescription}
                                                onChange={(e) => setCategoryDescription(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </>
                                )}

                                {/* Service Description */}
                                <div className="col-span-1 md:col-span-2">
                                    <label className="block text-sm font-medium mb-1">Service Description</label>
                                    <Textarea
                                        placeholder="Enter a description for the service"
                                        value={serviceDescription}
                                        onChange={(e) => setServiceDescription(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={resetForm}>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleSubmit}  type="submit" form="service-form">
                                Save
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </form>
                    
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}