const express = require("express");
const {
  getAll,
  getCollectionByTitle,
  addCollection,
  deleteCollectionById,
} = require("../controllers/collectionsController");

const router = express.Router();

router.get("/", getAll);
router.get("/collection/:collection_id", getCollectionByTitle);
router.post("/", addCollection);
router.delete("/:collection_id", deleteCollectionById);

module.exports = router;
