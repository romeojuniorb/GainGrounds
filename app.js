const express = require("express");
const ExpressError = require('./utils/ExpressError');
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const User = require("./models/user");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require("express-session");
const flash = require("connect-flash");
const app = express();
const userRoutes = require("./routes/users");

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/usersDb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB!"))
  .catch((error) => console.log(error.message));

// Set up EJS Mate for EJS layout support
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware to parse body
app.use(express.urlencoded({ extended: true }));

// Session configuration
const sessionConfig = {
  secret: "your_secret_here",
  resave: false,
  saveUninitialized: true,
};
app.use(session(sessionConfig));
app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes
app.use("/", userRoutes);

// Middleware for method override
app.use(methodOverride("_method"));

// Middleware to serve static files
app.use(express.static(path.join(__dirname, "public")));

// Root route
app.get("/", (req, res) => {
  res.render("home");
});

// View pages
app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

app.get("/progress", (req, res) => {
  res.render("progress");
});

app.all('*', (req, res, next) => {
  next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = 'Oh No, Something Went Wrong!'
  res.status(statusCode).render('error', { err })
})

// Listen on port 3000
app.listen(3000, () => {
  console.log("Serving on port 3000");
});