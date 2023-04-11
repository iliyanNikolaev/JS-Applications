const express = require('express');

const app = express();

app.get('/', (req, res) => {
    
    if(req.headers['custom-header'] === 'Ilich'){
        res.send('<h1>Hello Ilich!</h1>');
    } else {
        res.send('<h1>Hello from server!</h1>');
    }

    res.header([
        {
            'Content-Type': 'text/html'
        }
    ])

    
});

app.get('/cats', (req, res) => {
    res.json([
        {
            name: 'Siso',
            age: 0.5
        },
        {
            name: 'Sivka',
            age: 12
        }
    ])
});

app.listen(3000);