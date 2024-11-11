import React, { useState } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { SearchBar } from './components/SearchBar';
import { WeatherDisplay } from './components/WeatherDisplay';
import { Cloud } from 'lucide-react';
import type { SearchResult } from './types/weather';

export function App() {
  const [selectedLocation, setSelectedLocation] = useState<SearchResult | null>(null);

  return (
    <ErrorBoundary>
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-5xl mx-auto space-y-8">
          <header className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Cloud className="h-10 w-10 text-white" />
              <h1 className="text-4xl font-bold text-white">
                Weather Dashboard
              </h1>
            </div>
            <p className="text-white/90 max-w-md mx-auto">
              Get real-time weather updates and forecasts for any location worldwide
            </p>
          </header>

          <SearchBar onSearch={setSelectedLocation} />
          
          {selectedLocation && (
            <div className="mt-8 animate-fadeIn">
              <WeatherDisplay location={selectedLocation} />
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}