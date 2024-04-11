const Transporte = require('../models/transporte');



module.exports = {



    async listarTransporte(req, res, next) {
        try {
            const id = req.body;
            const lista = await Transporte.listarTransporte(id);

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