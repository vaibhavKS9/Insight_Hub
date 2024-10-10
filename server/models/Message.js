// models/message.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    profilePicture: { type: String }, // Assuming profile picture is a URL
});

const messageSchema = new mongoose.Schema({
    text: { type: String, required: true },
    user: { type: userSchema, required: true }, // Use the userSchema as a nested object
    sentTime: { type: Date, default: Date.now },
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
