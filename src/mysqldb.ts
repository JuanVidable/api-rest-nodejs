import {createPool} from 'mysql'


export const cxMysql = createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'utn',
    connectionLimit: 100 //100 es el valor por defecto
});