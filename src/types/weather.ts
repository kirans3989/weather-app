export interface SearchResult {
  id: string;
  name: string;
  country: string;
  lat: number;
  lon: number;
}

export interface WeatherData {
  current: {
    temp: number;
    humidity: number;
    windSpeed: number;
    description: string;
    icon: string;
  };
  forecast: Array<{
    date: string;
    temp: number;
    description: string;
    icon: string;
  }>;
}