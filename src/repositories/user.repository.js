// src/repositories/user.repository.js
import UserDTO from "../dto/user.dto.js";

export default class UserRepository {
    constructor(dao) {
        this.dao = dao;
    }

    async getUserInfo(id) {
        const user = await this.dao.getById(id);
        // Aquí es donde sucede la magia del DTO
        return new UserDTO(user);
    }
}