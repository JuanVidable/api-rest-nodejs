"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarEmpleado = exports.actualizarEmpleado = exports.crearEmpleado = exports.getArticulosXID = exports.getEmpleados = void 0;
const mysqldb_1 = require("./mysqldb");
const getEmpleados = (req, res) => new Promise((resolve, reject) => {
    mysqldb_1.cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        console.log('MySQL Connection: ', connection.threadId);
        connection.query('SELECT * FROM empleado limit 10', (err, results) => {
            if (err)
                console.error(err);
            res.send(results);
        });
    });
});
exports.getEmpleados = getEmpleados;
const getArticulosXID = (req, res) => new Promise((resolve, reject) => {
    const idArt = parseInt(req.params.id);
    mysqldb_1.cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        connection.query('SELECT * FROM articulo WHERE id = ?', [idArt], (err, results) => {
            if (err)
                console.error(err);
            res.send(results);
        });
    });
});
exports.getArticulosXID = getArticulosXID;
const crearEmpleado = (req, res) => new Promise((resolve, reject) => {
    const { apellido, nombre, dni, sector, fechaIngreso } = req.body;
    const activo = req.body.activo === 'on' ? 1 : 0;
    var values = [apellido, nombre, dni, sector, fechaIngreso, activo];
    mysqldb_1.cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        else {
            let sql = 'INSERT INTO empleado(apellido, nombre, dni, sector, fechaIngreso, activo) VALUES (?, ?, ?, ?, ?, ?)';
            connection.query(sql, values, (err, results) => {
                if (err) {
                    console.error(err);
                    res.json({ message: "Error al tratar de insertar" });
                }
                else {
                    res.json({ message: "Empleado Insertado con exito" });
                }
            });
        }
    });
});
exports.crearEmpleado = crearEmpleado;
const actualizarEmpleado = (req, res) => {
    const { legajo, apellido, nombre, dni, sector, fechaIngreso } = req.body;
    var values = [apellido, nombre, dni, sector, fechaIngreso, legajo];
    console.log('Datos recibidos:', legajo, apellido, nombre, dni, sector, fechaIngreso);
    mysqldb_1.cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        else {
            let sql = 'UPDATE empleado SET apellido=?, nombre=?, dni=?, sector=?, fechaIngreso=? WHERE legajo=?';
            connection.query(sql, values, (err, results) => {
                if (err) {
                    console.error(err);
                    res.json({ message: "Error al actualizar " + err });
                }
                else {
                    res.json({ message: "Empleado Actualizado con exito" });
                }
                connection.release();
            });
        }
    });
};
exports.actualizarEmpleado = actualizarEmpleado;
const eliminarEmpleado = (req, res) => {
    const legajo = req.query.legajo;
    mysqldb_1.cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: "Error de conexión a la base de datos" });
            return;
        }
        const sql = 'DELETE FROM empleado WHERE legajo = ?';
        connection.query(sql, [legajo], (error, results) => {
            connection.release();
            if (error) {
                console.error(error);
                res.status(500).json({ message: "Error al eliminar el artículo" });
            }
            else {
                res.json({ message: "Artículo eliminado con éxito" });
            }
        });
    });
};
exports.eliminarEmpleado = eliminarEmpleado;
