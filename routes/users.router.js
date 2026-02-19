import { Router } from "express";

const router = Router();

// [GET] para obtener recursos
router.get('/', (request, response) => {
    response.send('<h1>Listado de usuarios</h1><p>¡Bien hecho!</p>');
});
// [POST] crea un recurso 
router.post('/', (request, response) => {
    response.send('<h1> Registro de Usuarios</h1>');
});
//[PUT] actualiza un recurso
router.post('/', (request, response) => {
    response.send('<h1> Usuario actualizado</h1>');
});
//[DELETE] elimina recurso
router.delete('/', (request, response) => {
    response.send('<h1> Usuario eliminado.</h1>');
});
export default router;