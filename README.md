# Weather Dashboard

A modern weather application built with React, TypeScript, and OpenWeatherMap API. Features real-time weather data, location search, and 3-day forecasts.

## Important Note ⚠️

Before running the application, you need to:
1. Sign up at [OpenWeatherMap](https://openweathermap.org/api)
2. Get your API key from your account
3. Replace the placeholder API key in both `.env` files with your actual API key

## Features

- 🌍 Location search with autocomplete
- 🌡️ Real-time weather data
- 📅 3-day weather forecast
- 🎨 Beautiful, responsive UI
- 🚀 Docker support
- 📦 Redis caching for API responses

## Prerequisites

- Docker and Docker Compose
- OpenWeatherMap API key

## Environment Setup

1. Create a `.env` file in the root directory:
```env
VITE_WEATHER_API_KEY=your_openweathermap_api_key
VITE_API_URL=http://localhost:3000/api
```

2. Create a `.env` file in the `server` directory:
```env
PORT=3000
NODE_ENV=production
WEATHER_API_KEY=your_openweathermap_api_key
REDIS_URL=redis://redis:6379
```

## Docker Deployment

1. Build and start the application:
```bash
docker-compose up --build
```

2. Stop the application:
```bash
docker-compose down
```

The application will be available at `http://localhost:80`

## Deploy Weather Application in Kuberenetes

1. Build the EKS cluster

2. Create the Secret: Run the following command, replacing <API_KEY_VALUE> with your actual weather API key. 
```bash
kubectl create secret generic weather-api-secret --from-literal=WEATHER_API_KEY=<API_KEY_VALUE>
```
3. Create the pods, go to the Conainer folder under Weather-app registery folder. 
```bash
kubectl apply -f .
```

The application will be available at `http://Frontend_EKS_Loadbalancere:80`

## Development Without Docker

1. Install dependencies:
```bash
npm install
cd server && npm install
```

2. Start the development server:
```bash
# Start frontend
npm run dev

# Start backend (in a separate terminal)
cd server && npm run dev
```

## Architecture

- Frontend: React + TypeScript + Vite
- Backend: Node.js + Express
- Cache: Redis
- Containerization: Docker + Docker Compose

## Troubleshooting

### Common Issues

1. **API Key Invalid Error**
   - Make sure you've replaced the placeholder API key with your actual OpenWeatherMap API key
   - Verify your API key is active in your OpenWeatherMap account
   - Wait a few hours after creating a new API key as it may take time to activate

2. **Connection Issues**
   - Ensure all required ports (80, 3000, 6379) are available
   - Check if Docker services are running: `docker-compose ps`
   - Verify network connectivity: `docker network ls`

3. **Redis Connection**
   - Verify Redis is running: `docker-compose logs redis`
   - Check Redis connection string in server/.env

## License

MIT
