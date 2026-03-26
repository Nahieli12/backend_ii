import express from 'express';
import usersRouter from './routes/users.router.js'; // Agregada extensión .js
import sessionsRouter from './routes/sessions.router.js'; 
import { connectMongo } from './config/db.js'; // Con llaves y .js
import cookieParser from 'cookie-parser';
import passport from 'passport';
import initializePassport from './config/passport.config.js'; // Agregada extensión .js
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Usar las variables del .env
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI; 

connectMongo(MONGO_URI);

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Agregamos este por si usas formularios
app.use(express.static('public'));
app.use(cookieParser('coders2026'));

// Pasamos passport a la función de inicialización
initializePassport(passport); 
app.use(passport.initialize());

// RUTAS
app.use('/api/users', usersRouter); 
app.use('/api/sessions', sessionsRouter);

// Cookies y Listen (Tu código de cookies está perfecto)
app.get('/setcookie', (req, res) => {
    res.cookie('CookieCoder', 'CookieUser').send('Cookie creada');
});

app.get('/getcookie', (req, res) => {
    res.send(req.cookies);
});

app.get('/deletecookie', (req, res) => {
    res.clearCookie('CookieCoder').send('Cookie Eliminada Broo');
});

app.listen(PORT, () => {
    console.log(`Servidor Web con Express en el puerto ${PORT}`);
});