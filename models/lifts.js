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
      weightLifted: Number,
      sets: { type: Number, default: 1 },
      reps: { type: Number, default: 1 },
      notes: String,
    },
    squat: {
      weightLifted: Number,
      sets: { type: Number, default: 1 },
      reps: { type: Number, default: 1 },
      notes: String,
    },
    deadlift: {
      weightLifted: Number,
      sets: { type: Number, default: 1 },
      reps: { type: Number, default: 1 },
      notes: String,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    }
  },
  { timestamps: true }
);

module.exports = Lift = mongoose.model("Lift", liftsSchema);
