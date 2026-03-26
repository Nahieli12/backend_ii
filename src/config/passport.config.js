import passport from 'passport';
import jwt from 'passport-jwt';
import dotenv from 'dotenv';

dotenv.config();

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const initializePassport = () => {
    // Función para extraer el token de la cookie
    const cookieExtractor = req => {
        let token = null;
        if (req && req.cookies) {
            // Asegúrate de que este nombre coincida con el que usas al crear la cookie en el login
            token = req.cookies['coderCookieToken']; 
        }
        return token;
    };

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        // Usamos la variable de entorno, si no existe usa una por defecto
        secretOrKey: process.env.JWT_SECRET || 'secretKey_que_elijas'
    }, async (jwt_payload, done) => {
        try {
            // El payload suele tener los datos del usuario
            return done(null, jwt_payload);
        } catch (error) {
            return done(error);
        }
    }));
};

export default initializePassport;