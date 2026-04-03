"use strict";
const pool = require('./dbConnection');

async function getAllCategories() {
    const queryText = "SELECT * FROM jokebook";
    const result = await pool.query(queryText);
    return result.rows;
}

async function getJokesByCategory(category) {
    const queryText = "SELECT * FROM joke WHERE category = $1";
    const values = [category];
    const result = await pool.query(queryText, values);
    return result.rows;
}

async function getRandomJoke() {
    const queryText = "SELECT * FROM joke ORDER BY RANDOM() LIMIT 1";
    const result = await pool.query(queryText);
    return result.rows[0];
}

async function addJoke(category, setup, delivery) {
    const queryText = "INSERT INTO joke (category, setup, delivery) VALUES ($1, $2, $3) RETURNING *";
    const values = [category, setup, delivery];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}

module.exports = {
    getAllCategories,
    getJokesByCategory,
    getRandomJoke,
    addJoke
};
