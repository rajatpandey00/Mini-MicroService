const express = require('express');
const axios = require("axios");
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
app.use(bodyParser.json());
app.use(cors());


app.post('/events', async (req, res) => {
  const event = req.body;
  console.log('RECEIVED EVENT', event)
  axios.post('http://localhost:4002/events', event);
  res.sendStatus('OK');
})

app.listen('4005', () => {
    console.log('Event Bus service listening on port 4005');
})