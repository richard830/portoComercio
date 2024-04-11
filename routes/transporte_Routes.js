const TransporteController = require('../controllers/trasnporte_controller');




module.exports = (app) => {


    app.get('/api/transporte/listarTransporte', TransporteController.listarTransporte);


}