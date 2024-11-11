import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { weatherRouter } from './routes/weather.js';
import { errorHandler } from './middleware/error.js';
import { config } from './config.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use('/api/weather', weatherRouter);

// Error handling
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Weather service running on port ${config.port}`);
});