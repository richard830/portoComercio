const RepresentantController = require('../controllers/representant_local_controller');




module.exports = (app, subirImagen) => {


    app.get('/api/representantLocal/listarRepresentantLocal', RepresentantController.listarRepresentant);


}