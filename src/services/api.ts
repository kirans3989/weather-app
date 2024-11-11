import axios from 'axios';
import type { SearchResult, WeatherData } from '../types/weather';

const API_KEY = '5e0e83f9921c5a3093852941b097c93d';
const BASE_URL = 'https://api.openweathermap.org';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  params: {
    appid: API_KEY,
    units: 'metric'
  }
});

export const weatherApi = {
  async searchLocations(query: string): Promise<SearchResult[]> {
    if (!query || query.length < 2) {
      return [];
    }

    try {
      const { data } = await api.get('/geo/1.0/direct', {
        params: {
          q: query,
          limit: 5
        }
      });

      return data.map((item: any) => ({
        id: `${item.lat}-${item.lon}`,
        name: item.name,
        country: item.country,
        lat: Number(item.lat),
        lon: Number(item.lon)
      }));
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Failed to search locations';
      throw new Error(error);
    }
  },

  async getWeather(lat: number, lon: number): Promise<WeatherData> {
    try {
      const [currentResponse, forecastResponse] = await Promise.all([
        api.get('/data/2.5/weather', {
          params: { lat, lon }
        }),
        api.get('/data/2.5/forecast', {
          params: { lat, lon }
        })
      ]);

      const current = currentResponse.data;
      const forecast = forecastResponse.data;

      return {
        current: {
          temp: Number(current.main.temp),
          humidity: Number(current.main.humidity),
          windSpeed: Number(current.wind.speed),
          description: String(current.weather[0].description),
          icon: `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`
        },
        forecast: forecast.list
          .filter((_: any, index: number) => index % 8 === 0)
          .slice(0, 3)
          .map((day: any) => ({
            date: new Date(day.dt * 1000).toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric'
            }),
            temp: Number(day.main.temp),
            description: String(day.weather[0].description),
            icon: `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`
          }))
      };
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Failed to fetch weather data';
      throw new Error(error);
    }
  }
};