const jwt = require("jsonwebtoken");

const usersSchema = require("../models/users");

const checkAdminToken = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized - Token missing" });
    }
    const decodedToken = jwt.verify(token, "77885566");
    const userRole = decodedToken.role;
    // if (userRole === "admin") {
    const checkToken = await usersSchema
      .findOne({
        token: token,
      })
      .populate("role");
    if (checkToken) {
      const id = checkToken._id;
      const role = checkToken.role;
      const fullName = checkToken.fullName;
      req._id = id;
      req.role = role;
      req.fullName = fullName;
      next();
    } else {
      return res.status(403).json({ error: "Token Expired." });
    }
    // } else if (userRole === "employee") {
    // 	return res.status(403).json({ error: "Forbidden - Invalid token" });
    // }
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(403).json({ error: "Token Expired." });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(403).json({ error: "Forbidden - Invalid token" });
    }
    return res.status(500).json({ error: "Server error" });
  }
};
