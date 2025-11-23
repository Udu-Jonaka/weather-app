import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import axios from 'axios';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 4000;
const apiKey = process.env.API_KEY;

app.use(bodyParser.urlencoded({ extended: true }));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from "public"
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', function(req, res) {
  res.render('index', { result: '' });
});

// Post requests
app.post('/city', async function(req, res){
  const userCity = req.body.cityName;
  const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + userCity + '&appid=' + apiKey + '&units=metric';

  try{
    const response = await axios.get(url);
    const temp = response.data.main.temp;
    const city = response.data.name;
  const message = 'The weather in ' + city + ' is ' + temp + '°C';
  

  res.render('index', { result: message });
  }catch (error){
  res.render('index', { result: 'City not Found' });
  }});
// Start server
app.listen(PORT, function() {
  console.log(`Server running at http://localhost:${PORT}`);
});