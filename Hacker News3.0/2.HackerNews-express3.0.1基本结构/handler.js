var path = require("path");
var fs = require("fs");

module.exports = {
    showIndex: function (req, res) {
        res.sendFile(path.join(__dirname, "views", "index.html"));
    },
    showSubmit: function (req, res) {

    },
    showDetails: function (req, res) {

    },
    addGet: function (req, res) {

    },
    addPost: function (req, res) {

    }
}

