import axios from 'axios';
import { redis } from '../lib/redis.js';
import { config } from '../config.js';
import type { WeatherData } from '../types/weather.js';

const CACHE_TTL = 1800; // 30 minutes

export class WeatherService {
  private readonly apiKey: string;

  constructor() {
    this.apiKey = config.weatherApiKey;
  }

  async searchLocations(query: string) {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/search.json?key=${this.apiKey}&q=${encodeURIComponent(query)}`
      );

      return response.data.map((item: any) => ({
        name: item.name,
        country: item.country,
        lat: item.lat,
        lon: item.lon,
      }));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error?.message || 'Failed to search locations');
      }
      throw error;
    }
  }

  async getWeather(lat: number, lon: number): Promise<WeatherData> {
    const cacheKey = `weather:${lat}:${lon}`;
    
    try {
      // Try to get from cache
      if (redis) {
        const cached = await redis.get(cacheKey);
        if (cached) {
          return JSON.parse(cached);
        }
      }

      // Fetch from API
      const response = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${this.apiKey}&q=${lat},${lon}&days=5`
      );

      const weather = this.transformWeatherData(response.data);

      // Cache the result
      if (redis) {
        await redis.setEx(cacheKey, CACHE_TTL, JSON.stringify(weather));
      }

      return weather;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error?.message || 'Failed to fetch weather data');
      }
      throw error;
    }
  }

  private transformWeatherData(data: any): WeatherData {
    return {
      location: `${data.location.name}, ${data.location.country}`,
      temperature: data.current.temp_c,
      condition: data.current.condition.text,
      humidity: data.current.humidity,
      windSpeed: data.current.wind_kph,
      forecast: data.forecast.forecastday.map((day: any) => ({
        date: day.date,
        maxTemp: day.day.maxtemp_c,
        minTemp: day.day.mintemp_c,
        condition: day.day.condition.text,
      })),
    };
  }
}