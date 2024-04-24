const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn } = require("../middleware");
const { Workout } = require("../models/workout");

const preferences = [
  { key: "Type", value: ["Cardio", "Weights", "Calisthenics"] },
  { key: "Intensity", value: ["Low", "Medium", "High"] },
  { key: "Duration", value: ["Short", "Medium", "Long"] },
  { key: "Level", value: ["Beginner", "Intermediate", "Advanced"] },
];

const bodyParts = [
  {
    key: "Body Part",
    target: [
      "Upper",
      "Lower",
      "Core",
      "Back",
      "Chest",
      "Arms",
      "Legs",
      "Glutes",
      "Abs",
      "Shoulders",
      "Full-Body",
    ],
  },
];

router.get(
  "/workout",
  catchAsync(async (req, res) => {
    const workouts = await Workout.find({}).populate("userId");
    res.render("workout/index", { workout: workouts });
  })
);

router.get(
  "/new",
  isLoggedIn,
  catchAsync(async (req, res) => {
    res.render("workout/new", { preferences, bodyParts });
  })
);

function generateRandomPhotoUrl() {
  const collectionId = "22145713";
  return `https://source.unsplash.com/collection/${collectionId}/1600x900`;
}

const { check, validationResult } = require("express-validator");

router.post(
  "/workout",
  isLoggedIn,
  [
    check("workoutTitle", "Workout title is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
    check("exercises", "Exercises are required").isArray({ min: 1 }),
    check("exercises.*.name", "Each exercise must have a name").not().isEmpty(),
    check(
      "exercises.*.sets",
      "Sets must be a number and is required"
    ).isNumeric(),
    check(
      "exercises.*.reps",
      "Reps must be a number and is required"
    ).isNumeric(),
    check("bodyParts", "At least one body part is required").isArray({
      min: 1,
    }),
    check("preferences", "Preferences must be provided").optional().isObject(),
  ],
  catchAsync(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Handle errors
      req.flash(
        "error",
        errors
          .array()
          .map((e) => e.msg)
          .join("<br>")
      );
      return res.redirect("/workout/new");
    }

    const { workoutTitle, description, exercises, preferences, bodyParts } =
      req.body;
    const userId = req.user._id;
    const image = generateRandomPhotoUrl();

    const bodyPartsArray = bodyParts.map((name) => ({ name }));

    const newWorkout = new Workout({
      userId,
      workoutTitle,
      description,
      exercises,
      image,
      preferences: Object.keys(preferences || {}).map((key) => ({
        key,
        value: preferences[key],
      })),
      bodyParts: bodyPartsArray,
    });

    await newWorkout.save();
    req.flash("success", "Successfully created a new workout plan!");
    res.redirect("/workout");
  })
);

router.get(
  "/myWorkouts",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const userId = req.user._id;
    const workouts = await Workout.find({ userId: userId });
    res.render("workout/myWorkouts", { workout: workouts });
  })
);

router.get(
  "/workout/:id/edit",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const workout = await Workout.findById(req.params.id);
    if (!workout) {
      req.flash("error", "Cannot find that workout plan.");
      return res.redirect("/myWorkouts");
    }
    res.render("workout/edit", {
      workoutPlan: workout,
      preferences,
      bodyParts,
    });
  })
);

router.delete("/workout/:id", isLoggedIn, async (req, res) => {
  try {
    const { id } = req.params;
    await Workout.findByIdAndDelete(id);
    if (!res.headersSent) {
      res.status(200).send({ message: "Workout plan deleted successfully." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Server error, could not delete." });
  }
});

router.put("/workout/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const { workoutTitle, description, exercises } = req.body;

  try {
    console.log(req.body);
    const updatedPlan = {
      workoutTitle,
      description,
      exercises: exercises || [],
    };
    const result = await Workout.findByIdAndUpdate(id, updatedPlan, {
      new: true,
    });
    console.log(result);
    req.flash("success", "Successfully updated workout plan!");
    res.redirect("/myWorkouts");
  } catch (error) {
    console.error(error);
    req.flash("error", "Failed to update workout plan. Please try again.");
    res.redirect("/myWorkouts/" + id + "/edit");
  }
});

router.get(
  "/workout/:id",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const workout = await Workout.findById(id).populate("userId").populate('author');
    if (!workout) {
      req.flash("error", "Cannot find that workout plan.");
      return res.redirect("/workout");
    }
    res.render("workout/show", { workout, currentUser: req.user });
  })
);

module.exports = router;
