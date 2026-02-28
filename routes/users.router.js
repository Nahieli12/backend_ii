import { Router } from "express";
import { UserModel } from "../src/models/user.model.js";

const router = Router();

// [GET] para obtener recursos
router.get('/', async (request, response) => {
    try {
            const result = await UserModel.find();
            response.json({
                status: 'success',
                payload: result
            });
    } catch (error) {
            response.status(500).send({
                status: 'error',
                messege: error.messege
            });
    }
    
});
// [POST] crea un recurso 
router.post('/', async (request, response) => {
    try {
        const { name, email, age } = request.body; 
        const result = await UserModel.create({ name, email, age });
        
        response.json({
            status: 'success', 
            payload: result
        });
        console.log('Usuario registrado', result);
    } catch (error) {
        console.error('No se pudo crear el recurso (usuario)', error)
        response.status(400).json({ 
            status: 'error',
            message: error.message 
        });
    }
});
//[PUT] actualiza un recurso
router.put('/:uid', async (request, response) => {
    const udi = request.params.uid;
    const { name, age, email} = request.body;
    try {
        const user = await UserModel.findOne({_id: uid});
        if (!user) {
            response.status(401).json({
                status: 'error',
                messege: 'No existe este usuario'
            })
        }

        const newUser = {
            name: name ?? user.name,
            email: email ?? user.email,
            age: age ?? user.age
        }

        const result = await UserModel.updateOne({_id:uid}, newUser)
        response.json({
            status: 'success',
            payload: result
        });

    }catch(error) {
        response.status(500).json({
            status:'error',
            messege: error.messege
        });
    }
})
//[DELETE] elimina recurso
router.delete('/:uid', async (request, response) => {
    const uid = request.params.uid;
    
    try {
            const result = await UserModel.deleteOne({_id: uid});
            response.json({
                status: 'success',
                payload: result
            });
    } catch (error) {
            response.status(500).send({
                status: 'error',
                messege: error.messege
            });
    }
});
export default router;