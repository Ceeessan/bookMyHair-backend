const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const sendConfirmationEmail = require('../mailer/mailer');
const crypto = require('crypto');


router.post('/', async (req, res) => {
    console.log('POST body:', req.body);
    try {

        //Create a token for cancel appointemt
        const cancelToken = crypto.randomBytes(16).toString('hex');

        const newBooking = new Booking({ ...req.body, cancelToken });
        const savedBooking = await newBooking.save();

        //Send confirmation-mail
        await sendConfirmationEmail(savedBooking.customerEmail, savedBooking._id, cancelToken)

        res.status(201).json(savedBooking);
    } catch (error) {
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
        res.json({ message: 'Appointment is now canceled' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong with the cancelling" });
    }
})

module.exports = router;