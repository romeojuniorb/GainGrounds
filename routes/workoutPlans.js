const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn } = require('../middleware');

const WorkoutPlan = require('../models/workoutPlan');

router.get('/workoutPlans', isLoggedIn, catchAsync(async (req, res) => {
    const plans = await WorkoutPlan.find({});
    res.render('workoutPlans/index', { plans })
}));

router.get('/new', isLoggedIn, catchAsync(async (req, res) => {
    res.render('workoutPlans/new');
}))

router.post('/workoutPlans', isLoggedIn, catchAsync(async (req, res) => {
    const { title, description, exercises } = req.body; // Correct the typo here
    const userId = req.user._id;
    const newWorkoutPlan = new WorkoutPlan({ userId, title, description, exercises });
    await newWorkoutPlan.save();

    req.flash('success', 'Successfully created a new workout plan!'); 
    res.redirect('/workoutPlans');
}));

// Editing
router.get('/workoutPlans/:id/edit', isLoggedIn, async(req, res) => {
    const workoutPlan = await WorkoutPlan.findById(req.params.id);
    res.render('workoutPlans/edits', { plans });
})
module.exports = router;
