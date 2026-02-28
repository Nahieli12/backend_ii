import express from 'express';

import cookieParser from 'cookie-parser';

import { conecctMongo } from './config/db.js'

import usersRouter from './routes/users.router.js'

const PORT = 4000;
const MONGO_URI = 'mongodb://localhost:27017/backend_II';
conecctMongo(MONGO_URI);

const app = express();
app.use( express.json());
app.use( express.static('public'));

//Cookie-parser
app.use(cookieParser('coders2026'));

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