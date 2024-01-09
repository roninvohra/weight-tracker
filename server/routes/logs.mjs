import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// Get a list of 50 posts
router.get("/", async (req, res) => {
  let collection = await db.collection("logs");
  let results = await collection.find({})
    .toArray();

  res.send(results).status(200);
});

// Add a new document to the collection
router.post("/", async (req, res) => {
  let collection = await db.collection("logs");
  let newDocument = req.body;
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: ObjectId(req.params.id) };

    const collection = db.collection("logs");
    let result = await collection.deleteOne(query);

    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
