const mongoose = require('mongoose');

const { Schema } = mongoose;

const Image = require('./Image').schema;

// Reusable types
const requiredString = {
  type: String,
  required: true,
};
const requiredNumber = {
  type: Number,
  required: true,
};

const locationSchema = new Schema({
  title: requiredString,
  images: {
    type: [Image],
  },
  description: String,
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  startDate: { type: Date },
  endDate: { type: Date },
  latitude: {
    ...requiredNumber,
    min: -90,
    max: 90,
  },
  longitude: {
    ...requiredNumber,
    min: -180,
    max: 180,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
}, {
  timestamps: true,
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
