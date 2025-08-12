const mongoose = require('mongoose');

const chickRequestSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  ninNumber: { type: String, required: true, unique: true },
  chickType: { type: String, enum: ['Broiler', 'Layer'], required: true },
  farmerStatus: { type: String, enum: ['Starter Farmer', 'Returning Farmer'], required: true },
  chickCategory: { type: String, enum: ['Exotic', 'Local'], required: true },
  quantity: { type: Number, required: true, min: 1 },
  feedAmount: { type: Number, required: true, min: 0, max: 2 },
  status: { type: String, default: 'Pending' },
  requestDate: { type: Date, default: Date.now },
  appointmentDate: { Date},
  appointmentTime: {String},
  declineNotes: { type: String, default: '' } 
});

module.exports = mongoose.model('ChickRequestModel', chickRequestSchema);
