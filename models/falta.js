const db = require('../config/config');

const Falta = {};



// Categoria.subirCategoria = (categoria, image) => {

//     const sql = `
//     INSERT INTO categoria (nombre, image, fecha_categoria)
//     VALUES ($1, $2, $3)
//     RETURNING *`;
//     return db.oneOrNone(sql, [
//         categoria.nombre,
//         image.filename,
//         new Date()
//     ]);
// }



Falta.listarFalta = () => {
    const sql = `select * from t_falta `;
    return db.manyOrNone(sql);
};

Falta.listarFaltaGrabe = () => {
    const sql = `select * from falta_g `;
    return db.manyOrNone(sql);
};


// Categoria.listarCategoriaLimite = () => {
//     const sql = `SELECT nombre, id_categoria FROM categoria ORDER BY fecha_categoria DESC LIMIT 5;`;
//     return db.manyOrNone(sql);
// };




module.exports = Falta;