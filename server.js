require('./config/config');

const express = require('express');
const mongoose = require('mongoose');

const app = express();

// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});


const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(express.static('public'))

app.use(require('./routes/index.routes'));

const path = require('path')

// default
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });

console.log(`Base de Datos: ${process.env.URLDB}`)




mongoose.connect(process.env.URLDB, { useNewUrlParser: true }, (err, res) => {
    if (err) {
        console.log('ERROR EN LA CONEXIÓN A LA BASE DE DATOS');
        return;
    };
    console.log('Base de datos ONLINE');
});

app.listen(process.env.PORT, () => {
    console.log(`Escuchando en el puerto: ${process.env.PORT}`);
})