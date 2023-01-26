const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/usersModel");
const { PRIVATE_KEY } = require("../config.json");

module.exports.login = async (req, res, next) => {
  try {
    // recive username and passsword from body

    const { email, password } = req.body;
    console.log(password, "password");
    //find user and compare the password
    const user = await User.findOne({ email }).lean();
    if (!user) {
      throw new Error(`User not found`);
    }

    const match = bcrypt.compareSync(password, user.password);
    console.log(match, "match");
    if (!match) throw new Error(`wrong password`);

    //generate JWT
    const token = { ...user, password: "***" };

    const tokenHash = jwt.sign(token, PRIVATE_KEY);
    res.json({ success: true, data: tokenHash });
  } catch (e) {
    res.json({ success: false, data: "wrong password" });

    // next(e);
  }
};

module.exports.signup = async (req, res, next) => {
  try {
    //recieve the data from the body
    // console.log(req.file);

    const { email, fullname, password } = req.body;

    // hash the password

    const hash = await bcrypt.hash(password, 5);

    // Store hash in your password DB.

    const results = await User.create({
      ...req.body,
      password: hash,
    });

    res.json({ success: true });
  } catch (e) {
    next(e);
  }
};

module.exports.getAll = async (req, res) => {
  try {
    const results = await User.find();
    res.json({ success: true, data: results });
  } catch (e) {
    next(e);
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    const { email } = req.params;

    const results = await User.deleteOne({ email });
    res.json({ success: true, data: results });
  } catch (e) {
    next(e);
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    const { email } = req.params;
    console.log(email, req.body.quizScore);
    const results = await User.findOneAndUpdate(
      { email },
      { $set: { quizScore: req.body.quizScore } }
    );
    res.json({ success: true });
  } catch (e) {
    next(e);
  }
};
