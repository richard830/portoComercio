const FaltaController = require('../controllers/falta_controller');




module.exports = (app, subirImagen) => {


    // app.post('/api/categoria/subir_categoria', subirImagen.single('image'), CategoriaController.subirCategoriaController);
    // app.get('/api/categoria/listarCategoria', CategoriaController.listarCategoria);
    app.get('/api/falta/listarFalta', FaltaController.listarFALTA);
    app.get('/api/falta/listarFaltaGrabe', FaltaController.listarFALTAGrabe);


}