// server/models/Project.js

const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    projectType: {
        type: String,
        required: true,
        enum: ['youtube', 'amazon', 'linkedin'],
    },
    projectLink: {
        type: String,
        required: true,
    },
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
