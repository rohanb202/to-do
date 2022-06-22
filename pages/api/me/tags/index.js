import { connectToDatabase } from "../../../../utils/mongodb";
import { ObjectId } from "mongodb";
import { protect } from "../../../../middleware/authMiddleware";
//read the readme.md file for api
async function handler(req, res) {
  const { id } = req.query;
  const { body, method } = req;
  const { db } = await connectToDatabase();

  //   console.log(req.user);
  if (method === "GET") {
    try {
      const tag = await db
        .collection("tags")
        .findOne({ user: req.user._id.toString() });
      res.status(200).json(tag);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
  if (method === "PUT") {
    const updateTags = await db
      .collection("tags")
      .findOne({ user: req.user._id.toString() });
    const tags = updateTags.tags;
    tags.push(body.tag);
    const update = await db
      .collection("tags")
      .updateOne({ user: req.user._id.toString() }, { $set: { tags } });

    return res.status(200).json(update);
  }
}
export default protect(handler);
