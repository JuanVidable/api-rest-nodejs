"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controlador_1 = require("./controlador");
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    // Usa la función 'sendFile' para enviar el archivo HTML
    res.sendFile(path_1.default.join(__dirname, '../public', 'index.html'));
});
router.get('/verempleados', controlador_1.getEmpleados);
//router.get('/articulos/:id', getArticulosXID);
router.post('/insert', controlador_1.crearEmpleado);
router.post('/update/', controlador_1.actualizarEmpleado);
router.delete('/delete/', controlador_1.eliminarEmpleado);
router.get('/empleados', (req, res) => {
    res.sendFile('/public/empleados.html', { root: __dirname }); // Enviar el archivo HTML al cliente
});
exports.default = router;
