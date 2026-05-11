import { z } from "astro/zod";
import { defineAction } from "astro:actions";

export const server = {
    sendMail: defineAction({
        accept: "form",
        input: z.object({
            from: z.email(),
            subject: z.string(),
            message: z.string().min(10),
        }),
        handler: async (input) => {
            console.log(input);
        },
    })
}
