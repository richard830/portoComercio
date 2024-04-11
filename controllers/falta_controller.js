const Falta = require('../models/falta');



module.exports = {



    async listarFALTA(req, res, next) {
        try {
            const id = req.body;
            const lista = await Falta.listarFalta(id);

            return res.status(200).json(lista);
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(500).json({
                success: false,
                message: 'Error al obtener la lista de empresas'
            });
        }
    },
    async listarFALTAGrabe(req, res, next) {
        try {
            const id = req.body;
            const lista = await Falta.listarFaltaGrabe(id);

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