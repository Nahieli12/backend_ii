const passport = require('passport');
const jwt = require('passport-jwt');

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const initializePassport = () => {
    // Función para extraer el token de la cookie
    const cookieExtractor = req => {
        let token = null;
        if (req && req.cookies) {
            token = req.cookies['coderCookieToken']; 
        }
        return token;
    };

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: 'secretKey_que_elijas'
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload.user);
        } catch (error) {
            return done(error);
        }
    }));
};

module.exports = initializePassport;