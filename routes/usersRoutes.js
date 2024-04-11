const UsersController = require('../controllers/usersController');




module.exports = (app, subirImagen) => {

    app.post('/api/users/crear', UsersController.Crear);
    // app.post('/api/users/crear', subirImagen.single('image'), UsersController.Crear);
    app.post('/api/users/login', UsersController.login);
    app.post('/api/users/logout', UsersController.logout);








}