require("dotenv").config();
const jwt = require("jsonwebtoken");
const RefreshToken = require("../models/RefreshToken");

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

async function verifyAccessToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token is missing" });
  }

  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    req.userID = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired access token" });
  }
}

async function verifyRefreshToken(req, res, next) {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token is missing" });
  }

  try {
    // 1. Verify token signature and expiration
    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);

    // 2. Check if token exists in DB
    const tokenDoc = await RefreshToken.findOne({ token: refreshToken });

    if (!tokenDoc) {
      return res
        .status(403)
        .json({ message: "Refresh token is invalid or already used" });
    }

    // 3. Attach user data to request
    req.userID = decoded.user;

    // 4. Proceed to next
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Invalid or expired refresh token" });
  }
}

module.exports = {
  verifyAccessToken,
  verifyRefreshToken,
};
