import express from 'express';
import { db, admin } from '../config/firebase.js';

const router = express.Router();

const COLLECTION = 'doctorAvailability';
const DOCUMENT_ID = 'schedule';

// Middleware to verify Firebase token
const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Invalid token', error: error.message });
    }
};

// GET: Fetch current availability
router.get('/', async (req, res) => {
    try {
        const docRef = db.collection(COLLECTION).doc(DOCUMENT_ID);
        const docSnap = await docRef.get();

        if (docSnap.exists) {
            const data = docSnap.data();
            // Convert to array format
            const availabilityArray = Object.keys(data)
                .filter(key => key !== 'lastUpdated')
                .map(day => ({
                    day,
                    ...data[day]
                }));
            return res.status(200).json(availabilityArray);
        } else {
            // Return default availability if not found
            return res.status(200).json(getDefaultAvailability());
        }
    } catch (error) {
        console.error('Error fetching availability:', error);
        res.status(500).json({ success: false, message: 'Error fetching availability', error: error.message });
    }
});

// POST: Update availability (admin only)
router.post('/', verifyToken, async (req, res) => {
    try {
        const availabilityArray = req.body;

        if (!Array.isArray(availabilityArray)) {
            return res.status(400).json({ success: false, message: 'Availability must be an array' });
        }

        // Convert array to object format for Firestore
        const availabilityObject = {
            lastUpdated: admin.firestore.FieldValue.serverTimestamp(),
        };

        availabilityArray.forEach(item => {
            const { day, available, workingHours } = item;
            availabilityObject[day] = {
                available: available || false,
                workingHours: workingHours || '',
            };
        });

        // Update Firestore
        const docRef = db.collection(COLLECTION).doc(DOCUMENT_ID);
        await docRef.set(availabilityObject, { merge: true });

        res.status(200).json({
            success: true,
            message: 'Availability updated successfully',
            data: availabilityArray,
        });
    } catch (error) {
        console.error('Error updating availability:', error);
        res.status(500).json({ success: false, message: 'Error updating availability', error: error.message });
    }
});

// Helper function: Get default availability
function getDefaultAvailability() {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return days.map(day => ({
        day,
        available: day !== 'Sunday',
        workingHours: '9:00 AM - 6:00 PM',
    }));
}

export default router;
