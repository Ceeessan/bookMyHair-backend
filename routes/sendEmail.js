const express = require('express');
const router = express.Router();
const sendConfirmationEmail = require('../mailer/mailer');

router.get('/test-mail', async (req, res) => {
    const testEmail = 'cessan.94@gmail.com';
    const fakeBookingId = 'ABC123';
    const fakeToken = 'test-token-123456';

    try {
        await sendConfirmationEmail(testEmail, fakeBookingId, fakeToken);
        res.status(200).send('Mail har skickats!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Something went wrongt with sending an email..')
    }
});

module.exports = router;