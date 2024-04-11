const db = require('../config/config');

const Tramite = {};





Tramite.listarTipoTramite = () => {
    const sql = `select * from tipo_tramite `;
    return db.manyOrNone(sql);
};






module.exports = Tramite;