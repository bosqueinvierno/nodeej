// primero cargamos las dependencias
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// configurar bodyparser para obtener variables posts
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8000;
var router = express.Router();

// middleware
router.use(function(req, res, next) {
    next(); // make sure we go to the next routes and don't stop here
});

app.use(express.static('public'));

// loads API's modules
require('./api/movies.js')(router);
require('./api/twitter.js')(router);


// Se registran las rutas
app.use('/api', router);

// Se inicializa el servidor
app.listen(port);
console.log('Inicializado el servidor en el puerto ' + port);