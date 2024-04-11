const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const multer = require('multer');
const admin = require('firebase-admin')
const serviceAccount = require('./serviceAccountKey.json');
const passport = require('passport');
const uuid = require('uuid');







//INICIALIZAR FIRABSE
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const upload = multer({
    storage: multer.memoryStorage()
})



const storageImage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        const ext = file.originalname.split('.').pop()
        cb(null, `${uuid.v4()}.${ext}`);
    }
});

const subirImagen = multer({
    storage: storageImage

});


const subirImagenTRES = multer({
    storage: storageImage,
    limits: {
        files: 3 // Número máximo de archivos (en tu caso, 3 imágenes)
    }
});

app.use('/uploads', express.static('./uploads'));



///RUTAS////
const users = require('./routes/usersRoutes');
const falta = require('./routes/FALTA_Routes');
const Tramite = require('./routes/tramite_Routes');
const Inspector = require('./routes/inspector_Routes');
const Transporte = require('./routes/transporte_Routes');
const RepresentantLocal = require('./routes/represent_local_Routes');
const CooperativaTransport = require('./routes/cooperativaTransport_Routes');
const LoCALcOMERCIAL = require('./routes/localComercial_Routes');











//const g = process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());
app.use(passport.initialize());
//app.use(passport.session());
require('./config/passport')(passport);

app.disable('x-powered-by');

app.set('port', port, /*  g  */ );


// orderDeliverySokert(io);
// chatsocket(io);

//LLAMANDO A LAS RUTAS

users(app, subirImagen);
falta(app);
Tramite(app);
Inspector(app);
Transporte(app);
RepresentantLocal(app);
CooperativaTransport(app, subirImagen);
LoCALcOMERCIAL(app, subirImagen);
















//server.listen(3000, '192.168.0.104' || 'localhost', function() {
//    console.log('Aplicaion de Nodejs ' + port + ' Iniciada...')
//})

 server.listen(port, function() {
    console.log('Aplicaion de Nodejs corriendo en ' + port + ' Iniciada...')
 })



app.get('/', (req, res) => {
    res.send('mi backend')
})

app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack)
});

module.exports = {
    app: app,
    server: server
}
