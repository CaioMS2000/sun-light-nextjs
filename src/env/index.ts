import { z } from 'zod'

export const envSchema = z.object({
  NEXT_PUBLIC_MAPS_API_KEY: z.string(),
  NEXT_PUBLIC_EMAIL_API_PUBLIC_KEY: z.string(),
  NEXT_PUBLIC_EMAIL_API_SERVICE_ID: z.string(),
  NEXT_PUBLIC_EMAIL_API_TEMPLATE_ID: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_BUCKET_NAME: z.string(),
  CLOUDFLARE_ACCOUNT_ID: z.string(),
  NEXT_PUBLIC_RESEND_API_KEY: z.string(),
  SECURITY_MIDDLEWARE_ENABLED: z.enum(['true', 'false']).default('true'),
  MODE: z.enum(['development', 'production', 'test']).default('development'),
})

export const env = envSchema.parse(process.env)
