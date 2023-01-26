const collectionsModel = require("../models/collectionsModel");
const { ObjectId } = require("mongoose");
module.exports.getAll = async (req, res) => {
  try {
    const results = await collectionsModel.find();
    res.json({ success: true, data: results });
  } catch (e) {
    next(e);
  }
};

module.exports.getCollectionByTitle = async (req, res) => {
  try {
    const { title_id } = req.params;

    const results = await collectionsModel.findOne({ _id: title_id });
    res.json({ success: true, data: results });
  } catch (e) {
    next(e);
  }
};

module.exports.addCollection = async (req, res, next) => {
  try {
    console.log(req.body);
    const results = await collectionsModel.create(req.body);

    res.json({ success: true, data: results });
  } catch (e) {
    next(e);
  }
};

module.exports.deleteCollectionById = async (req, res) => {
  try {
    const { collection_id } = req.params;

    const results = await collectionsModel.deleteOne({ _id: collection_id });
    res.json({ success: true, data: results });
  } catch (e) {
    next(e);
  }
};
