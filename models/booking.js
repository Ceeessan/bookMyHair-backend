const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    treatmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Treatment', required: true },
    dateTimeId: { type: mongoose.Schema.Types.ObjectId, ref: 'DateTime', required: true },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    message: String

})

module.exports = mongoose.model('booking', bookingSchema);