import {Router} from 'express'
import {getEmpleados, crearEmpleado, actualizarEmpleado, eliminarEmpleado} from './controlador'
import path from 'path';
const router = Router();



router.get('/', (req, res) => {
    // Usa la función 'sendFile' para enviar el archivo HTML
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

router.get('/verempleados', getEmpleados);
//router.get('/articulos/:id', getArticulosXID);
router.post('/insert', crearEmpleado);
router.post('/update/', actualizarEmpleado);
router.delete('/delete/', eliminarEmpleado);
router.get('/empleados', (req, res) => {
    res.sendFile('/public/empleados.html', { root: __dirname }); // Enviar el archivo HTML al cliente
});
export default router;