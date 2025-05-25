import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import protectedRoutes from './routes/protected.routes.js';
import { errorHandler } from './middleware/error.middleware.js';

const app = express();

app.use(express.json());
app.use(cookieParser());

// Public routes
app.use('/api/auth', authRoutes);

// Protected routes
app.use('/api', protectedRoutes);

app.use(errorHandler);

export default app;