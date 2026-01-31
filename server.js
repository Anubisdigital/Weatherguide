import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const PORT = 5000;

// Enable CORS so your frontend can communicate with this server
app.use(cors());
app.use(express.json());

const API_KEY = "8bb586a6849f78616ac109b6283c21d2";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// The GET route for weather
app.get('/get_weather', async (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.status(400).json({ error: "No city provided" });
    }

    try {
        // Using axios to fetch data from OpenWeatherMap
        const response = await axios.get(BASE_URL, {
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric'
            }
        });

        // Send the data back to the frontend
        res.json(response.data);
    } catch (error) {
        // Check if the error came from the API or the server logic
        const status = error.response ? error.response.status : 500;
        const message = error.response ? error.response.data.message : "Internal Server Error";
        
        res.status(status).json({ error: message });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Weather Backend running on http://localhost:${PORT}`);
});
