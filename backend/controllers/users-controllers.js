const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const HttpError = require("../models/http-error");
const User = require("../models/user");
const Booking = require("../models/booking");

// async function getBookings(req, res) {
//   const userId = req.userData.userId;

//   let user;
//   try {
//     const user = await User.findById(userId).populate("bookings");
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.json({ bookings: user.bookings });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Fetching bookings failed, please try again later" });
//   }
// }

const signup = async (req, res) => {
  const {
    type,
    name,
    email,
    password,
    contactNumber,
    address,
    eWastePreferences,
  } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return error;
  }

  if (existingUser) {
    const error = new HttpError(
      "User exists already, please login instead.",
      422
    );
    return error;
  }

  let hashedPassword;
  try {
    var salt = bcrypt.genSaltSync(12);
    var hash = bcrypt.hashSync(password, salt);
    hashedPassword = hash;
  } catch (err) {
    const error = new HttpError(err, 500);
    return error;
  }

  const createdUser = new User({
    type,
    name,
    email,
    password: hashedPassword,
    contactNumber,
    bookings: [{}],
    address,
    eWastePreferences,
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return error;
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      "my_super_secret_hash_password",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return error;
  }

  res.status(201).json({
    userId: createdUser.id,
    role: createdUser.type,
    email: createdUser.email,
    token: token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return error;
  }

  if (!existingUser) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      403
    );
    return error;
  }

  let isValidPassword = false;
  try {
    isValidPassword = bcrypt.compareSync(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      "Could not log you in, please check your credentials and try again.",
      500
    );
    return error;
  }

  if (!isValidPassword) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      403
    );
    return error;
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      "my_super_secret_hash_password",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return error;
  }

  res.json({
    userId: existingUser.id,
    role: existingUser.type,
    email: existingUser.email,
    token: token,
  });
};

async function bookSlot(req, res) {
  const userId = req.userData.userId;
  const { eWasteCategory, quantity, userType, date } = req.body;

  if (!eWasteCategory || !quantity || !userType || !date) {
    return new HttpError(
      "Invalid input. Please provide all required fields.",
      400
    );
  }

  let user;
  try {
    user = await User.findById(userId);
    if (!user) {
      return next(new HttpError("User not found.", 404));
    }
  } catch (err) {
    return next(
      new HttpError("Fetching user failed, please try again later.", 500)
    );
  }

  const newBooking = new Booking({
    eWasteCategory,
    quantity,
    userType,
    date,
    user: userId,
  });

  try {
    await newBooking.save();

    user.bookings.push(newBooking._id);
    await user.save();

    res.status(201).json({ booking: newBooking });
  } catch (err) {
    return next(new HttpError("Booking slot failed, please try again.", 500));
  }
}

exports.getBookings = getBookings;
exports.signup = signup;
exports.login = login;
exports.bookSlot = bookSlot;
