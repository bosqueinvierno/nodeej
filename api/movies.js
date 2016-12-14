var fs = require('fs');
var random_maker = require('randomstring');

var data = JSON.parse(fs.readFileSync('db.json', 'utf8'));
var movies = data.movies;



module.exports = function(router) {

	// se listan las rutas
	router.get('/movies', function(req, res) {
	    res.json({movies: movies});   
	});

	// se guarda una nueva pelicula
	router.post('/movies', function(request, response) {
		var new_movie = {
			id: random_maker.generate({charset: 'alphabetic', length: 12}),
			title: request.body.title,
			year: request.body.year,
			genre: request.body.genre
		}
		movies.push(new_movie);
		response.json({id: new_movie.id});
	});

	router.delete('/movies/:id', function(request, response) {
		var movie_id = request.params.id;
		for(var i=0 ; i<movies.length ; ++i) {
			if (movies[i].id == movie_id) {
				movies.splice(i, 1);
				response.json({});
			}
		}
		response.statusCode = 204;
		response.json({});
	});

	router.put('/movies/:id', function(request, response) {
		var movie_id = request.params.id;
		for(var i=0 ; i<movies.length ; ++i) {
			if (movies[i].id == movie_id) {
				movies[i].title = request.body.title;
				movies[i].year = request.body.year;
				movies[i].genre = request.body.genre;
				response.json({});
			}
		}
		response.statusCode = 204;
		response.json({});
	});
}