// models/Tool.js
const mongoose = require('mongoose');

const rentalRequestSchema = new mongoose.Schema({
    renterId:   { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    startDate:  { type: Date, required: true }, // The starting point
    durationHours: { type: Number, required: true, min: 1, max: 96 }, // up to 4 days
    status: {
      type: String,
      enum: ['pending', 'approved'],
      default: 'pending'
    }
  });

const toolSchema = new mongoose.Schema({
  owner:       { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  title:       { type: String, required: true },
  category:    { type: String },
  rentPerDay:  { type: Number, required: true },
  image:       { type: String }, // Single image URL
  rentalRequests: [rentalRequestSchema] // Embedded rental requests
}, { timestamps: true });

module.exports = mongoose.model('Tool', toolSchema);
