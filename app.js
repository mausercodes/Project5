var app = {};

//Sorts most popular movies by user specified year
app.popularMoviesByYear = function(query){
	$.ajax({
		url: "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc",
		type: "GET",
		dataType: "jsonp",
		data: {
			api_key: "b8991274d30a28d4de64b1c4f873af94",
			format: "jsonp",
			primary_release_year: query
		},
		success: function(data){
			app.displayMovies(data);	
		}
	});	
};

//Converts user entered actor/actress name into actor/actress id.
//Passes actor/actress id to popularMoviesWithCast() || votedMoviesWithCast() || revenueMovieWithCast()
//Appropriate function is called depending on value of test
app.actorId = function(query, test){
	$.ajax({
		url: "https://api.themoviedb.org/3/search/person?",
		type: "GET",
		dataType: "jsonp",
		data: {
			api_key: "b8991274d30a28d4de64b1c4f873af94",
			format: "jsonp",
			query: query
		},
		success: function(data){
			var personId = data.results[0].id;
			if (test === 1){
				app.popularMoviesWithCast(personId);
			}
			else if (test == 2){
				app.votedMoviesWithCast(personId);
			}
			else{
				app.revenueMoviesWithCast(personId);
			}
			console.log(test);
		}
	});
};

//Sorts most popular movie by user specified actor/actress
app.popularMoviesWithCast = function (query){
	$.ajax({
		url: "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc",
		type: "GET",
		dataType: "jsonp",
		data: {
			api_key: "b8991274d30a28d4de64b1c4f873af94",
			format: "jsonp",
			with_cast: query
		},
		success: function(data){
			app.displayMovies(data);
		}
	});
};

//Sorts most popular movies by rating based on Canadian film rating system
app.popularMoviesByRating = function (query){
	$.ajax({
		url: "https://api.themoviedb.org/3/discover/movie?certification_country=CA&sort_by=popularity.desc",
		type: "GET",
		dataType: "jsonp",
		data: {
			api_key: "b8991274d30a28d4de64b1c4f873af94",
			format: "jsonp",
			certification: query
		},
		success: function(data){
			app.displayMovies(data);	
		}
	});	
};

//Sorts highest voted movies by user specified year
app.votedMoviesByYear = function(query){
	$.ajax({
		url: "https://api.themoviedb.org/3/discover/movie?sort_by=vote_average.desc",
		type: "GET",
		dataType: "jsonp",
		data: {
			api_key: "b8991274d30a28d4de64b1c4f873af94",
			format: "jsonp",
			primary_release_year: query,
		},
		success: function(data){
			app.displayMovies(data);	
		}
	});	
};

//Sorts highest voted movies by user specified actor/actress
app.votedMoviesWithCast = function (query){
	$.ajax({
		url: "https://api.themoviedb.org/3/discover/movie?sort_by=vote_average.desc",
		type: "GET",
		dataType: "jsonp",
		data: {
			api_key: "b8991274d30a28d4de64b1c4f873af94",
			format: "jsonp",
			with_cast: query
		},
		success: function(data){
			app.displayMovies(data);
		}
	});
};

//Sorts highest voted movies by rating
app.votedMoviesByRating = function (query){
	$.ajax({
			url: "https://api.themoviedb.org/3/discover/movie?certification_country=CA&sort_by=vote_average.desc",
		type: "GET",
		dataType: "jsonp",
		data: {
			api_key: "b8991274d30a28d4de64b1c4f873af94",
			format: "jsonp",
			certification: query
		},
		success: function(data){
			app.displayMovies(data);
		}
	});
};

//Sorts highest revenue movies by user specified year
app.revenueMoviesByYear = function(query){
	$.ajax({
		url: "https://api.themoviedb.org/3/discover/movie?sort_by=revenue.desc",
		type: "GET",
		dataType: "jsonp",
		data: {
			api_key: "b8991274d30a28d4de64b1c4f873af94",
			format: "jsonp",
			primary_release_year: query
		},
		success: function(data){
			app.displayMovies(data);	
		}
	});	
};

//Sorts highest revenue movies by user specified actor/actress
app.revenueMoviesWithCast = function(query){
	$.ajax({
		url: "https://api.themoviedb.org/3/discover/movie?sort_by=revenue.desc",
		type: "GET",
		dataType: "jsonp",
		data: {
			api_key: "b8991274d30a28d4de64b1c4f873af94",
			format: "jsonp",
			with_cast: query
		},
		success: function(data){
			app.displayMovies(data);	
		}
	});	
};

//Sorts highest revenue movies by rating
app.revenueMoviesByRating = function (query){
	$.ajax({
		url: "https://api.themoviedb.org/3/discover/movie?certification_country=CA&sort_by=revenue.desc",
		type: "GET",
		dataType: "jsonp",
		data: {
			api_key: "b8991274d30a28d4de64b1c4f873af94",
			format: "jsonp",
			certification: query
		},
		success: function(data){
			app.displayMovies(data);
		}
	});
};

//Empties .movieContainer
//Append results to .movieContainer
app.displayMovies = function(movieData){
	$(".movieContainer").empty();
	for(var i = 0; i < movieData.results.length; i++){
		var $title = $("<h2>").text(movieData.results[i].title);
		var $image = $("<img>").attr("src", "https://image.tmdb.org/t/p/w396" + movieData.results[i].poster_path)
		$(".movieContainer").append($title);
		$(".movieContainer").append($image);
	}
};

app.events = function(movieData){
	//On form submit find movies based on search criteria
	$("form.popularSearchByYear").on("submit", function(e){
		e.preventDefault();
		var year = $(this).find("input[type=search]").val();
		app.popularMoviesByYear(year);
		$(this).find("input[type=search]").val("");
		$(".movieContainer").css("display", "block")
	});

	$("form.popularSearchByPerson").on("submit", function(e){
		e.preventDefault();
		var test = 1;
		var actor = $(this).find("input[type=search]").val();
		app.actorId(actor, test);
		$(this).find("input[type=search]").val("");
		$(".movieContainer").css("display", "block")
	});

	$("form.popularSearchByRating").on("submit", function(e){
		e.preventDefault();
		var rating = $(this).find("input[type=search]").val();
		app.popularMoviesByRating(rating);
		$(this).find("input[type=search]").val("");
		$(".movieContainer").css("display", "block")
	});

	$("form.voteSearchByYear").on("submit", function(e){
		e.preventDefault();
		var year = $(this).find("input[type=search]").val();
		app.votedMoviesByYear(year);
		$(this).find("input[type=search]").val("");
		$(".movieContainer").css("display", "block")
	});

	$("form.voteSearchByPerson").on("submit", function(e){
		e.preventDefault();
		var test = 2;
		var actor = $(this).find("input[type=search]").val();
		app.actorId(actor, test);
		$(this).find("input[type=search]").val("");
		$(".movieContainer").css("display", "block")
	});

	$("form.voteSearchByRating").on("submit", function(e){
		e.preventDefault();
		var rating = $(this).find("input[type=search]").val();
		app.votedMoviesByRating(rating);
		$(this).find("input[type=search]").val("");
		$(".movieContainer").css("display", "block")
	});

	$("form.revenueSearchByYear").on("submit", function(e){
		e.preventDefault();
		var year = $(this).find("input[type=search]").val();
		app.revenueMoviesByYear(year);
		$(this).find("input[type=search]").val("");
		$(".movieContainer").css("display", "block")
	});

	$("form.revenueSearchByPerson").on("submit", function(e){
		e.preventDefault();
		var test = 3;
		var actor = $(this).find("input[type=search]").val();
		app.actorId(actor, test);
		$(this).find("input[type=search]").val("");
		$(".movieContainer").css("display", "block")
	});

	$("form.revenueSearchByRating").on("submit", function(e){
		e.preventDefault();
		var rating = $(this).find("input[type=search]").val();
		app.revenueMoviesByRating(rating);
		$(this).find("input[type=search]").val("");
		$(".movieContainer").css("display", "block")
	});

	//on button click show appropriate search options
	$(".popular a").on("click", function(e){
		e.preventDefault();
		$(".select").toggleClass("true");
	});

	$(".highestRated a").on("click", function(e){
		e.preventDefault();
		$(".select2").toggleClass("true");
	});

	$(".highestRevenue a").on("click", function(e){
		e.preventDefault();
		$(".select3").toggleClass("true");
	});
};

app.init = function(){
	app.popularMoviesByYear();
	app.popularMoviesByRating();

	app.votedMoviesByYear();
	app.votedMoviesByRating();

	app.revenueMoviesByYear();
	app.revenueMoviesByRating();

	app.events();
};

$(function(){
	app.init();
});