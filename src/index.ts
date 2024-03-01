import express from "express";
import path from "path";
const app = express();

import rutas from './rutas';

//para transformar los datos a objetos json
app.use(express.json());
//transformar los datos de un formulario html a objetos json 
app.use(express.urlencoded({extended:false}));

app.use(rutas);

app.use(express.static(path.join(__dirname, "public")));

app.listen(3000, () => {
    console.log("Servidor en puerto 3000", 3000);
})