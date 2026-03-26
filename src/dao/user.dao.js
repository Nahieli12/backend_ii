// src/dao/user.dao.js
import userModel from "./models/user.model.js";

export default class UserDAO {
    async getById(id) {
        return await userModel.findById(id);
    }

    async getByEmail(email) {
        return await userModel.findOne({ email });
    }

    async create(user) {
        return await userModel.create(user);
    }
    
    async update(id, user) {
        return await userModel.findByIdAndUpdate(id, user, { new: true });
    }
}