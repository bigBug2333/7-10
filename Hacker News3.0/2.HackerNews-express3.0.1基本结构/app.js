// 1.基础结构
var express = require("express");
var bodyParser = require("body-parser");

var router = require("./router")

var app = express();

// 3.虚拟目录
app.use("/assets", express.static("assets"));

// 5.设置模板引擎
app.engine("html", require("express-art-template"));

// 9.使用中间件 body-parser
app.use( bodyParser.urlencoded({extended:true}) );


// 2.注册路由
app.use(router);


app.listen(8899, function () {
    console.log("HackerNews2.0已经上线，访问：http://localhost:8899");
})

