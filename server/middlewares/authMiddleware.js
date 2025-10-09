require("dotenv").config();
const jwt = require("jsonwebtoken");
const RefreshToken = require("../models/RefreshToken");

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRATION_TIME = process.env.ACCESS_TOKEN_EXPIRATION_TIME;
const REFRESH_TOKEN_EXPIRATION_TIME = process.env.REFRESH_TOKEN_EXPIRATION_TIME;
const REFRESH_TOKEN_EXPIRATION_TIME_IN_MS =
  process.env.REFRESH_TOKEN_EXPIRATION_TIME_IN_MS;

async function checkAccessToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token is missing" });
  }

  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired access token" });
  }
}

async function checkRefreshToken(req, res, next) {
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
    req.user = decoded;

    // 4. Proceed to next
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Invalid or expired refresh token" });
  }
}

async function generateAccessToken(user) {
  return jwt.sign({ userId: user._id }, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRATION_TIME,
  });
}

// new refreshTokens,
// adds the new generated token to database
// and returns the new refresh token.
async function generateRefreshToken(user) {
  // 1. Create JWT refresh token (valid for 7 days)
  const refreshToken = jwt.sign({ userId: user._id }, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRATION_TIME,
  });

  // 2. Save it to the database with TTL
  const expiresAt = new Date(Date.now() + REFRESH_TOKEN_EXPIRATION_TIME_IN_MS);

  await RefreshToken.create({
    token: refreshToken,
    expiresAt: expiresAt,
  });

  // 3. Return the raw token
  return refreshToken;
}

module.exports = {
  checkAccessToken,
  checkRefreshToken,
  generateAccessToken,
  generateRefreshToken,
};
