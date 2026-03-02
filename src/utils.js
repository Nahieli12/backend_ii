const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Encriptar
const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

// Validar
const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

// Generar Token
const generateToken = (user) => {
    return jwt.sign({ user }, 'secretKey_que_elijas', { expiresIn: '24h' });
};

module.exports = { createHash, isValidPassword, generateToken };