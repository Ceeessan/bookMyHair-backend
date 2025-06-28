const mongoose = require('mongoose');

const DateTimeSchema = new mongoose.Schema({
    dayOfWeek: { type: String, enum: ['MÅN', 'TIS', 'ONS', 'TOR', 'FRE', 'LÖR', 'SÖN'] },
    times: { type: [String], required: true }
});

module.exports = mongoose.model('dateTime', DateTimeSchema);