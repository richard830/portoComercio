const db = require('../config/config');

const CooperativaTrans = {};



CooperativaTrans.subirCooperativa = (coop, image) => {

    const sql = `
    INSERT INTO coop_transporte (
        tipo_falta,
        nombre_inspector,
        cooperativa,
        placa,
        disco,
        detalle,
        hora_foto,
        fecha_foto,
        image_cooperativa,
        tipo_falta_detalle,
        fecha_coop_transporte
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING *`;
    return db.oneOrNone(sql, [
        coop.tipo_falta,
        coop.nombre_inspector,
        coop.cooperativa,
        coop.placa,
        coop.disco,
        coop.detalle,
        coop.hora_foto,
        coop.fecha_foto,
        image.filename,
        coop.tipo_falta_detalle,
        new Date()
    ]);
}

CooperativaTrans.getMultas = () => {
    const sql = `select * from coop_transporte order by fecha_coop_transporte desc`;
    return db.manyOrNone(sql);
};



module.exports = CooperativaTrans;