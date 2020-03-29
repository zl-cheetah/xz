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

//查询用户 get
router.get("/query", function(req, res){
    var $uid = req.query.uid;
    if(!$uid){
        res.send("uid 不存在");
        return;
    }
    var sql = "select * from xz_user where uid=?";

    pool.query(sql, [$uid], function(err, result){
        //console.log(result);

        if(result.length>0){
            res.send(result[0]);
        } else {
            res.send("没有查到用户信息");
        }

    });
});

//修改路径 post

router.post("/update",function(req, res){
    var $uid = req.body.uid;
    var $uname = req.body.uname;
    var $email = req.body.email;
    var $phone = req.body.phone;
    var $user_name = req.body.user_name;
    var $upwd = req.body.upwd;
    var $gender = req.body.gender;
    if(!$uid){res.send("id为空");return;}
    if(!$email){res.send("邮箱为空");return;}
    if(!$phone){res.send("联系方式为空");return;}
    if(!$user_name){res.send("真实姓名为空");return;}
    if(!$upwd){res.send("密码为空");return;}
    if(!$gender){res.send("性别为空");return;}
    if(!$uname){res.send("用户名为空");return;}

    var sql = "update xz_user set uname=?,email=?,upwd=?,phone=?,user_name=?,gender=? where uid=?";
    //pool 传参顺序，要与sql参数数据位置一样
    pool.query(sql, [$uname, $email, $upwd, $phone, $user_name, $gender, $uid], function (err, result) {
        if(err) throw err;
        console.log(result);
        res.send("alert('修改成功'); location.href = ('http://localhost:8080/userlist.html')");
    } );
});

//导出路由器
module.exports = router;