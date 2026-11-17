import { CorsOptions } from 'cors';
import { config } from './environment';

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || origin === config.clientUrl || origin === 'http://localhost:5173' || origin === 'http://localhost') {
      callback(null, true);
    } else {
      callback(new Error('Blocked by CORS policy'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

export default corsOptions;
