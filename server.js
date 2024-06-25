const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

const apiKey = "AIzaSyDz6E9EdHhexEhZVDon8Csc6f2wv7XHKGc";

app.use(cors());
app.use(express.json());

app.get('/api/searchGooglePlaces', async (req, res) => {
    const query = req.query.query;
    const apiUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${apiKey}`;

    try {
        const response = await axios.get(apiUrl);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar dados do Google Places API' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));