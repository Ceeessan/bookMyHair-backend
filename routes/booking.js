const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const sendConfirmationEmail = require('../mailer/mailer');
const crypto = require('crypto');
const sanitizeHtml = require('sanitize-html');

router.post('/', async (req, res) => {
    console.log('POST body:', req.body);
    const cleanMessage = sanitizeHtml(req.body.message || '', {
        allowedTags: [],
        allowedAttributes: {}
    });
    try {

        //Create a token for cancel appointemt
        const cancelToken = crypto.randomBytes(16).toString('hex');

        const bookingData = {
            ...req.body,
            message: cleanMessage,
            cancelToken
        };

        const newBooking = new Booking(bookingData);
        const savedBooking = await newBooking.save();

        //Send confirmation-mail
        await sendConfirmationEmail(savedBooking.customerEmail, savedBooking._id, cancelToken)

        res.status(201).json(savedBooking);
    } catch (error) {
        console.error('Error saving booking:', error);
        res.status(400).json({ error: 'Problem with saving a new booking' });
    }
});

router.get('/', async (req, res) => {

    try {
        const bookings = await Booking.find().select('dateTime -_id').exec();

        const bookedDateTimes = bookings.map(b => b.dateTime);

        res.json(bookedDateTimes);
    } catch (err) {
        res.status(500).json({ error: 'Could not get bookings' });
    }
});

router.delete('/cancel', async (req, res) => {
    const { token, email } = req.query;

    if (!token || !email) {
        return res.status(400).json({ error: 'Token and Email is required. ' });
    }

    try {
        const booking = await Booking.findOneAndDelete({
            customerEmail: email,
            cancelToken: token
        });

        if (!booking) {
            return res.status(404).json({ error: "Appointment could not be found or is already canceled" });
        }
        return res.status(200).json({ message: 'Din bokning har avbokats!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Ett fel inträffade vid avbokning." });
    }
})

module.exports = router;