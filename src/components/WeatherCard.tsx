import React from 'react';
import { CloudRain, Thermometer, Wind, Droplets, MapPin } from 'lucide-react';
import type { WeatherData } from '../types/weather';

interface WeatherCardProps {
  data: WeatherData;
  location: string;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ data, location }) => {
  const { current } = data;

  return (
    <div className="glass-card rounded-2xl p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="weather-icon">
            <img
              src={current.icon}
              alt={current.description}
              className="w-20 h-20"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>
            <h2 className="text-5xl font-bold text-gray-800">
              {Math.round(current.temp)}°C
            </h2>
            <p className="text-lg text-gray-600 capitalize mt-1">
              {current.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Thermometer className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Temperature</p>
              <p className="text-lg font-semibold">{Math.round(current.temp)}°C</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-50 rounded-lg">
              <Wind className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Wind Speed</p>
              <p className="text-lg font-semibold">{Math.round(current.windSpeed)} m/s</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-50 rounded-lg">
              <Droplets className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Humidity</p>
              <p className="text-lg font-semibold">{current.humidity}%</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-50 rounded-lg">
              <CloudRain className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Condition</p>
              <p className="text-lg font-semibold capitalize">{current.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};