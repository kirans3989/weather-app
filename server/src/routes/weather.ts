import { Router } from 'express';
import { z } from 'zod';
import { WeatherService } from '../services/weather.js';

const router = Router();
const weatherService = new WeatherService();

const searchSchema = z.object({
  q: z.string().min(2),
});

const locationSchema = z.object({
  lat: z.number(),
  lon: z.number(),
});

router.get('/search', async (req, res, next) => {
  try {
    const { q } = searchSchema.parse({ q: req.query.q });
    const locations = await weatherService.searchLocations(q);
    res.json(locations);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const { lat, lon } = locationSchema.parse({
      lat: Number(req.query.lat),
      lon: Number(req.query.lon),
    });

    const weather = await weatherService.getWeather(lat, lon);
    res.json(weather);
  } catch (error) {
    next(error);
  }
});

export { router as weatherRouter };