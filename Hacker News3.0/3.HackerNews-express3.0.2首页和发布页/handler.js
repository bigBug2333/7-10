var path = require("path");
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017";//服务器名
var dbName = "hackernews";//数据库名

module.exports = {
    showIndex: function (req, res) {
        MongoClient.connect(url, function (err, client) {
            if (err) {
                return console.log("连接服务器失败", err)
            }
            var db = client.db(dbName);
            // 查询所有的新闻数据
            db.collection("news").find().toArray(function(err, result) {
                if (err) {
                    return console.log("读取服务器失败", err)
                } 
                res.render("index.html",{list: result})
            })
            //关闭服务器
            client.close();
        })
    },
    showSubmit: function (req, res) {
        //详情页
        res.sendFile(path.join(__dirname, "views", "submit.html"))
    },
    showDetails: function (req, res) {

    },
    addGet: function (req, res) {

    },
    addPost: function (req, res) {

    }
}

