//引入express
const express = require('express');
//引入连接池模块pool
const pool = require('../pool.js');
//创建路由器对象
var router = express.Router();
//1.登录接口 post
router.post("/login",function(req, res){
    //获取用户名密码
    var $uname = req.body.uname;
    var $upwd = req.body.upwd;
    if(!$uname){
        res.send("kong");
        return;
    }
    if(!$upwd){
        console.log($upwd);
        res.send("密码为空");
        return;
    }
    // *非常消耗资源
    var sql = "select * from xz_user where uname=? and upwd=?";

    pool.query(sql,[$uname,$upwd],function(err, result){
        if(err) throw err ;
        if(result.length > 0){
            res.send("登陆成功");
        } else {
            res.send("登录失败");
        }
    });
});

//userList路由接口  get
router.get("/userlist", function(req, res){
    var sql = "select * from xz_user";
    pool.query(sql, function(err, result){
        if(err) throw err;

        res.send(result);

    });
});
//删除路由 get
router.get("/deluser", function(req, res){
    var $uid = req.query.uid;
    if(!$uid){
        res.send("id为空");
        return;
    }
    var sql = "delete from xz_user where uid=?"
    pool.query(sql,[$uid],function(err, result){
        if(err) throw err;
        //1==删除成功
        res.send("1");
    });
});
//修改路径 post

router.get('/updateuser', function(req, res){
    res.send('asdf');
});


//导出路由器
module.exports = router;