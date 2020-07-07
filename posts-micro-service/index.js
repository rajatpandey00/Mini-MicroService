const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');


const app = express();

const posts = {};

app.get('/posts', (req, res) => {

})

app.post('/posts', (req, res) => {
  const { title } = req.body;
  const id = randomBytes(4).toString('hex');
  posts[id] = {
      id,
      title
  }
  res.status(201).send(posts[id]);
})

app.listen('4000', () => {
    console.log('Listening on Port 4000');
})