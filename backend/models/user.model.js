const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  phoneNumber: {
    type: Number,
  },
  incognito: {
    type: Boolean,
    default: false
  },
  location: {
    longitude: {
      type: Number,
      default: 0
    },
    latitude: {
      type: Number,
      default: 0
    }
  },
  prefs: [Number],
  requests: [Number]
});

const User = mongoose.model('User', userSchema);

module.exports = User;