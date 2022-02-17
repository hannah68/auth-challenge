const express = require('express');
const { createMovie, getMovies } = require('../controllers/movie');

const router = express.Router();

router.post("/", createMovie);
router.get("/", getMovies);

module.exports = router;