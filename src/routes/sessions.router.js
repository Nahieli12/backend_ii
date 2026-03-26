import { Router } from 'express';
import SessionsController from '../controllers/sessions.controller.js';
import passport from 'passport';

const router = Router();

// Ruta /current con Passport y el Controller
router.get('/current', 
    passport.authenticate('current', { session: false }), 
    SessionsController.current
);

// Ruta para Logout
router.get('/logout', SessionsController.logout);

export default router;