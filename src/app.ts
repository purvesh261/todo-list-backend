import express from 'express';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import authRoutes from './routes/auth.routes.js';
import protectedRoutes from './routes/protected.routes.js';
import { errorHandler } from './middleware/error.middleware.js';
import { swaggerSpec } from './config/swagger.js';
import { rateLimit } from 'express-rate-limit';
import cors from 'cors';
const app = express();

app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Public routes
app.use('/api/auth', authRoutes);

// Protected routes
app.use('/api', protectedRoutes);

const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 100
});

app.use(limiter);

app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(errorHandler);

export default app;