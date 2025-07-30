const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'cessan.94@gmail.com',
        pass: process.env.EMAIL_PASS
    }
});

async function sendConfirmationEmail(toEmail, bookingId, cancelToken) {
    const mailOptions = {
        from: '"bookMyHair" <cessan.94@gmail.com>',
        to: toEmail,
        subject: 'Bokningsbekräftelse',
        html:
            `<h3> Tack för din bokning! </h3>
        <p> Din bokning: ${bookingId}
        <p> För att avboka din tid, klicka på länken nedan: </p>
        <a href="https://bookmyhair.netlify.app/cancel-appointment?token=${cancelToken}&email=${toEmail}"> Avboka din tid </a>
        `
    };

    await transporter.sendMail(mailOptions);
}

module.exports = sendConfirmationEmail;