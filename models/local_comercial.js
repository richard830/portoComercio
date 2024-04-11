const db = require('../config/config');

const LocalComercial = {};



LocalComercial.subirLocalComecial = (coop, image) => {

    const sql = `
    INSERT INTO local_comercial (
        tipo_falta_c,
        nombre_inspector_c,
        represent_local_c,
        detalle_c,
        image_c,
        hora_foto_c,
        fecha_foto_c,
        tipo_falta_detallel,
        fecha_local
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *`;
    return db.oneOrNone(sql, [
        coop.tipo_falta_c,
        coop.nombre_inspector_c,
        coop.represent_local_c,
        coop.detalle_c,
        image.filename,
        coop.hora_foto_c,
        coop.fecha_foto_c,
        coop.tipo_falta_detallel,
        new Date()
    ]);
}

LocalComercial.getMultasLocal = () => {
    const sql = `select * from local_comercial order by fecha_local desc`;
    return db.manyOrNone(sql);
};



module.exports = LocalComercial;