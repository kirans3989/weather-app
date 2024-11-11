import React from 'react';
import { Calendar } from 'lucide-react';
import type { WeatherData } from '../types/weather';

interface ForecastListProps {
  forecast: WeatherData['forecast'];
}

export const ForecastList: React.FC<ForecastListProps> = ({ forecast }) => {
  return (
    <div className="mt-8">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="h-5 w-5 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-800">3-Day Forecast</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {forecast.map((day, index) => (
          <div
            key={index}
            className="glass-card rounded-xl p-6 transition-transform duration-300 hover:scale-105"
          >
            <p className="font-medium text-gray-600 mb-4">{day.date}</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-gray-800 mb-2">
                  {Math.round(day.temp)}°C
                </p>
                <p className="text-gray-600 capitalize">{day.description}</p>
              </div>
              <img
                src={day.icon}
                alt={day.description}
                className="w-16 h-16 weather-icon"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};