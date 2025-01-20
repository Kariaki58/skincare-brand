import * as z from "zod";


export const authEmailSchema = z.object({
    email: z.string().email(),
});
