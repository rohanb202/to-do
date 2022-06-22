import jwt from "jsonwebtoken";
import { connectToDatabase } from "../utils/mongodb";
import { ObjectId } from "mongodb";

//This protects the routes from unauthorized users
//need to pass token through headers

const protect = (handler) => {
  return async (req, res) => {
    let token;
    const { db } = await connectToDatabase();
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
        if (!token) {
          throw new Error("No token found");
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await db
          .collection("users")
          .findOne(
            { _id: new ObjectId(decodedToken.id) },
            { projection: { password: 0 } }
          );
      } catch (e) {
        res.status(401).json({ message: e.message });
      }
    }
    return handler(req, res);
  };
};
export { protect };
