const express = require("express");
const router = express.Router();
const bodyMeasurements = require("../models/bodyMeasurement");
const { isLoggedIn } = require("../middleware");
const catchAsync = require("../utils/catchAsync");


router.post(
  "/bodyMeasurements",
  isLoggedIn,
  catchAsync(async (req, res) => {
    try {
      const newMeasurements = new Measurements(req.body);
      await newMeasurements.save();
      res.redirect("/progress");
    } catch (error) {
      console.log("Error saving measurements data", error);
      res.status(500).send("Server error");
    }
  })
);

module.exports = router;
