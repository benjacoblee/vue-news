const express = require("express");
const serveStatic = require("serve-static");
const app = express();
const axios = require("axios").default;
const path = require("path");
const PORT = process.env.PORT || 3000;

require("dotenv").config({
    path: path.resolve(__dirname, "./.env")
});

const api = axios.create({
    baseURL: process.env.BASE_URL
});

const buildPath = path.join(__dirname + "/../dist");

app.use("/", serveStatic(buildPath));

// app.get(/.*/, function (req, res) {
// 	res.sendFile(path.join(__dirname, '/dist/index.html'))
// })

app.get("/api", (_req, res) => {
    api.get(`news?apikey=${process.env.API_KEY}&language=en`)
        .then(({ data }) => {
            res.json(data);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
});

app.get("/api/search", (req, res) => {
    const { q, category, page } = req.query;

    let url = `news?apikey=${process.env.API_KEY}&language=en`;

    if (q) url += `&q=${q}`;
    else if (category) url += `&category=${category}`;

    url += `&page=${page}`;

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
