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

// Lectura y parseo del body
app.use(express.json());


// Base Datos
dbConnection();


// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));


app.listen(process.env, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});
