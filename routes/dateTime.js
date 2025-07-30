const express = require('express');
const router = express.Router();
const DateTime = require('../models/dateTime');

//POST day and time (just to ad date and time)
router.post('/', async (req, res) => {
    try {
        const newTime = new DateTime(req.body);
        await newTime.save();
        res.status(201).json(newTime);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//GET day & time
router.get('/', async (req, res) => {
    try {
        const allTimes = await DateTime.find();
        res.status(200).json(allTimes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

module.exports = router;