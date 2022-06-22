import { connectToDatabase } from "../../../utils/mongodb";
import { ObjectId } from "mongodb";
import { protect } from "../../../middleware/authMiddleware";
//read the readme.md file for api
async function handler(req, res) {
  const { id } = req.query;
  const { body, method } = req;
  const { db } = await connectToDatabase();

  if (method === "GET") {
    try {
      const user = await db
        .collection("users")
        .findOne({ _id: new ObjectId(req.user._id) });

      if (!user.isAdmin) {
        throw new Error("You are not an admin");
      }
      const users = await db
        .collection("users")
        .find({ _id: { $ne: new ObjectId(req.user._id) } })
        .toArray();

      for (let i = 0; i < users.length; i++) {
        users[i]._id = users[i]._id.toString();
        const tasks = await db
          .collection("tasks")
          .find({ user: users[i]._id })
          .toArray();
        users[i].tasks = tasks;
      }
      return res.status(200).json(users);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}
export default protect(handler);
