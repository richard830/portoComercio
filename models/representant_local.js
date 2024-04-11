const db = require('../config/config');

const RepresentantLocal = {};






RepresentantLocal.listarRepreLocal = () => {
    const sql = `select * from represt_local `;
    return db.manyOrNone(sql);
};





module.exports = RepresentantLocal;