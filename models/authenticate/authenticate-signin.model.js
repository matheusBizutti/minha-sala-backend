const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthenticateSigninSchema = new Schema({
  username: { type: String, required: true, max: 100 },
  password: { type: String, required: true }
});

module.exports = mongoose.model('AuthenticateSignin', AuthenticateSigninSchema);