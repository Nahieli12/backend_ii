import mongoose from 'mongoose'

export const conecctMongo = async (uri) => {
    try {
        await mongoose.connect(uri);
    console.log('Conectado con MongoDB crack')
    } catch (error) {
        console.error('No conceto con MongoDB crack')
    }
};