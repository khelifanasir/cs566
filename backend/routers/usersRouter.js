const express = require("express");
const {
  login,
  signup,
  getAll,
  deleteUser,
  updateUser,
} = require("../controllers/usersController");
const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/user", getAll);
router.delete("/user/:email", deleteUser);
router.patch("/user/update/:email", updateUser);

module.exports = router;
