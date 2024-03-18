const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bodyMeasurementsSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
      index: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
    },
    BMI: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = Measurements = mongoose.model("Measurements", bodyMeasurementsSchema);
