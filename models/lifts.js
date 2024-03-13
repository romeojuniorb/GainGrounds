const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const liftsSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
      index: true,
    },
    bench: {
      weightLifted: {
        type: Number,

        min: [0, "Weight must be a positive number"],
      },
      sets: { type: Number, default: 1 },
      reps: { type: Number, default: 1 },
      notes: String,
    },
    squat: {
      weightLifted: {
        type: Number,

        min: [0, "Weight must be a positive number"],
      },
      sets: { type: Number, default: 1 },
      reps: { type: Number, default: 1 },
      notes: String,
    },
    deadlift: {
      weightLifted: {
        type: Number,

        min: [0, "Weight must be a positive number"],
      },
      sets: { type: Number, default: 1 },
      reps: { type: Number, default: 1 },
      notes: String,
    },
  },
  { timestamps: true }
);

module.exports = Lift = mongoose.model('Lift', liftsSchema);
