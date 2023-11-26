import helmet from 'helmet';
import cors from 'cors';

export const applySecurityMiddleware = app => {
  // Security-related HTTP headers
  app.use(helmet());

  // Allow cross-origin requests with CORS configuration
  const corsOptions = {
    origin: process.env.CORS_ORIGIN || '*', // TODO: Replace '*' with your domain in production
    optionsSuccessStatus: 200,
  };
  app.use(cors(corsOptions));
};
