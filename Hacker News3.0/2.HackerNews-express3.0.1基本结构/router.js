var handler = require("./handler");
var express = require("express");
var router = express.Router();



    // 2.注册路由
router.get("/index", function (req, res) { 
    handler.showIndex(req, res);
});

router.get("/", function (req, res) {
    // 重定向到index
    res.redirect("/index");
})
    // 7.渲染详情页
router.get("/submit", function (req, res) { 
    handler.showSubmit(req, res);
});

// 8.渲染添加页
router.get("/details", function (req, res, obj) { 
    handler.showDetails(req, res);    
});

router.get("/add", function (req, res) {
    handler.addGet(req, res);    
})

router.post("/add", function(req, res){
    handler.addPost(req, res);        
});


module.exports = router;


