import { db } from '../config/firebase.js';

const COLLECTION = 'contacts';

/**
 * Contact model for Firebase Firestore
 * Replaces the Mongoose model with Firestore operations
 */
const Contact = {
    /**
     * Validate and create a new contact document
     */
    async create({ name, email, phone, service, message }) {
        // Validation
        const errors = [];
        if (!name || !name.trim()) errors.push('Name is required');
        if (!email || !email.trim()) errors.push('Email is required');
        if (email && !/^\S+@\S+\.\S+$/.test(email)) errors.push('Please enter a valid email');
        if (!message || !message.trim()) errors.push('Message is required');
        if (name && name.length > 100) errors.push('Name must be under 100 characters');
        if (message && message.length > 1000) errors.push('Message must be under 1000 characters');

        if (errors.length > 0) {
            const err = new Error(errors.join(', '));
            err.name = 'ValidationError';
            throw err;
        }

        const docData = {
            name: name.trim(),
            email: email.trim().toLowerCase(),
            phone: phone?.trim() || '',
            service: service?.trim() || '',
            message: message.trim(),
            createdAt: new Date().toISOString(),
        };

        const docRef = await db.collection(COLLECTION).add(docData);
        return { id: docRef.id, ...docData };
    },

    /**
     * Get all contacts, sorted by creation date (newest first)
     */
    async findAll() {
        const snapshot = await db
            .collection(COLLECTION)
            .orderBy('createdAt', 'desc')
            .get();

        return snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
    },

    /**
     * Get a single contact by ID
     */
    async findById(id) {
        const doc = await db.collection(COLLECTION).doc(id).get();
        if (!doc.exists) return null;
        return { id: doc.id, ...doc.data() };
    },

    /**
     * Delete a contact by ID
     */
    async deleteById(id) {
        await db.collection(COLLECTION).doc(id).delete();
        return true;
    },
};

export default Contact;
