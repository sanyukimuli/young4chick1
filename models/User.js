const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  role: { type:String, required: true, enum: ['Farmer', 'Sales Rep', 'Manager']},
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  age: { type: Number, required: true, min:18},
  gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
  nin: { type: String, required: true, unique: true },
  recFirstName: { type: String, required: true },
  recLastName: { type: String, required: true },
  recNin: { type: String, required: true },
  phone: {type: String, required: true, unique: true},
  email: { type: String, required: true, unique: true },
});

userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email' 
});

module.exports = mongoose.model('User', userSchema);
