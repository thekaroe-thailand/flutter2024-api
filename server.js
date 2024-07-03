const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload({
    limits: {
        fileSize: 50 * 1024 * 1024 // 50MB
    }
}));

app.get('/', (req, res) => {
    res.send('Hello my API');
});

// INSERT
app.post('/create', (req, res) => {
    console.log(req.body);
    console.log('name', req.body.name);
    console.log('age', req.body.age);

    const ext = req.body.ext;

    if (ext != undefined) {
        if (ext.length > 0) {
            for (let i = 0; i < ext.length; i++) {
                const item = ext[i];
                const position = item.position;
                const salary = item.salary;

                console.log(position, salary);
            }
        }
    }

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

//
// File System
//
const fs = require('fs');

app.post('/createFile', (req, res) => {
    try {
        fs.writeFile(req.body.fileName, req.body.content, (err) => {
            if (err) throw err;
            res.send('create file success');
        })
    } catch (e) {
        res.send('error ' + e);
    }
})

app.get('/readFile', (req, res) => {
    try {
        fs.readFile('server.js', (err, data) => {
            if (err) throw err;

            res.send(data)
        })
    } catch (e) {
        res.send({ message: e });
    }
})

app.post('/myUpload', (req, res) => {
    const img = req.files.img;
    console.log(img);

    res.send({ message: 'success' })
})

app.listen(3000, () => {
    console.log('my server start on port 3000');
});