const CooperativaTransport = require('../models/cooperati_tranport');



module.exports = {

    async subirCooperativatroller(req, res, next) {
        try {
            const image = req.file;
            const datos = req.body;

            data = await CooperativaTransport.subirCooperativa(datos, image);
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



    async listarMultas(req, res, next) {
        try {
            const id = req.body;
            const lista = await CooperativaTransport.getMultas(id);

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