require("dotenv").config();
const jwt = require("jsonwebtoken");
const RefreshToken = require("../models/RefreshToken");

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRATION_TIME = process.env.ACCESS_TOKEN_EXPIRATION_TIME;
const REFRESH_TOKEN_EXPIRATION_TIME = process.env.REFRESH_TOKEN_EXPIRATION_TIME;
const REFRESH_TOKEN_EXPIRATION_TIME_IN_MS =
  process.env.REFRESH_TOKEN_EXPIRATION_TIME_IN_MS;

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
  generateAccessToken,
  generateRefreshToken,
};
