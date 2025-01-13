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
import { useState } from "react";

export default function AddService() {
    const [isNewCategory, setIsNewCategory] = useState(false);

    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <div className="flex justify-center mb-10">
                        <Button className="py-8 px-5">ADD SERVICES</Button>
                    </div>
                </AlertDialogTrigger>
                <AlertDialogContent className="max-w-2xl">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Add New Service</AlertDialogTitle>
                        <AlertDialogDescription>
                            Fill in the details below to add a new service. You can select an existing category or create a new one.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="overflow-y-auto max-h-[70vh] px-4 scrollable-content">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Service Name */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Service Name</label>
                                <Input placeholder="Enter the service name" />
                            </div>

                            {/* Service Image */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Upload Service Image</label>
                                <Input type="file" accept="image/*" />
                            </div>

                            {/* Service Price */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Service Price ($)</label>
                                <Input type="number" placeholder="Enter the service price" />
                            </div>

                            {/* Service Duration */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Service Duration (Minutes)</label>
                                <Input type="number" placeholder="Enter the duration in minutes" />
                            </div>

                            {/* Category Selection */}
                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-sm font-medium mb-1">Category</label>
                                <Select onValueChange={(value) => setIsNewCategory(value === "new")}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="category1">Category 1</SelectItem>
                                        <SelectItem value="category2">Category 2</SelectItem>
                                        <SelectItem value="new">Create New Category</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* New Category Fields */}
                            {isNewCategory && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">New Category Name</label>
                                        <Input placeholder="Enter new category name" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Category Subheading</label>
                                        <Input placeholder="Enter subheading" />
                                    </div>
                                    <div className="col-span-1 md:col-span-2">
                                        <label className="block text-sm font-medium mb-1">Category Description</label>
                                        <Textarea placeholder="Enter a description for the category" />
                                    </div>
                                </>
                            )}

                            {/* Service Description */}
                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-sm font-medium mb-1">Service Description</label>
                                <Textarea placeholder="Enter a description for the service" />
                            </div>
                        </div>
                    </div>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Save</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
