import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { db } from './config/firebase.js';
import contactRoutes from './routes/contact.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/contact', contactRoutes);

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
