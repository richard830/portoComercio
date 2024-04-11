const CooperativaTransController = require('../controllers/cooperativa_transports_controller');




module.exports = (app, subirImagen) => {


    app.post('/api/cooperativaTransports/subir_cooperativa', subirImagen.single('image_cooperativa'), CooperativaTransController.subirCooperativatroller);

    app.get('/api/cooperativaTransports/listarMultasCooperativa', CooperativaTransController.listarMultas);


}