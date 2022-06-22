// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { protect } from "../../middleware/authMiddleware";
const handler = (req, res) => {
  return res.status(200).json({ message: "Hello world!" });
};

export default protect(handler);
