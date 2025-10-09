const express = require("express");
const router = express.Router();
const { getAnime } = require("../utils/animeUtils");

// send anime
// This one will return entire data of the anime
router.get("/anime/:slug", async (req, res) => {
  const { slug } = req.params;
  if (!slug) {
    return res.status(400).json({ message: "Anime slug is missing!" });
  }

  try {
    const animeInfo = await getAnime(slug);
    return res.status(200).json({ animeInfo: animeInfo });
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
});

// send n number of animes from i'th index in anime list
// This one will return animes' ranking, animes' title, and animes' overall rating
router.get("/animes/:startIndex/:n", async (req, res) => {
  const { startIndex, n } = req.params;
  if (!startIndex || !n) {
    return res.status(400).json({ message: "Missing parameters!" });
  }

  const start = parseInt(startIndex);
  const count = parseInt(n);
  if (isNaN(start) || isNaN(count)) {
    return res.status(400).json({ message: "Invalid parameters!" });
  }

  try {
    const animes = await Anime.find()
      .sort({ rank: 1 })
      .skip(start)
      .limit(count)
      .select("title overallRating rank slug");

    return res.status(200).json({ animes });
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
});

// add anime
router.post("/anime", (req, res) => {
  return res.status(200);
});

module.exports = router;
