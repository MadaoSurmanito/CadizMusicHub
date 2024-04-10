function getMovie(movieId) {
    let myUrl = "/movies/" + movieId;
    $.ajax({
        type: "GET",
        dataType: "json",
        url: myUrl,
        success: function(data) {
	    $("#resPelicula").html(JSON.stringify(data[0]));
        },
        error: function(res) {
            let mensaje = JSON.parse(res.responseText);
            alert("ERROR: " + mensaje.msg);
        }
    });
}

function postMovie() {
    $.ajax({
        type: "POST",
        url: "/movies",
        contentType: "application/json",
        dataType: "text",
        data: JSON.stringify({
            "title": "Dunkirk",
            "director": "Christopher Nolan",
            "year": 2017
        }),
        success: function(data) {
           $("#resPelicula").html(data);
        },
        error: function(res) {
            alert("ERROR: " + res.statusText);
        }
    });
}

function getAllMovies() {
    let myUrl = "/movies";
    $.ajax({
        type: "GET",
        dataType: "json",
        url: myUrl,
        success: function(data) {
	    	$("#resPelicula").html(JSON.stringify(data));
        },
        error: function(res) {
            console.error("ERROR:", res.status, res.statusText);
        }
    });
}
