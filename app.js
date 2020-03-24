//引入express模块；
const express = require('express');

//引入用户模块的路由器；
const userRouter = require('./routes/user.js');
//引入用户模块的路由器；
const productRouter = require('./routes/product.js');
//导入mypro
const myProRouter = require('./routes/mypro.js');

//引入body-parser模块，主要是获取post提交数据
const bodyParser = require('body-parser');

//创建WEB服务器
var server = express();
//定义端口8080；
server.listen(8080);

//托管静态资源到public目录下
server.use( express.static('public') );
server.use( express.static('mypro') );

//使用bodyParser中间件
server.use( bodyParser.urlencoded({
	extended: false
}) );

//user路由器，挂载到服务器下 
// /user下   路由访问/user/reg
server.use( '/user' , userRouter );
//商品模块路由器挂载到product下
server.use( '/product', productRouter );

server.use( '/mypro',myProRouter );




