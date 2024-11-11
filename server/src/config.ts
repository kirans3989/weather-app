import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const configSchema = z.object({
  port: z.number().default(3000),
  nodeEnv: z.enum(['development', 'production', 'test']).default('development'),
  weatherApiKey: z.string(),
  redisUrl: z.string().optional(),
});

export const config = configSchema.parse({
  port: process.env.PORT ? parseInt(process.env.PORT) : undefined,
  nodeEnv: process.env.NODE_ENV,
  weatherApiKey: process.env.WEATHER_API_KEY,
  redisUrl: process.env.REDIS_URL,
});