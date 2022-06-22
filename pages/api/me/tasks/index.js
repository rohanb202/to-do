import { connectToDatabase } from "../../../../utils/mongodb";
import { Timestamp, ObjectId } from "mongodb";
import { protect } from "../../../../middleware/authMiddleware";
//read the readme.md file for api
async function handler(req, res) {
  const { method, body } = req;
  const { from, to } = req.query;
  const { db } = await connectToDatabase();

  if (method === "GET") {
    try {
      if (!from && !to) {
        const tasksData = await db
          .collection("tasks")
          .find({ user: req.user._id.toString() })
          .toArray();

        return res.status(200).json(tasksData);
      } else if (from && to) {
        const user = await db
          .collection("users")
          .findOne({ _id: new ObjectId(req.user._id) });
        if (!user.isAdmin) {
          throw new Error("You are not an admin");
        }
        //console.log(new Date(from).toISOString(), new Date(to).toISOString());
        const tasks = await db
          .collection("tasks")
          .find({
            createdAt: {
              $gte: new Date(from).toISOString(),
              $lt: new Date(to).toISOString(),
            },
          })
          .toArray();
        return res.status(200).json(tasks);
      } else {
        throw new Error("User not found");
      }
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }

  if (method === "POST") {
    try {
      const { text, tag, dueDate, createdAt } = body;
      const task = {
        user: req.user._id.toString(),
        text,
        tag,
        dueDate,
        createdAt,
        isCompleted: false,
      };
      const post = await db
        .collection("tasks")
        .insertOne({ ...task, timestamp: new Timestamp() });
      return res.status(201).json(post);
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }
}
export default protect(handler);
