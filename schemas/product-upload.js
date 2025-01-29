import { z } from "zod";


export const productUpload = z.object({
    image: z.string().url("Invalid image URL"),
    name: z.string().min(1, "Product name must be at least 5 character long"),
    price: z.number().min(1, "Price must be a positive number"),
    basePrice: z.number().min(1, "Base price must be a positive number"),
    stock: z.number().min(1, "Stock must be a positive number"),
    category: z.string().min(5, "Category must be at least 1 character long"),
    description: z.string().min(10, "Description must be at least 1 character long"),
    additionalInfo: z.object({}),
})