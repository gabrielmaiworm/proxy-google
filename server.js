const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

const apiKey = "AIzaSyDz6E9EdHhexEhZVDon8Csc6f2wv7XHKGc";

app.use(cors());
app.use(express.json());

app.get('/api/searchGooglePlaces', async (req, res) => {
    const query = req.query.query;
    const apiUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${apiKey}&language=pt-BR`;

    try {
        const response = await axios.get(apiUrl);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar dados do Google Places API' });
    }
});

app.get('/api/nearbySearch', async (req, res) => {
    const { lat, lng, radius, category } = req.query;
    const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${category}&key=${apiKey}`;

    try {
        const response = await axios.get(apiUrl);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar dados do Google Places API' });
    }
});

app.get('/api/details', async (req, res) => {
    const placeId = req.query.placeId;
    const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}&language=pt-BR`;

    try {
        const response = await axios.get(apiUrl);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar dados do Google Places API' });
    }
});

app.get('/api/placePhoto', async (req, res) => {
    const photoReference = req.query.photoReference;
    const maxWidth = req.query.maxWidth || 400; // Default maxWidth to 400 if not provided
    const apiUrl = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photoReference}&maxwidth=${maxWidth}&key=${apiKey}`;

    try {
        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        res.set('Content-Type', 'image/jpeg');
        res.send(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar imagem do Google Places API' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
