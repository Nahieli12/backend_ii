const mongoose = require('mongoose');

const connectMongo = async (uri) => {
    try {
        await mongoose.connect(uri);
        console.log('Conectado con MongoDB crack');
    } catch (error) {
        console.error('No se pudo conectar con MongoDB crack', error);
    }
};

// Exportamos como un objeto para que el require de app.js funcione
module.exports = { connectMongo };