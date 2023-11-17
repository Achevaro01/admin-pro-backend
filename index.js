require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

//mean_user
//fgJ73ytfUEZY0odO

//Crear el servidor de express
const app = express();

// Configurar CORS
app.use(cors());

// Base Datos
dbConnection();


// Rutas
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Hola Mundo'
    });
})

app.listen(process.env, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});
