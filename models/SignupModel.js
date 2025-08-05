const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const signupSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  age: { type: Number, required: true, min:18, max:30},
  gender: { type: String, required: true, enum: ['male', 'female', 'other'] },
  nin: { type: String, required: true, unique: true },
  recFirstName: { type: String, required: true },
  recLastName: { type: String, required: true },
  recNin: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

signupSchema.plugin(passportLocalMongoose, {
  usernameField: 'email' 
});

module.exports = mongoose.model('SignupUser', signupSchema);
