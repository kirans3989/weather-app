import React, { useEffect, useState } from 'react';
import type { SearchResult, WeatherData } from '../types/weather';
import { WeatherCard } from './WeatherCard';
import { ForecastList } from './ForecastList';
import { WeatherBackground } from './WeatherBackground';
import { weatherApi } from '../services/api';
import { Loader } from 'lucide-react';

interface WeatherDisplayProps {
  location: SearchResult;
}

export function WeatherDisplay({ location }: WeatherDisplayProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await weatherApi.getWeather(location.lat, location.lon);
        setWeather(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [location]);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-12">
        <div className="flex items-center gap-3 text-blue-600">
          <Loader className="h-8 w-8 animate-spin" />
          <span className="text-lg font-medium">Loading weather data...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-100 rounded-xl p-6 text-red-600">
        <p className="font-medium">Error loading weather data</p>
        <p className="text-sm mt-1 text-red-500">{error}</p>
      </div>
    );
  }

  if (!weather) {
    return null;
  }

  return (
    <>
      <WeatherBackground condition={weather.current.description} />
      <div className="space-y-6 animate-fadeIn">
        <WeatherCard data={weather} location={`${location.name}, ${location.country}`} />
        <ForecastList forecast={weather.forecast} />
      </div>
    </>
  );
}