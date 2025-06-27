const mongoose = require('mongoose');

const SubOptionSchema = new mongoose.Schema({
    name: String,
    time: String,
    cost: Number
});

const TreatmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    subOptions: [SubOptionSchema]

});

module.exports = mongoose.model('Treatment', TreatmentSchema);