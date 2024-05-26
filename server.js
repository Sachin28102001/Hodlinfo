const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 3000;

app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/quadB', { useNewUrlParser: true, useUnifiedTopology: true });

const tickerSchema = new mongoose.Schema({
  name: String,
  last: String,
  buy: String,
  sell: String,
  volume: String,
  base_unit: String
});

const Ticker = mongoose.model('Ticker', tickerSchema);

const fetchAndStoreTickers = async () => {
  try {
    const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
    const tickers = response.data;
    const top10 = Object.keys(tickers).slice(0, 10).map(key => ({
      name: key,
      last: tickers[key].last,
      buy: tickers[key].buy,
      sell: tickers[key].sell,
      volume: tickers[key].volume,
      base_unit: tickers[key].base_unit
    }));

    await Ticker.deleteMany({});
    await Ticker.insertMany(top10);
    console.log('Tickers stored successfully');
  } catch (error) {
    console.error('Error fetching tickers:', error);
  }
};

setInterval(fetchAndStoreTickers, 3600000);
fetchAndStoreTickers();


app.get('/api/tickers', async (req, res) => {
  try {
    const tickers = await Ticker.find();
    res.json(tickers);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});