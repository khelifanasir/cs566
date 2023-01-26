const mongoose = require("mongoose");

const collectionSchema = mongoose.Schema(
  {
    title: String,
    description: String,
    training: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Collection", collectionSchema);
