import { connectToDatabase } from "../../../../utils/mongodb";
import { ObjectId } from "mongodb";
import { protect } from "../../../../middleware/authMiddleware";
//read the readme.md file for api
async function handler(req, res) {
  const {
    method,
    query: { id },
    body,
  } = req;
  const { db } = await connectToDatabase();

  if (method === "DELETE") {
    try {
      const task = await db
        .collection("tasks")
        .deleteOne({ _id: new ObjectId(id) });
      return res.status(200).json({ msg: "deleted" });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  if (method === "PUT") {
    try {
      const { isCompleted } = body;
      //console.log(isCompleted);
      const update = await db
        .collection("tasks")
        .updateOne({ _id: ObjectId(id) }, { $set: { isCompleted } });
      return res.status(200).json(update);
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }
}
export default protect(handler);
