"use strict";
const model = require('../models/jokeModel');

async function fetchAllCategories(req, res) {
    try {
        const categories = await model.getAllCategories();
        res.json(categories);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}

async function fetchJokesByCategory(req, res) {
    const category = req.params.category;
    if (category) {
        try {
            const jokes = await model.getJokesByCategory(category);
            res.json(jokes);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required category param!");
    }
}

async function fetchRandomJoke(req, res) {
    try {
        const joke = await model.getRandomJoke();
        res.json(joke);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
}

async function addJoke(req, res) {
    const { category, setup, delivery } = req.body;
    if (category && setup && delivery) {
        try {
            const newJoke = await model.addJoke(category, setup, delivery);
            res.status(201).json(newJoke);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required joke fields!");
    }
}

module.exports = {
    fetchAllCategories,
    fetchJokesByCategory,
    fetchRandomJoke,
    addJoke
};