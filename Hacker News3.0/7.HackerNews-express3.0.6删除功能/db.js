var MongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectID;
var url = "mongodb://localhost:27017";//服务器名
var dbName = "hackernews";//数据库名
// 专门用于处理数据
module.exports = {
    //获取所有新闻
    findAllNews: function (callback) {
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
                //获取所有数据之后调用callback
                callback(result)
            })
            //关闭服务器
            client.close();
        })
    },
    // 增加一条新闻
    addOneNews: function (news, callback) {
        MongoClient.connect(url, function (err, client) {
            if (err) {
                return console.log("连接数据失败", err);
            } 
            var db = client.db(dbName);
            //添加
            db.collection("news").insertOne({
                title: news.title,
                url: news.url,
                text: news.text
            }, function (err, result) {
                if (err) {
                    return console.log("添加数据失败", err);
                } 
                if (result.result.ok ===1) {
                    //说明数据添加成功
                    callback();
                }
            })
            client.close();
        })
    },
    // 根据id查询一条新闻
    findNewsById: function (id, callback) {
        MongoClient.connect(url, function (err, client) {
            if (err) {
                return console.log("连接数据失败", err);
            } 
            var db = client.db(dbName);
            //查询
            //在mongodb中，id并不是所谓的字符串
            // 可以把一个字符串转换成id
            db.collection("news").findOne({_id: new ObjectId(id) }, function (err, result) {
                if (err) {
                    return console.log("查询数据库失败", err);
                } 
                callback(result);
            })

            client.close();
        })
    },
    deleteNewsById: function (id, callback) {
        MongoClient.connect(url, function (err, client) {
            if (err) {
                return console.log("连接数据失败", err);
            } 
            var db = client.db(dbName);
            //删除
            db.collection("news").deleteOne({_id: new ObjectId(id) }, function (err, result) {
                if (err) {
                    return console.log("删除数据库失败", err);
                } 
                if (result.result.ok ===1) {
                    //说明数据删除成功
                    callback();
                }
            })
            client.close();
        })
    }
}