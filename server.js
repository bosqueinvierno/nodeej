// primero cargamos las dependencias
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var random_maker = require('randomstring');

// variable
var movies = [];

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

// se listan las rutas
router.get('/', function(req, res) {
    res.json({movies: movies});   
});

// se guarda ana nueva pelicula
router.post('/', function(request, response) {
	var new_movie = {
		id: random_maker.generate({charset: 'alphabetic', length: 12}),
		title: request.body.title,
		year: request.body.year,
		genre: request.body.genre
	}
	movies.push(new_movie);
	response.json({id: new_movie.id});
});

// Se registran las rutas
app.use('/api', router);

// Se inicializa el servidor
app.listen(port);
console.log('Inicializado el servidor en el puerto ' + port);