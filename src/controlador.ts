import { Request, Response } from "express";
import { cxMysql } from './mysqldb';


export const getEmpleados = (req:Request, res:Response) => new Promise((resolve, reject) => {
    cxMysql.getConnection((err, connection) => {
        if (err){ 
          console.error(err);
          res.send(err);
          return;
        }
        console.log('MySQL Connection: ', connection.threadId);
        connection.query('SELECT * FROM empleado limit 10', (err, results) => {
          if (err) console.error(err);
          
          res.send(results)
        });
        
      });
  }); 

export const getArticulosXID = (req:Request, res:Response) => new Promise((resolve, reject) => {
    const idArt = parseInt(req.params.id);
    cxMysql.getConnection((err, connection) => {
        if (err){
          console.error(err);
          res.send(err);
          return;
        } 
        connection.query('SELECT * FROM articulo WHERE id = ?', [idArt], (err, results) => {
          if (err) console.error(err);
          res.send(results)
        });
      });
  });

export const crearEmpleado = (req:Request, res:Response) => new Promise((resolve, reject) => {
    
    const {apellido, nombre, dni, sector, fechaIngreso} = req.body;
    const activo = req.body.activo === 'on' ? 1 : 0;
    var values = [apellido, nombre, dni, sector, fechaIngreso, activo];
    
    cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        else{
            let sql:string = 'INSERT INTO empleado(apellido, nombre, dni, sector, fechaIngreso, activo) VALUES (?, ?, ?, ?, ?, ?)';
            connection.query(sql, values, (err, results) => {
                if (err) {
                  console.error(err);
                  res.json({message:"Error al tratar de insertar"})
                }else{
                  res.json({message:"Empleado Insertado con exito"})
                }
              });
        }          
      });
});

export const actualizarEmpleado = (req:Request, res:Response) => {
  const {legajo, apellido, nombre, dni, sector, fechaIngreso} = req.body;
  var values = [apellido, nombre, dni, sector, fechaIngreso, legajo];
  console.log('Datos recibidos:', legajo, apellido, nombre, dni, sector, fechaIngreso);
  cxMysql.getConnection((err, connection) => {
      if (err) {
          console.error(err);
          res.send(err);
          return;
      } else {
          let sql:string = 'UPDATE empleado SET apellido=?, nombre=?, dni=?, sector=?, fechaIngreso=? WHERE legajo=?';
          connection.query(sql, values, (err, results) => {
              if (err) {
                  console.error(err);
                  res.json({message: "Error al actualizar " + err});
              } else {
                  res.json({message: "Empleado Actualizado con exito"});
              }
              connection.release(); 
          });
      }
  });
};

export const eliminarEmpleado = (req: Request, res: Response) => {
  
  const legajo = req.query.legajo as string;
  cxMysql.getConnection((err, connection) => {
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
          } else {
              res.json({ message: "Artículo eliminado con éxito" });
          }
      });
  });
};