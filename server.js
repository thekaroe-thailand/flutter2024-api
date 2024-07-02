const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello my API');
});

// INSERT
app.post('/create', (req, res) => {
    res.send('message by POST Method');
});

// UPDATE, EDIT
app.put('/update/:id', (req, res) => {
    res.send('update id = ' + req.params.id);
});

// DELETE
app.delete('/delete/:id', (req, res) => {
    res.send('delete id = ' + req.params.id);
});

// GET Multi Params
app.get('/hello/:name/:age', (req, res) => {
    const name = req.params.name;
    const age = req.params.age;

    res.send('name = ' + name + ', age = ' + age);
});

app.listen(3000, () => {
    console.log('my server start on port 3000');
});