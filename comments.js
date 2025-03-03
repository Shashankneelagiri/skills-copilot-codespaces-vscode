// Create web server
// Comments
// Comments are saved in an array
// Comments can be added, deleted and updated
// Comments are saved in a JSON file

const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');

// Read comments from JSON file
let comments = JSON.parse(fs.readFileSync('./comments.json'));

// Add body parser
app.use(bodyParser.json());

// Get all comments
app.get('/comments', (req, res) => {
    res.send(comments);
});

// Get comment by id
app.get('/comments/:id', (req, res) => {
    const id = req.params.id;
    const comment = comments.find(comment => comment.id === id);
    if (comment) {
        res.send(comment);
    } else {
        res.status(404).send('Comment not found');
    }
});

// Add a comment
app.post('/comments', (req, res) => {
    const comment = req.body;
    comments.push(comment);
    fs.writeFileSync('./comments.json', JSON.stringify(comments));
    res.send(comment);
});

// Delete a comment
app.delete('/comments/:id', (req, res) => {
    const id = req.params.id;
    const index = comments.findIndex(comment => comment.id === id);
    if (index >= 0) {
        comments.splice(index, 1);
        fs.writeFileSync('./comments.json', JSON.stringify(comments));
        res.send('Comment deleted');
    } else {
        res.status(404).send('Comment not found');
    }
});

// Update a comment
app.put('/comments/:id', (req, res) => {
    const id = req.params.id;
    const comment = comments.find(comment => comment.id === id);
    if (comment) {
        const index = comments.indexOf(comment);
        comments[index] = req.body;
        fs.writeFileSync('./comments.json', JSON.stringify(comments));
        res.send('Comment updated');
    } else {
        res.status(404).send('Comment not found');
    }
});

// Start server
app.listen(3000, () => console.log('Server