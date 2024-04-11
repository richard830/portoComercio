const InspectorController = require('../controllers/inspector_controller');




module.exports = (app, subirImagen) => {


    app.get('/api/inspector/listarInspector', InspectorController.listarInspector);
    app.get('/api/inspector/listarInspectorLocal', InspectorController.listarInspectorLocal);


}