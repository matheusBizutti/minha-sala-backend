const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthenticateSignupSchema = new Schema({
  username: { type: String, required: true, max: 100 },
  name: { type: String, required: true },
  password: { type: String, required: true },
  confirmpassword: { type: String, required: true }
});

module.exports = mongoose.model('AuthenticateSignup', AuthenticateSignupSchema);