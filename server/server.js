import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { db } from './config/firebase.js';
import contactRoutes from './routes/contact.js';
import availabilityRoutes from './routes/availability.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://wdentz.vercel.app', // Update with your actual Vercel URL
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/availability', availabilityRoutes);

// Health check
app.get('/api/health', async (req, res) => {
  try {
    // Quick Firestore connectivity check
    await db.collection('health').doc('ping').set({ timestamp: new Date() });
    res.json({ status: 'ok', message: 'W Dentz API is running', database: 'Firebase Firestore ✅' });
  } catch (err) {
    res.json({ status: 'ok', message: 'W Dentz API is running', database: 'Firebase not connected ⚠️' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
