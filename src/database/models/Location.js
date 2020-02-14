const mongoose = require('mongoose');

const { Schema } = mongoose;
const image = require('./Image');

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
  images: [image],
  description: String,
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  startDate: { type: Date },
  endDate: { type: Date },
  latitude: requiredNumber,
  longitude: requiredNumber,
  meta: {
    votes: Number,
    favs: Number,
  },
}, {
  timestamps: true,
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
