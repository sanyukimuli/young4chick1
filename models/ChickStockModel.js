const mongoose = require('mongoose');

const chickStockSchema = new mongoose.Schema({
  chickType: { type: String, enum: ['Broiler', 'Layer'], required: true },
  chickCategory: { type: String, enum: ['Exotic', 'Local'], required: true },
  quantity: { type: Number, required: true, min: 1 },
  age: { type: Number, required: true, min: 0, max: 14},
feedAmount: { type: Number, required: true},
stockDate: { type:Date, required: true}
});

module.exports = mongoose.model('ChickStockModel', chickStockSchema);
