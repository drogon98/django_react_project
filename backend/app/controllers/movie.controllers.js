var url = require("url");
var fs = require("fs");
var movie = require("../models/movie.model");

var fullPath = require("../../server");


exports.createMovie = (req, res) => {

}

exports.findAllMovies = (req, res) => {
    movie.find().then(docs => {
        res.json(docs);
    });
}


exports.findOneMovie = (req, res) => {
    movie.findById(req.params.movieId).then(doc => {
        res.json(doc);
    });
}

exports.updateMovie = (req, res) => {
    if (req.body) {
        movie.findByIdAndUpdate(req.params.movieId, req.body, { new: true }).then(doc => {
            res.json(doc);
        })
    } else {
        res.status(400).send({
            message: "Forbidden"
        })
    }
}


// remember to remove even the movie image
exports.deleteMovie = (req, res) => {
    // get the image
    movie.findById(req.params.movieId).then(doc => {
        let imgUrl = new URL(doc.imgUrl);
        let path = imgUrl.pathname
        let fullFilePath = fullPath.fullPath + path
        // console.log(fullFilePath);
        fs.unlink(fullFilePath, err => {
            if (err) {
                console.log(err);
            }
            console.log("Deleted file")
        });
        movie.findByIdAndRemove(req.params.movieId).then(() => {
            res.status(200).send({
                message: "Successfully deleted"
            })
        }).catch(err => {
            console.log(err);
        });
    }).catch(err => {
        res.status(400).send({
            message: "Movie with the id not found"
        })
    });
}