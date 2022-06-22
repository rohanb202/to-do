import { connectToDatabase } from "../../../utils/mongodb";
import bcrypt from "bcryptjs";
import generateToken from "../../../utils/generateToken";
import { ObjectId } from "mongodb";

//read the readme.md file for api

export default async function header(req, res) {
  const { method, body } = req;
  const { db } = await connectToDatabase();
  if (method === "POST") {
    try {
      const { email, password } = body;
      const user = await db.collection("users").findOne({ email });
      if (!user) {
        res.status(400);
        throw new Error("User does not exist");
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        res.status(401);
        throw new Error("Invalid password");
      }
      const tags = await db
        .collection("tags")
        .findOne({ user: user._id.toString() });

      const token = generateToken(user._id);
      res.status(200).json({ ...user, token, tags });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}
