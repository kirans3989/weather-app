import { createClient } from 'redis';
import { config } from '../config.js';

export const redis = config.redisUrl
  ? createClient({
      url: config.redisUrl,
    })
  : null;

if (redis) {
  redis.on('error', (err) => console.error('Redis Client Error', err));
  await redis.connect();
}