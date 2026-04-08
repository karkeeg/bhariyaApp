const mongoose = require('mongoose');

const loadSchema = new mongoose.Schema({
  origin: {
    type: String,
    required: [true, 'Origin is required'],
    trim: true
  },
  originCoordinates: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],  // [longitude, latitude]
      required: true
    }
  },
  destination: {
    type: String,
    required: [true, 'Destination is required'],
    trim: true
  },
  weight: {
    type: Number,
    required: [true, 'Weight is required']
  },
  vehicleTypeRequired: {
    type: String,
    required: [true, 'Vehicle type is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Price is required']
  },
  status: {
    type: String,
    enum: ['PENDING', 'ACCEPTED'],
    default: 'PENDING'
  },
  driverId: {
    type: String,
    default: null
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

loadSchema.index({ originCoordinates: '2dsphere' });

module.exports = mongoose.model('Load', loadSchema);
