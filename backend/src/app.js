require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const { requireAdmin, verifyOrigin } = require('./middleware/auth');

const app = express();
app.disable('x-powered-by');

app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json({ limit: '500kb' }));
app.use(cookieParser());

// Health check endpoint
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Public routes
app.use('/api', require('./routes/publicRoutes'));

// Auth routes with rate limiting
app.use(
  '/api/auth',
  verifyOrigin,
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 15,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
  }),
  require('./routes/authRoutes')
);

// Admin routes
app.use('/api/admin', verifyOrigin, requireAdmin, require('./routes/adminRoutes'));

// 404 handler
app.use((req, res) => res.status(404).json({ error: 'Route not found' }));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;
