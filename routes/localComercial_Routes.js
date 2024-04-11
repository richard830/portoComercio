const LocalComercialController = require('../controllers/localcomercial_controller copy');




module.exports = (app, subirImagen) => {


    app.post('/api/localComercial/subir_local', subirImagen.single('image_c'), LocalComercialController.subirLocalComercial);

    app.get('/api/localComercial/listarMultasLocal', LocalComercialController.listarMultasLocal);


}