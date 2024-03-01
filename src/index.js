"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const rutas_1 = __importDefault(require("./rutas"));
//para transformar los datos a objetos json
app.use(express_1.default.json());
//transformar los datos de un formulario html a objetos json 
app.use(express_1.default.urlencoded({ extended: false }));
app.use(rutas_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.listen(3000, () => {
    console.log("Servidor en puerto 3000", 3000);
});
