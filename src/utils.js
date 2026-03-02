const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Encriptar (Punto 2 de la consigna)
const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

// Validar
const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

// Generar Token (Punto 3 de la consigna)
const generateToken = (user) => {
    return jwt.sign({ user }, 'secretKey_que_elijas', { expiresIn: '24h' });
};

module.exports = { createHash, isValidPassword, generateToken };