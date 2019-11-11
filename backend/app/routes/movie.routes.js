module.exports = app => {
    var movieControllers = require("../controllers/movie.controllers.js");

    app.post("/movies/add", movieControllers.createMovie);

    app.get("/movies", movieControllers.findAllMovies);

    app.get("/movies/:movieId", movieControllers.findOneMovie);

    app.put("/movies/:movieId", movieControllers.updateMovie);

    app.delete("/movies/:movieId", movieControllers.deleteMovie);
}