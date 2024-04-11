const Inspector = require('../models/inspector');



module.exports = {



    async listarInspector(req, res, next) {
        try {
            const id = req.body;
            const lista = await Inspector.listarInspector(id);

            return res.status(200).json(lista);
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(500).json({
                success: false,
                message: 'Error al obtener la lista de empresas'
            });
        }
    },


    async listarInspectorLocal(req, res, next) {
        try {
            const id = req.body;
            const lista = await Inspector.listarInspectorlOCAL(id);

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