var path = require("path");
var db = require("./db");

module.exports = {
    showIndex: function (req, res) {
        db.findAllNews(function (result) {
            res.render("index.html",{list: result})            
        })
    },
    showSubmit: function (req, res) {
        //详情页
        res.sendFile(path.join(__dirname, "views", "submit.html"))
    },
    showDetails: function (req, res) {
        //1.获取id值
        // 2.数据中根据id来查找对应的数据 findone
        var id = req.query.id;
        db.findNewsById(id, function (result) {
            res.render("details.html", result);
        })
    },
    addGet: function (req, res) {
        // 1.获取到请求的参数
        var newsData = req.query;
        // 2.添加到数据库中
        db.addOneNews(newsData, function () {
            res.redirect("/");
        })
    },
    addPost: function (req, res) {
        // 1.获取到请求的参数
        var newsData = req.body;
        // 2.添加到数据库中
        db.addOneNews(newsData, function () {
            res.redirect("/");
        })
    }
}

