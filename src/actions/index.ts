import { z } from "astro/zod";
import { ActionError, defineAction } from "astro:actions";
import { EMAIL_USER, GMAIL_PASSWORD } from "astro:env/server"
import nodemailer from "nodemailer"

export const server = {
    sendMail: defineAction({
        accept: "form",
        input: z.object({
            from: z.email().max(256),
            subject: z.string().max(256),
            message: z.string().min(10).max(5000),
        }),
        handler: async (input, _context) => {
            // TODO: rate limiting

            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: EMAIL_USER,
                    pass: GMAIL_PASSWORD,
                },
            })

            try {
                await transporter.sendMail({
                    from: `"Portfolio Contact Form"`,
                    to: EMAIL_USER,
                    subject: input.subject,
                    replyTo: input.from,
                    text: `From: ${input.from}\n\n${input.message}`,
                })
            } catch (e) {
                let message = ""
                if (e instanceof Error) {
                    message = `${e.name} ${e.message}`
                }
                throw new ActionError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: message,
                })
            }
        },
    })
}
