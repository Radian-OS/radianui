import { Resend } from "resend"
import "server-only"

export const resend = new Resend(process.env.RESEND_API_KEY!)
