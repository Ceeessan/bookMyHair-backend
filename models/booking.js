const mongoose = require('mongoose');
const validator = require('validator');

const bookingSchema = new mongoose.Schema({
    treatment: { type: mongoose.Schema.Types.ObjectId, ref: 'Treatment', required: true },
    dateTime: { type: String, required: true },
    customerName: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function (v) {
                return /^[a-zA-ZåäöÅÄÖ\s]+$/.test(v);
            }
        }
    },
    customerEmail: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return validator.isEmail(v);
            }
        }
    },
    message: {
        type: String,
        trim: true,
        maxLength: 500,
    },
    cancelToken: { type: String, required: true }
});

module.exports = mongoose.model('Booking', bookingSchema);