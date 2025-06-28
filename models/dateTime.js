const mongoose = require('mongoose');

const DateTimeSchema = new mongoose.Schema({
    day: { type: Date, required: true },
    dayOfWeek: { type: String, enum: ['MÅN', 'TIS', 'ONS', 'TOR', 'FRE', 'LÖR', 'SÖN'] },
    times: { type: [String], required: true }
});

module.exports = mongoose.model('dateTime', DateTimeSchema);