"use client";
import { useState } from 'react';
import { Loader2, UploadCloud } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export default function GalleryUploadButton() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const router = useRouter();
    const { toast } = useToast();

    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];


        if (!file) return;

        // Validate file type and size
        const allowedTypes = ['image/svg+xml', 'image/png', 'image/jpeg', 'image/gif'];
        const maxSizeMB = 5;
        
        if (!allowedTypes.includes(file.type)) {
            setError('Invalid file type. Allowed formats: SVG, PNG, JPG, GIF');
            return;
        }

        if (file.size > maxSizeMB * 1024 * 1024) {
            setError(`File size exceeds ${maxSizeMB}MB limit`);
            return;
        }
        
        try {
            setIsLoading(true);
            setError(null);
            setSuccess(null);

            const formData = new FormData();
            formData.append('image', file);

            const response = await fetch('/api/gallery', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "There was a problem with your request.",
                })
                return;
            }

            const result = await response.json();
            setSuccess('Image uploaded successfully!');
            router.refresh()
        } catch (err) {
            setError(err.message || 'Failed to upload image');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="flex items-center justify-center w-full">
                <label 
                    htmlFor="dropzone-file" 
                    className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors
                        ${isLoading ? 'bg-gray-100 border-gray-400' : 'bg-gray-50 hover:bg-gray-100 border-gray-300'}
                        dark:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600`}
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {isLoading ? (
                            <Loader2 className="w-8 h-8 mb-4 text-gray-500 animate-spin" />
                        ) : (
                            <UploadCloud className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                        )}
                        
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            {isLoading ? (
                                <span>Uploading...</span>
                            ) : (
                                <>
                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                </>
                            )}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG, GIF (MAX. 5MB)
                        </p>
                    </div>
                    <input 
                        id="dropzone-file" 
                        type="file" 
                        className="hidden" 
                        onChange={handleFileChange}
                        accept="image/svg+xml, image/png, image/jpeg, image/gif"
                        disabled={isLoading}
                    />
                </label>
            </div>

            {error && (
                <div className="text-red-600 text-sm p-3 bg-red-50 rounded-md">
                    {error}
                </div>
            )}

            {success && (
                <div className="text-green-600 text-sm p-3 bg-green-50 rounded-md">
                    {success}
                </div>
            )}
        </div>
    )
}