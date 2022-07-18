const express = require("express");
const app = express();
const axios = require("axios").default;
const path = require("path");
const PORT = 3000;

require("dotenv").config({
    path: path.resolve(__dirname, "./.env")
});

const api = axios.create({
    baseURL: process.env.BASE_URL
});

app.get("/", (_req, res) => {
    api.get(`news?apikey=${process.env.API_KEY}&language=en`)
        .then(({ data }) => {
            res.json(data);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
});

app.get("/search", (req, res) => {
    const { q, page } = req.query;

    const url = q
        ? `news?apikey=${process.env.API_KEY}&language=en&q=${q}&page=${page}`
        : `news?apikey=${process.env.API_KEY}&language=en&page=${page}`;

    api.get(url)
        .then(({ data }) => {
            res.json(data);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
});

app.listen(PORT, () => {
    console.log(`App started on port ${PORT}`);
});
