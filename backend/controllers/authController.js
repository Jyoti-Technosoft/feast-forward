const jwt = require("jsonwebtoken");
const usersSchema = require("../models/users");

const verifyToken = async (token) => {
  try {
    const decodedToken = jwt.verify(token, "77885566");
    return decodedToken;
  } catch (error) {
    throw error;
  }
};

// Middleware for checking if the user is an admin
const checkAdminToken = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized - Token missing" });
    }
    const decodedToken = await verifyToken(token);
    const userRole = decodedToken?.role;
    const user = await usersSchema.findOne({ token }).populate("role");
    if (!user) {
      return res.status(403).json({ error: "Token Expired." });
    }
    if (userRole === "admin") {
      console.log('userRole admin:===>',userRole);
      req?._id = user?._id;
      req?.role = user?.role;
      req?.fullName = user?.fullName;
      next();
    } else {
      return res
        .status(403)
        .json({ error: "Forbidden - Admin role required." });
    }
  } catch (error) {
    return handleTokenError(error, res);
  }
};

// Middleware for checking if the user is a volunteer
const checkVolunteerToken = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized - Token missing" });
    }
    const decodedToken = await verifyToken(token);
    const userRole = decodedToken?.role;
    const user = await usersSchema.findOne({ token }).populate("role");
    if (!user) {
      return res.status(403).json({ error: "Token Expired." });
    }
    if (userRole === "volunteer") {
      req._id = user?._id;
      req.role = user?.role;
      req.fullName = user?.fullName;
      next();
    } else {
      return res
        .status(403)
        .json({ error: "Forbidden - Volunteer role required." });
    }
  } catch (error) {
    return handleTokenError(error, res);
  }
};

// Middleware for checking if the user is a "join new user"
const checkJoinNewUserToken = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized - Token missing" });
    }
    const decodedToken = await verifyToken(token);
    const userRole = decodedToken.role;
    const user = await usersSchema.findOne({ token }).populate("role");
    if (!user) {
      return res.status(403).json({ error: "Token Expired." });
    }
    if (userRole === "join new user") {
      req._id = user?._id;
      req.role = user?.role;
      req.fullName = user?.fullName;
      next();
    } else {
      return res
        .status(403)
        .json({ error: "Forbidden - Join new user role required." });
    }
  } catch (error) {
    return handleTokenError(error, res);
  }
};

// Error handler for different token errors
const handleTokenError = (error, res) => {
  if (error instanceof jwt.TokenExpiredError) {
    return res.status(403).json({ error: "Token Expired." });
  } else if (error instanceof jwt.JsonWebTokenError) {
    return res.status(403).json({ error: "Forbidden - Invalid token" });
  }
  return res.status(500).json({ error: "Server error" });
};

module.exports = {
  checkAdminToken,
  checkVolunteerToken,
  checkJoinNewUserToken,
};
