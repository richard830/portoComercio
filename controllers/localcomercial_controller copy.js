const LocalComercial = require('../models/local_comercial');



module.exports = {

    async subirLocalComercial(req, res, next) {
        try {
            const image = req.file;
            const datos = req.body;

            data = await LocalComercial.subirLocalComecial(datos, image);
            console.log(data);
            return res.status(201).json({
                success: true,
                message: 'Datos enviado correctamente',
                data
            })
        } catch (error) {
            console.log(`Error: ${error}`)
            return res.status(501).json({
                success: false,
                message: 'Error '
            })
        }
    },




    async listarMultasLocal(req, res, next) {
        try {
            const id = req.body;
            const lista = await LocalComercial.getMultasLocal(id);

            return res.status(200).json(lista);
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(500).json({
                success: false,
                message: 'Error al obtener la lista de empresas'
            });
        }
    },










}