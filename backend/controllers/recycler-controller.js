const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");
const Recycler = require("../models/recycler");
const User = require("../models/user");

const getUsingID = async (req, res) => {
  var { id } = req.params;
  let data;
  try {
    data = await Recycler.find({ _id: id });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return error;
  }

  res.status(201).json({ data });
};

const getRecyclers = async (req, res) => {
  var { city } = req.body;
  city = city.toLowerCase();
  console.log(city);
  let data;
  try {
    data = await Recycler.find({ city: city });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return error;
  }

  res.status(201).json({ data });
};

const addRecycler = async (req, res) => {
  const userId = req.userData.userId;
  const { name, email, city, acceptedEWaste, serviceAreas, pricingPerKg } =
    req.body;

  let foundUser;
  try {
    foundUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return error;
  }

  // Create a new recycler instance
  const newRecycler = new Recycler({
    name,
    city: city.toLowerCase(),
    acceptedEWaste,
    serviceAreas,
    pricingPerKg,
    testimonials: [],
    customerRating: "",
    user: userId,
  });

  try {
    await newRecycler.save();
  } catch (err) {
    const error = new HttpError(
      "Adding recycler failed, please try again later.",
      500
    );
    return error;
  }

  res.status(201).json({ recycler: newRecycler.toObject({ getters: true }) });
};

exports.addRecycler = addRecycler;
exports.getRecyclers = getRecyclers;
exports.getUsingID = getUsingID;
