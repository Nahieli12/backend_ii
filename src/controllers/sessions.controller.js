// src/controllers/sessions.controller.js
import UserDTO from "../dto/user.dto.js";

export default class SessionsController {
    
    static current = async (req, res) => {
        try {
            if (!req.user) return res.status(401).send({ status: "error", error: "No user" });
            const user = new UserDTO(req.user);
            res.send({ status: "success", payload: user });
        } catch (error) {
            res.status(500).send({ status: "error", error: error.message });
        }
    }

    static logout = async (req, res) => {
        // Aquí limpias la cookie que estés usando para el JWT
        res.clearCookie('coderCookie'); // <--- Asegúrate que este sea el nombre de tu cookie
        res.send({ status: "success", message: "Logged out" });
    }
}