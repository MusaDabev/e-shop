const express = require('express');

// express app 
const app = express();

// listen for requests 
app.listen(7000);

app.get('/', (req, res) => {
    res.sendFile('./views/index.html', { root: __dirname})
})

app.get('/cart', (req, res) => {
    res.sendFile('./views/cart.html', { root: __dirname})
})

app.get('/registration', (req, res) => {
    res.sendFile('./views/registration.html', { root: __dirname})
})