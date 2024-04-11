const db = require('../config/config');

const Inspector = {};


Inspector.listarInspector = () => {
    const sql = `select * from inspector WHERE id_tipo_tramite = '1'`;
    return db.manyOrNone(sql);
};



Inspector.listarInspectorlOCAL = () => {
    const sql = `select * from inspector WHERE id_tipo_tramite = '2'`;
    return db.manyOrNone(sql);
};



module.exports = Inspector;