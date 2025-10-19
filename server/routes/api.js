const express = require("express");
const router = express.Router();
const { getAnime } = require("../utils/animeUtils");
const Anime = require("../models/Anime");

// send anime
// This one will return entire data of the anime
router.get("/anime/:slug", async (req, res) => {
  const { slug } = req.params;
  if (!slug) {
    return res.status(400).json({ message: "Anime slug is missing!" });
  }

  try {
    const animeInfo = await getAnime(slug);
    console.log(animeInfo);
    return res.status(200).json({ animeInfo: animeInfo });
  } catch (err) {
    return res.status(500).json({ message: err.message });
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
    return res.status(500).json({ message: err.message });
  }
});

// Add anime
router.post("/add-anime", async (req, res) => {
  const { title, slug } = req.body;

  if (!title || !slug) {
    return res.status(400).json({ message: "Title and slug are required." });
  }

  try {
    const newAnime = new Anime({
      title,
      slug,
    });

    const savedAnime = await newAnime.save();
    console.log("Saved anime:", savedAnime);

    return res.status(201).json({ message: "Anime added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while adding anime" });
  }
});

module.exports = router;
