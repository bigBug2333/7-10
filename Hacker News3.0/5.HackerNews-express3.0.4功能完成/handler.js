var path = require("path");
var MongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectID;
var url = "mongodb://localhost:27017";//服务器名
var dbName = "hackernews";//数据库名

module.exports = {
    showIndex: function (req, res) {
        MongoClient.connect(url, function (err, client) {
            if (err) {
                return console.log("连接数据失败", err)
            }
            var db = client.db(dbName);
            // 查询所有的新闻数据
            db.collection("news").find().toArray(function(err, result) {
                if (err) {
                    return console.log("查询数据库失败", err)
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
        //1.获取id值
        // 2.数据中根据id来查找对应的数据 findone
        var id = req.query.id;
        MongoClient.connect(url, function (err, client) {
            if (err) {
                return console.log("连接数据失败", err);
            } 
            var db = client.db(dbName);
            //查询
            //在mongodb中，id并不是所谓的字符串
            // 可以把一个字符串转换成id
            db.collection("news").findOne({_id: new ObjectId(id) }, function (err, result
            
            ) {
                if (err) {
                    return console.log("查询数据库失败", err);
                } 
                res.render("details.html", result)
            })

            client.close();
        })
    },
    addGet: function (req, res) {
        // 1.获取到请求的参数
        var newsData = req.query;
        // 2.添加到数据库中
        MongoClient.connect(url, function (err, client) {
            if (err) {
                return console.log("连接数据失败", err);
            } 
            var db = client.db(dbName);
            //添加
            db.collection("news").insertOne({
                title: newsData.title,
                url: newsData.url,
                text: newsData.text
            }, function (err, result) {
                if (err) {
                    return console.log("添加数据失败", err);
                } 
                if (result.result.ok ===1) {
                    //说明数据添加成功
                    res.redirect("/");
                }
            })
            client.close();
        })
    },
    addPost: function (req, res) {
        // 1.获取到请求的参数
        var newsData = req.body;
        // 2.添加到数据库中
        MongoClient.connect(url, function (err, client) {
            if (err) {
                return console.log("连接数据失败", err);
            } 
            var db = client.db(dbName);
            //添加
            db.collection("news").insertOne({
                title: newsData.title,
                url: newsData.url,
                text: newsData.text
            }, function (err, result) {
                if (err) {
                    return console.log("添加数据失败", err);
                } 
                if (result.result.ok ===1) {
                    //说明数据添加成功
                    res.redirect("/");
                }
            })
            client.close();
        })
    }
}

