const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostID = {};

app.get('/posts/:id/comments', async (req, res) => {
  const comments = commentsByPostID[req.params.id] || [];
  res.status(200).send(comments);
})

app.post('/posts/:id/comments', async (req, res) => {
  const commentID = randomBytes(4).toString('hex');
  const { content } = req.body;
  const eventBody = { id: commentID, content, postID: req.params.id, 'type': 'COMMENT_CREATED' };
  const resp = await axios.post('http://localhost:4005/events', eventBody);
  res.status(201).send(resp.data)
})

app.post('/events', (req, res) => {
  const eventDetails = req.body;
  const postID = eventDetails.postID;
  const comments = commentsByPostID[postID] || [];
  comments.push({ id: eventDetails.id, content: eventDetails.content })
  commentsByPostID[postID] = comments;
  res.status(201).send(comments);
})

app.listen('4001', () => {
    console.log('Listening on Port 4001');
})