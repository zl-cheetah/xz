//引入express
const express = require('express');
//创建一个路由对象
var router = express.Router();
//添加连接池
const pool = require('../pool.js');

//1.商品列表分页信息
router.get( '/list', function(req, res){
	//获取数据
	var obj = req.query;
	var pno = obj.pno;
	var count = obj.count;
	
	//判断数据中是否为空,设置默认值
	if(!pno) pno = 1;
	if(!count) count = 5;
	
	//转换数值类型
	pno=parseInt(pno);
	count=parseInt(count);
	//计算start
	start = (pno-1)*count;
	//执行SQL语句
	pool.query( 'SELECT * FROM xz_laptop LIMIT ?,?', [start, count],function(err,result ){
		if(err) throw err;
		res.send(result);
	} );
} );

//导出路由器
module.exports = router;