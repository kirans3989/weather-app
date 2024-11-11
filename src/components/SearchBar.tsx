import React, { useState } from 'react';
import { Search, MapPin, Loader } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';
import { weatherApi } from '../services/api';
import type { SearchResult } from '../types/weather';

interface SearchBarProps {
  onSearch: (location: SearchResult) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearchQuery = async (value: string) => {
    if (!value || value.length < 2) {
      setResults([]);
      setError(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const locations = await weatherApi.searchLocations(value);
      setResults(locations);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useDebounce(handleSearchQuery, 300);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for a city..."
          className="search-input"
          aria-label="Search locations"
        />
        <div className="absolute left-4 top-3.5">
          {loading ? (
            <Loader className="h-5 w-5 text-blue-500 animate-spin" />
          ) : (
            <Search className="h-5 w-5 text-gray-400" />
          )}
        </div>
      </div>

      {error && (
        <div className="mt-2 p-3 bg-red-50 border border-red-100 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      {results.length > 0 && (
        <div className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
          {results.map((result) => (
            <button
              key={result.id}
              onClick={() => {
                onSearch(result);
                setQuery('');
                setResults([]);
              }}
              className="location-button"
            >
              <MapPin className="h-5 w-5 text-gray-400" />
              <span>{result.name}, {result.country}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}