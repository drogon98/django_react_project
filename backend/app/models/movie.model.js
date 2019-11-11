let mongoose = require("mongoose");

let movieSchema = mongoose.Schema({
    title: String,
    description: String,
    episodes: Number,
    imgUrl: String
}, {
        timestamps: true
    })


module.exports = mongoose.model("Movie", movieSchema);