const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: { 
        type: String, 
        required: true 
    },
    last_name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        unique: true, 
        required: true,
        lowercase: true,
        trim: true
    },
    age: { 
        type: Number, 
        required: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    cart: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Carts' // Asegúrate de que coincida con el nombre en cart.model.js
    },
    role: { 
        type: String, 
        default: 'user' 
    }
});

// Esta validación evita el error "OverwriteModelError" que te salió en la terminal
const userModel = mongoose.models.user || mongoose.model('user', userSchema);

module.exports = userModel;

