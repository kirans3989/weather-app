import React from 'react';

interface WeatherBackgroundProps {
  condition: string;
}

export function WeatherBackground({ condition }: WeatherBackgroundProps) {
  const getBackgroundClass = (condition: string): string => {
    const lowerCondition = condition.toLowerCase();
    if (lowerCondition.includes('clear')) return 'clear';
    if (lowerCondition.includes('cloud')) return 'clouds';
    if (lowerCondition.includes('rain')) return 'rain';
    if (lowerCondition.includes('snow')) return 'snow';
    if (lowerCondition.includes('thunder')) return 'thunderstorm';
    if (lowerCondition.includes('mist') || lowerCondition.includes('fog')) return 'mist';
    return 'clear';
  };

  return (
    <div className={`weather-background ${getBackgroundClass(condition)}`} />
  );
}