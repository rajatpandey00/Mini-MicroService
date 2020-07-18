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

app.post('/events', (req, res) => {
    const data = req.body;
    if (data.type === 'POST_CREATED') {
     posts[data.id] = {
         id: data.id,
         title: data.title,
         comments: []
     }
    } else if (data.type === 'COMMENT_CREATED') {
        const data = req.body;
        const post = posts[data.postID];
        post.comments.push({ id: data.id, content: data.content });
        posts[postID] = post;
    }
    res.status(201).send(posts);
})

app.listen('4002', () => {
    console.log('Query service listening on port 4002');
})