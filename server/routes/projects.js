// server/routes/projects.js

const express = require('express');
const router = express.Router();
const { Project } = require('../models');  // Import Project from models

// POST route to add a new project
router.post('/', async (req, res) => {
    try {
        const { userId, name, email, projectType, projectLink } = req.body;
        const project = new Project({
            userId,
            name,
            email,
            projectType,
            projectLink,
        });
        await project.save();
        res.status(201).json(project);
    } catch (error) {
        console.error('Error adding project:', error);
        res.status(500).json({ message: 'Error adding project' });
    }
});

// GET route to fetch projects by userId
router.get('/', async (req, res) => {
    try {
        const userId = req.query.userId;
        const projects = await Project.find({ userId });
        res.status(200).json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ message: 'Error fetching projects' });
    }
});

module.exports = router;
