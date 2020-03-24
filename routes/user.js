//引入Express
const express = require('express');
//引入连接池模块
var pool = require('../pool.js');

//创建一个路由器对象;
var router = express.Router();

//添加路由
//1.用户注册路由（插入数据）
router.post( '/reg', function(req,res){
	//做个用户注册的验证
	//获取数据
	//console.log(req.body);
	//验证数据是否为空
	if(!req.body.uname){
		//判断完成后执行send
		res.send({code:401,msg:'uname required'});
		//上面已经执行一次send，需要阻止执行后面的send，否则会报错
		return;
	}
	if(!req.body.upwd){
		res.send({code:402,msg:'upwd required'});
		return;
	}
	if(!req.body.email){
		res.send({code:403,msg:'email required'});
		return;
	}
	if(!req.body.phone){
		res.send({code:404,msg:'phone required'});
		return;
	}
	
	//把数据插入到数据库中
	//执行sql语句
	//参数1：写好添加数据的sql语句 ?是占位符
	//参数2：定义占位符的值为上面所获得的req.body对象中的值
	//参数3：回调函数
	pool.query('INSERT INTO xz_user SET ?',	[req.body], function(err,result){
		//当碰到错误err,打印err
		if(err) throw err;
		if(result.affectedRows>0){
			res.send({code:200,msg:'register suc'});
		}
		return;
	});
	
	//res.send('注册成功');
} );

//2.用户登录路由（查询数据）
router.post( '/login', function( req,res ){
	//获取post请求数据
	//console.log(req.body);
	//验证数据是否为空
	if(!req.body.uname){
		res.send({code:401, msg:'uname required'});
		return;
	}
	if(!req.body.upwd){
		res.send({code:402, msg:'upwd required'});
		return;
	}
	
	//执行SQL语句，查询数据库中是否有相匹配的数据
	pool.query("SELECT * FROM xz_user WHERE uname=? AND upwd=?", [req.body.uname,req.body.upwd], function(err, result){
		if(err) throw err;
		//如果数组中有元素，说明登录成功，否则登录失败
		if(result.length>0){
			res.send({code:200, msg:'login suc'});
		}else {
			res.send({code: 301, msg:'login err'});
		}
	});
} );

//3.用户删除路由（删除数据）
router.get( '/delect',function(req,res){
	//获取数据
	//console.log(req.query);
	//验证数据是否为空
	if(!req.query.uid){
		res.send({code: 401, msg: "uid required"});
		return;
	}
	//执行sql语句，删除传递编号的数据
	pool.query('DELETE FROM xz_user WHERE uid=?', [req.query.uid], function(err, result){
		if(err) throw err;
		//删除结果中是对象，利用对象中的属性affectedRows
		if( result.affectedRows > 0 ){
			res.send({code: 200, msg: 'delect suc'});
		} else {
			res.send({code: 301, msg: 'delect err'});
		}
	} );
} );

//4.检索用户列表路由（查询数据）
router.get( '/detail',function(req, res){
	//判断输入内容是否为空
	if(!req.query.lid){
		res.send({code:401, msg:'lid required'});
		return;
	}
	pool.query( 'SELECT * FROM xz_user where uid=?',[req.query.lid],function(err, result){
		if(err) throw err;
		if( result.length > 0 ){
			res.send(result);
		} else {
			res.send({ code:301, mag: 'lid err' });
		}
	} );
} );

//5.用户修改路由（修改数据）
router.post( '/update', function(req, res){
	//由于需要判断数据过多
	//需要创建一个对象保存提交的数据，进行判断是否为空
	var obj = req.body;
	//console.log(obj);
	var num=400;
	for(var key in obj){
		num++;
		if(!obj[key]){
			res.send({code: num,msg:key+' required'});
			return;
		}
	}
	//执行SQL语句，修改编号对应的数据
	pool.query( 'UPDATE xz_user SET email=?, phone=?, user_name=?, gender=? WHERE uid=?',
		[obj.email, obj.phone, obj.user_name, obj.gender, obj.uid], function(err, result){
			if(err) throw err;
			if(result.affectedRows > 0){
				res.send({code:200, msg: 'update suc'});
			} else {
				res.send({ code:301, msg: 'update err' });
			}
		} );
	//pool.body('UPDATE SET xz_user WHERE uid=?',);
	
} );

//6.用户列表分页查询（查询数据）
router.post( '/list', function(req,res){
	var pno = req.body.pno;//页码
	var count = req.body.count;//数量
	
	//如果页码为空，设置默认值
	//设置默认页码为1
	if(!pno) pno = 1;
	//如果数量为空，设置每页显示2个数据
	if(!count) count = 2;
	
	//不为空时，将数据转为整形
	pno = parseInt(pno);
	count = parseInt(count);
	//console.log(pno, count);
	
	var start = (pno - 1) * count;
	
	//执行SQL语句
	pool.query('SELECT * FROM xz_user LIMIT ?,?', [start,count], function(err, result){
		if(err) throw err;
		res.send(result);
	} );
	
} );

//导出路由器
module.exports = router;












