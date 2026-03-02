const { Router } = require('express');
const userModel = require('../models/user.model.js');
const { createHash, isValidPassword, generateToken } = require('../utils.js');
const passport = require('passport');

const router = Router();

// Registro con Hash
router.post('/register', async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body;
        
            const newUser = await userModel.create({
                first_name,
                last_name,
                email,
                age,
                password: createHash(password) 
            });

        res.json({ status: "success", message: "Usuario registrado", payload: newUser });
    } catch (error) {
        console.log(error); 
        res.status(500).json({ status: "error", error: "Error al registrar" });
    }
});

// Login con JWT
    router.post('/login', async (req, res) => {
        const { email, password } = req.body;
        
        // 1. Buscar usuario
        const user = await userModel.findOne({ email });
        if (!user) return res.status(401).send({ status: "error", error: "Usuario no encontrado" });

        // 2. Validar contraseña (usando la función de utils.js)
        if (!isValidPassword(user, password)) return res.status(403).send({ status: "error", error: "Contraseña incorrecta" });

        // 3. Generar Token
        const token = generateToken(user);

        // 4. Enviar al cliente en una Cookie
        res.cookie('coderCookieToken', token, {
            maxAge: 60 * 60 * 1000, // 1 hora
            httpOnly: true
        }).send({ status: "success", message: "Logged in" });
    });

// RUTA CURRENT
    router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
        res.send({ status: "success", payload: req.user });
    });

module.exports = router;