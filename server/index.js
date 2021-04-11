const express = require('express');
const cors = require('cors');
const request = require('superagent');

const config = require('./config');

const app = express();
app.use(cors());

app.get('/api/weather', async (req, res) => {
  try {
    const owRes = await request
      .get(config.OPEN_WEATHER_API_URI)
      .query(req.query)
      .query({ appid: config.OPEN_WEATHER_API_KEY });

    res.json(owRes.body);
  } catch (err) {
    console.log(err);
    res
      .status(err.status)
      .json({ error: true, status: err.status, message: err.message });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
