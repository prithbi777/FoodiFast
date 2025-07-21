import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorized. Please login again." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded._id; // ✅ Matches your token structure
    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(403).json({ success: false, message: "Token is invalid or expired" });
  }
};

export default authMiddleware;
