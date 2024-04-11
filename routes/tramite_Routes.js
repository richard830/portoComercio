const TramiteController = require('../controllers/tramite_controller');




module.exports = (app, subirImagen) => {


    app.get('/api/tramite/listarFaltaTramite', TramiteController.listarFTramite);


}