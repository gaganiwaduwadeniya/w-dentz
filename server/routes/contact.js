import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

// POST /api/contact - Submit a contact form
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, service, message } = req.body;
        const newContact = await Contact.create({ name, email, phone, service, message });
        res.status(201).json({
            success: true,
            message: 'Thank you! Your message has been received. We will get back to you shortly.',
            data: newContact,
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ success: false, message: error.message });
        }
        console.error('Contact POST error:', error);
        res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
});

// GET /api/contact - Get all contacts (admin)
router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.findAll();
        res.json({ success: true, data: contacts });
    } catch (error) {
        console.error('Contact GET error:', error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
});

// DELETE /api/contact/:id - Delete a contact
router.delete('/:id', async (req, res) => {
    try {
        await Contact.deleteById(req.params.id);
        res.json({ success: true, message: 'Contact deleted.' });
    } catch (error) {
        console.error('Contact DELETE error:', error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
});

export default router;
