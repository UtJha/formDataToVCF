// backend/models/Data.js
const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumbers: { type: String, required: true }, // Comma-separated numbers
  emailAddresses: { type: String, required: true }, // Comma-separated emails
  address: { type: String, required: true },
  organization: { type: String },
  birthday: { type: Date },
  notes: { type: String },
  socialProfiles: { type: String }, // Comma-separated profiles
  url: { type: String },
  photo: { type: String },
  nickname: { type: String },
  anniversary: { type: Date },
});

module.exports = mongoose.model('Data', dataSchema);
