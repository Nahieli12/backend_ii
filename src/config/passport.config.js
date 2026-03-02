const passport = require('passport');
const jwt = require('passport-jwt');

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const initializePassport = () => {
    // Función para extraer el token de la cookie
    const cookieExtractor = req => {
        let token = null;
        if (req && req.cookies) {
            token = req.cookies['coderCookieToken']; // Debe coincidir con el nombre en sessions.router.js
        }
        return token;
    };

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: 'secretKey_que_elijas' // DEBE ser la misma que usaste en utils.js
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload.user);
        } catch (error) {
            return done(error);
        }
    }));
};

module.exports = initializePassport;