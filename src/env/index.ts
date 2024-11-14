import { z } from 'zod'

export const envSchema = z.object({
  NEXT_PUBLIC_MAPS_API_KEY: z.string(),
  NEXT_PUBLIC_EMAIL_API_PUBLIC_KEY: z.string(),
  NEXT_PUBLIC_EMAIL_API_SERVICE_ID: z.string(),
  NEXT_PUBLIC_EMAIL_API_TEMPLATE_ID: z.string(),
  MODE: z.enum(['development', 'production', 'test']).default('development'),
})

export const env = envSchema.parse(process.env)
