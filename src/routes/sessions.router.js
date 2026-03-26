import { Router } from 'express';
import SessionsController from '../controllers/sessions.controller.js';
import passport from 'passport';

const router = Router();

// Cambiamos 'current' por 'jwt' para que coincida con passport.config.js
router.get('/current', 
    passport.authenticate('jwt', { session: false }), 
    SessionsController.current
);

// Ruta para Logout
router.get('/logout', SessionsController.logout);

export default router;