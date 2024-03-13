const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const Lift = require('../models/lifts'); // Make sure to require your Lift model

router.post('/lifts', catchAsync(async (req, res) => {
    try {
        const liftData = req.body;
        const lift = new Lift(liftData);
        await lift.save();
        res.redirect('/');
    } catch(e){
        res.status(400).send('Error submitting lifts');
    }
}));

module.exports = router;
