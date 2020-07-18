const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');


const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', async (req, res) => {
 res.status(200).send(posts);
})

app.post('/posts', async (req, res) => {
  const { title } = req.body;
  const id = randomBytes(4).toString('hex');
  const body = { id, title, 'type': 'POST_CREATED' };
  const resp = await axios.post('http://localhost:4005/events', body);
  res.status(200).send(resp.data);
})

app.post('/events', async (req, res) => {
  const eventDetails = req.body;
  const id = eventDetails.id;
  posts[id] = {
      id,
      title: eventDetails.title
  }
  res.status(201).send(posts);
})

app.listen('4000', () => {
    console.log('Post service listening on port 4000');
})