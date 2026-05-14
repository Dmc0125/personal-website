import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { z } from "astro/zod";
import { ActionError, defineAction } from "astro:actions";
import { EMAIL_USER, GMAIL_PASSWORD, UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN } from "astro:env/server"
import nodemailer from "nodemailer"

const rateLimit = new Ratelimit({
    redis: new Redis({
        url: UPSTASH_REDIS_REST_URL,
        token: UPSTASH_REDIS_REST_TOKEN,
    }),
    limiter: Ratelimit.slidingWindow(3, "1 h"),
    prefix: "email:hourly",
})

export const server = {
    sendMail: defineAction({
        accept: "form",
        input: z.object({
            from: z.email().max(256),
            subject: z.string().max(256),
            message: z.string().min(10).max(5000),
        }),
        handler: async (input, context) => {
            const rl = await rateLimit.limit(context.clientAddress)
            if (!rl.success) {
                throw new ActionError({
                    code: "TOO_MANY_REQUESTS",
                    message: "You have exceeded the rate limit",
                })
            }

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
