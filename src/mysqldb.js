"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cxMysql = void 0;
const mysql_1 = require("mysql");
exports.cxMysql = (0, mysql_1.createPool)({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'utn',
    connectionLimit: 100 //100 es el valor por defecto
});
