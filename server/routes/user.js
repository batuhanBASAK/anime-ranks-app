const express = require("express");
const { verifyAccessToken } = require("../middlewares/authMiddleware");
const User = require("../models/User");
const router = express.Router();

// get user info
router.get("/", verifyAccessToken, async (req, res) => {
  const userID = req.userID;

  const userDoc = await User.findById(userID);
  if (!userDoc) {
    return res.status(400).json({ message: "There is no such user!" });
  }

  try {
    const user = {
      username: userDoc.username,
      RatedAnimes: userDoc.RatedAnimes,
    };
    return res.status(200).json({ message: "everthing is ok", user: user });
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
});

// rate anime

module.exports = router;
