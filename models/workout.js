const mongoose = require("mongoose");

const preferenceSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    trim: true,
  },
  value: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
}, {_id: false}); 

const bodyPartSchema = new mongoose.Schema({
  name: String,
});

const workoutSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  workoutTitle: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  exercises: [
    {
      name: {
        type: String,
        required: true,
      },
      sets: {
        type: Number,
        required: true,
      },
      reps: {
        type: Number,
        required: true,
      },
      notes: {
        type: String,
      },
    },
  ],
  notes: {
    type: String,
  },
  image: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  preferences: [preferenceSchema],
  bodyParts: [bodyPartSchema], 
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = { Workout, preferenceSchema, bodyPartSchema };
