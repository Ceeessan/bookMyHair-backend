const express = require('express');
const router = express.Router();
const Treatment = require('../models/treatments');

// POST to add treatment manually (just to ad treatments)
router.post('/', async (req, res) => {
    console.log('POST body:', req.body);
    try {
        const newTreatment = new Treatment(req.body);
        const savedTreatment = await newTreatment.save();
        res.status(201).json(savedTreatment);
    } catch (error) {
        res.status(400).json({ error: 'Problem with saving treatment' })
    }
});

// GET all treatments
router.get('/', async (req, res) => {
    try {
        const treatments = await Treatment.find();
        res.json(treatments);
    } catch (error) {
        res.status(500).json({ error: "Couldn't get treatments" });
    }
});




module.exports = router;