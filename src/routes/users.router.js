const { Router } = require('express');
const userModel = require('../models/user.model.js'); 

const router = Router();

// [GET] para obtener usuarios
router.get('/', async (req, res) => {
    try {
        const result = await userModel.find();
        res.json({ status: 'success', payload: result });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    }
});

// [POST] para crear un usuario (Corregido para la consigna)
router.post('/', async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body;
        // Usamos userModel con minúscula como lo definiste arriba
        const result = await userModel.create({ 
            first_name, 
            last_name, 
            email, 
            age, 
            password // Aquí después usaremos el hash de bcrypt
        });
        res.json({ status: 'success', payload: result });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    }
});

module.exports = router;