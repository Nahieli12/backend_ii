import mongoose from 'mongoose'; // Cambiado de require a import

export const connectMongo = async (uri) => { // Agregamos 'export' aquí
    try {
        await mongoose.connect(uri);
        console.log('Conectado con MongoDB crack');
    } catch (error) {
        console.error('No se pudo conectar con MongoDB crack', error);
    }
};