const express = require('express');
const router = express.Router();
const Lift = require('../models/lift'); 
const catchAsync = require('../utils/catchAsync');

router.post('/lifts', catchAsync(async (req, res) => {
    const lift = new Lift(req.body); 
    await lift.save();
    req.flash('success', 'Successfully added a new lift record!'); 
    res.redirect('/lifts'); 
}));

router.get('/lifts', catchAsync(async (req, res) => {
    const lifts = await Lift.find({});
    res.render('lifts', { lifts }); 
}));

module.exports = router;

