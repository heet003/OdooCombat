const express = require("express");
const checkAuth = require("../middleware/check-auth");

const recyclerController = require("../controllers/recycler-controller");

const router = express.Router();

router.get("/:id", recyclerController.getUsingID);

router.post("/", recyclerController.getRecyclers);

router.use(checkAuth);

router.post("/add", recyclerController.addRecycler);

module.exports = router;
