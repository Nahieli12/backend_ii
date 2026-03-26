// src/controllers/sessions.controller.js
import UserDTO from "../dto/user.dto.js";

export default class SessionsController {
    
    static current = async (req, res) => {
        try {
            // Si llegamos acá es porque el middleware de Passport ya validó el token
            if (!req.user) {
                return res.status(401).send({ status: "error", error: "No se encontró usuario en el token" });
            }

            // Aplicamos el DTO para filtrar la información sensible antes de enviarla
            const userDTO = new UserDTO(req.user);
            
            res.send({ status: "success", payload: userDTO });
        } catch (error) {
            res.status(500).send({ status: "error", error: error.message });
        }
    }

    static logout = async (req, res) => {
        // IMPORTANTE: El nombre aquí DEBE ser el mismo que usas en el login y en passport.config
        res.clearCookie('coderCookieToken').send({ 
            status: "success", 
            message: "Sesión cerrada correctamente" 
        });
    }
}