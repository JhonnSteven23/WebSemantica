const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const FUSEKI_ENDPOINT = "http://localhost:3030/VideoGames/sparql";

// Ruta para la URL raíz
app.get("/", (req, res) => {
    res.send("Bienvenido a la API de Videojuegos");
});

app.post("/consultar", async (req, res) => {
    const { query } = req.body;

    try {
        const response = await axios.post(
            FUSEKI_ENDPOINT,
            `query=${encodeURIComponent(query)}`,
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
