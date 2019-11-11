let express = require("express");
let bodyparser = require("body-parser");
let cors = require("cors");
let mongoose = require("mongoose");
let fs = require("fs");
let path = require("path");
let multer = require("multer");
let dbUrl = require("./config/database.config");

let Movie = require("./app/models/movie.model")

// connect to the database

mongoose.connect(dbUrl.url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
}).then(() => {
    console.log("Successfully connected to the db");
}
).catch(err => {
    console.log("Error connecting to the db");
}
)

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + ".png");
    }
});

let upload = multer({ storage: storage });

let API_PORT = 3030;

// create express app
let app = express();

app.set("view engine", "ejs");

app.use("/assets", express.static("assets"));

app.use("/uploads", express.static("uploads"));

app.use("/downloads", express.static("downloads"));

app.use(cors());

var routes = require("./app/routes/movie.routes");

routes(app);

app.get("/admin", (req, res) => {
    res.render("admin");
});

app.post("/create/", upload.single("image"), (req, res, next) => {
    var image_url = "http://" + req.hostname + ":" + API_PORT + "/" + "uploads" + "/" + req.file.filename
    if (req.body && req.file) {
        let movie = new Movie({
            title: req.body.title,
            description: req.body.description,
            episodes: req.body.episodes,
            imgUrl: image_url
        });

        movie.save().then(doc => {
            console.log(doc);
        }).catch(
            err => {
                console.log("Some error " + err);
            }
        )

    } else {
        res.send({
            message: "Some empty fields"
        })
    }
    next();
});


app.listen(API_PORT, () => {
    console.log(`Server running at port ${API_PORT}...`);
});

// console.log(__dirname);
exports.fullPath = __dirname;

