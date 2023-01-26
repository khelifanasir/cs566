const mongoose = require("mongoose");

const userShema = mongoose.Schema(
  {
    email: { type: String, require: true, unique: true },
    fullname: String,
    password: { type: String, require: true },
    role: String,
    trainingCollection: String,
    quizScore: Number
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("User", userShema);
