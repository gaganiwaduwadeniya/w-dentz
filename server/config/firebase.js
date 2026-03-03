import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

// Initialize Firebase Admin
// Option 1: Using service account JSON file (recommended for production)
// Place your serviceAccountKey.json in the server/ folder
let serviceAccount;
try {
    const serviceAccountPath = resolve(__dirname, '..', 'serviceAccountKey.json');
    serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
    console.log('✅ Firebase initialized with service account key');
} catch (err) {
    // Option 2: Using environment variables (fallback)
    if (process.env.FIREBASE_PROJECT_ID) {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            }),
        });
        console.log('✅ Firebase initialized with environment variables');
    } else {
        console.log('⚠️  No Firebase credentials found. Using emulator/default.');
        admin.initializeApp();
    }
}

const db = admin.firestore();

export { admin, db };
