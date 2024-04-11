const db = require('../config/config');

const Transporte = {};





Transporte.listarTransporte = () => {
    const sql = `select * from transporte `;
    return db.manyOrNone(sql);
};





module.exports = Transporte;