const mysql = require('mysql');

//创建连接池对象
var pool = mysql.createPool({
	//ip地址
	host: '127.0.0.1',
	//端口
	port: '3306',
	//数据库用户名
	user: 'root',
	//密码
	password: '',
	//连接的数据库名称
	database: 'xz',
	//设置连接池数量
	connectionLimit: 15
});

//导出连接池对象
module.exports = pool;