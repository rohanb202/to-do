import { connectToDatabase } from "../../../utils/mongodb";
import bcrypt from "bcryptjs";
import { genrateToken } from "../../../utils/generateToken";
//read the readme.md file for api
export default async function header(req, res) {
  const { method, body } = req;
  const { db } = await connectToDatabase();
  if (method === "POST") {
    try {
      const { name, email, password } = body;
      const user = await db.collection("users").findOne({ email });
      if (user) {
        throw new Error("User already exists");
      }
      const createUser = await db.collection("users").insertOne({
        name,
        email,
        password: await bcrypt.hash(password, 12),
        isAdmin: false,
      });
      const userTag = await db.collection("tags").insertOne({
        user: createUser.insertedId.toString(),
        tags: ["star"],
      });
      res.status(200).json({
        _id: createUser.insertedId,
        name,
        email,
        isAdmin: false,
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}
