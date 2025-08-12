const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true},
    appointmentDate: { type: Date, required: true},
    appointmentTime: { type: String, required: true},
    chickType: { type: String, enum: ['Broiler', 'Layer'], required: true },
    farmerStatus: { type: String, enum: ['Starter Farmer', 'Returning Farmer'], required: true },
    chickCategory: { type: String, enum: ['Exotic', 'Local'], required: true },
    quantity: { type: Number, required: true, min: 1 },
    feedAmount: { type: Number, required: true, min: 0, max: 2 }

});

module.exports = mongoose.model('appointmentSchema', appointmentSchema);