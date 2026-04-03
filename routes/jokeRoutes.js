"use strict";
const express = require("express");
const router = express.Router();
const jokeController = require('../controllers/jokeController');

router.get("/categories", jokeController.fetchAllCategories);
router.get("/category/:category", jokeController.fetchJokesByCategory);
router.get("/random", jokeController.fetchRandomJoke);
router.post("/joke/add", jokeController.addJoke);
module.exports = router;