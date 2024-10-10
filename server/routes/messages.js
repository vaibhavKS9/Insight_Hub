// routes/messages.js
const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// POST route to add a new message
router.post('/', async (req, res) => {
    
    try {
        const { text, user } = req.body;
        const message = new Message({
            text,
            user,
            sentTime: new Date(), // Set the sentTime to the current time
        });
        await message.save();
        res.status(201).json(message);
    } catch (error) {
        console.error('Error adding message:', error);
        res.status(500).json({ message: 'Error adding message' });
    }
});

// GET route to fetch all messages
router.get('/', async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.status(200).json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ message: 'Error fetching messages' });
    }
});

module.exports = router;
