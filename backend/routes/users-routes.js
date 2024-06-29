const express = require("express");
const checkAuth = require("../middleware/check-auth");

const usersController = require("../controllers/users-controllers");

const router = express.Router();

router.post("/signup", usersController.signup);

router.post("/login", usersController.login);

router.use(checkAuth);
// router.post("/getBook", usersController.getBookings);


router.post("/book-slot", usersController.bookSlot);


module.exports = router;
