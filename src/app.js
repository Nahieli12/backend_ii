const express = require('express');
const usersRouter = require('./routes/users.router.js');
const sessionsRouter = require('./routes/sessions.router.js');
const { connectMongo } = require('./config/db.js'); // Movido aquí arriba

const PORT = 4000;
const MONGO_URI = 'mongodb://localhost:27017/backend_II';

connectMongo(MONGO_URI); // Llamado sin errores de ortografía

const cookieParser = require('cookie-parser');

const passport = require('passport');
const initializePassport = require('./config/passport.config');

const app = express();


// MIDDLEWARES
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser('coders2026'));

initializePassport(); // <--- Ejecuta la función que creamos en config
app.use(passport.initialize());

// RUTAS
app.use('/api/users', usersRouter);
app.use('/api/sessions', sessionsRouter); // <--- Aquí va tu login y el /current

//Guardamos la cookie
app.get('/setcookie', (req, res) => {

    res.cookie('CookieCoder', 'CookieUser').send('Cookie creada');
})

//Obtenemos la cookie
app.get('/getcookie', (req, res) => {
    res.send(req.cookies);
})

//Eliminamos cookie
app.get('/deletecookie', (req, res) => {
    res.clearCookie('CookieCoder').send('Cookie Eliminada Broo')
})

//Ruta de usuarios
app.use('/api/users', usersRouter);

app.listen(PORT, () => {
    console.log(`Servidor Web con Express en el puerto ${PORT}`);
});