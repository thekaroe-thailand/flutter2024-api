const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const jwt = require('jsonwebtoken');

const key = 'my key of this project';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload({
    limits: {
        fileSize: 50 * 1024 * 1024 // 50MB
    }
}));

app.get('/', (req, res) => {
    res.send('Hello');
});
app.post('/singIn', (req, res) => {
    const u = req.body.username;
    const p = req.body.password;

    if (u == 'admin' && p == 'admin') {
        const payload = {
            id: 100,
            name: 'kob',
            level: 'admin'
        };

        const token = jwt.sign(payload, key, { expiresIn: '30d' }); // d = day, h = hour, m = month

        res.send({ token: token });
    } else {
        res.status(401).send({ message: 'Unauthorized' });
    }
})

app.post('/verify', (req, res) => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAwLCJuYW1lIjoia29iIiwibGV2ZWwiOiJhZG1pbiIsImlhdCI6MTcyMDAxODA2NiwiZXhwIjoxNzIyNjEwMDY2fQ.gQ-0NRlQE1rYplIyuNdC2muik1SFHyEaGp7Hjr4SM_0';
    const payload = jwt.verify(token, key);

    res.send({ payload: payload });
})

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

app.post('/uploadFile', (req, res) => {
    try {
        if (req.files != undefined) {
            if (req.files.myFile != undefined) {
                const myFile = req.files.myFile;

                if (myFile != undefined) {
                    const myDate = new Date();
                    const y = myDate.getFullYear();
                    const m = myDate.getMonth() + 1;
                    const d = myDate.getDate();
                    const h = myDate.getHours();
                    const mm = myDate.getMinutes();
                    const s = myDate.getSeconds();
                    const ms = myDate.getMilliseconds();
                    const arrExt = myFile.name.split('.');
                    const ext = arrExt[arrExt.length - 1];
                    const newName = `${y}${m}${d}${h}${mm}${s}${ms}.${ext}`;

                    myFile.mv('./uploads/' + newName, (err) => {
                        if (err) throw err;
                        res.send({ message: 'success' })
                    });
                }
            }
        }
    } catch (e) {
        res.send({ error: e });
    }
})

app.listen(3000, () => {
    console.log('my server start on port 3000');
});
