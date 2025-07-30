const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    treatment: { type: mongoose.Schema.Types.ObjectId, ref: 'Treatment', required: true },
    dateTime: { type: String, required: true },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    message: String,
    cancelToken: { type: String, required: true }
});

module.exports = mongoose.model('booking', bookingSchema);