var access_token = "";

function get_token(){
	var base64 = "Basic bXEwYld6ZEs3OXZuRVpmVGJvWjh6czJ3ZjpMY3pSeUhlNW5UZ1JaelprRklrRkU5WkRvY3lEQXk0eEdlSXM1NmQ1TzAzbnFhaHRZRA==";
	var headers = {
		Authorization: base64
	}
	headers['Content-Type'] = "application/x-www-form-urlencoded;charset=UTF-8";
	
	if (access_token === ""){
		$.ajax({
			url: "https://api.twitter.com/oauth2/token",
			//dataType: "jsonp",
			dataType: 'json',
			crossDomain: true,
			data: "grant_type=client_credentials",
			method: "POST",
			async: false,
			headers: headers,
			success: function(data, status, jqXHR){
				console.log('llego');
				access_token = data.access_token;
				debugger;
			},
			error: function(jqXHR, status, error){
				console.log('error');
				debugger;
			}
		});
	}
	return access_token;
}

$('#form_tweets').on('submit', function(e){
	e.preventDefault();
	var user = $('#user').val();
	if (!user || user=="") {
		alert('especificar usuario');
		return;
	}
	var mi_token = get_token();

	$.ajax({
		url: 'https://api.twitter.com/statuses/user_timeline',
		method: 'GET',
		dataType: 'jsonp',
		crossDomain: true,
		data: {
			screen_name: user
		},
		headers: {
			Authorization: 'Bearer AAAAAAAAAAAAAAAAAAAAAPR7yQAAAAAAkIcI%2Bg68XsZ0HEy2RZQIXxLp%2BV0%3DKQOM8THcJPcvvCNmNkuyV37EpheDFu4Lvc6QVfLIJCognEGxIi'
		},
		success: function(data, status, jqXHR){
			console.log('llego');
			debugger;
		},
		error: function(jqXHR, status, error){
			console.log('error');
			debugger;
		}
	});
});

/*
{"token_type":"bearer","access_token":"AAAAAAAAAAAAAAAAAAAAAPR7yQAAAAAAkIcI%2Bg68XsZ0HEy2RZQIXxLp%2BV0%3DKQOM8THcJPcvvCNmNkuyV37EpheDFu4Lvc6QVfLIJCognEGxIi"}labion: Basic bXEwYld6ZEs3OXZuRVpmVGJvWjh6czJ3ZjpMY3pSeUhlNW5UZ1JaelprRklrRkU5WkRvY3lEQXk0eEdlSXM1NmQ1TzAzbnFhaHRZRA==" -H "Content-Type: application/x-www-form-urlencoded;charset=UTF-8" -H "Accept: application/json" -X POST -d "grant_type=client_credentials" https://api.twitter.com/oauth2/token
 */