var mysql = require('mysql');

//mysql数据库参数
var params = {
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'weekly'
}

// 创建 mysql 连接池资源
var pool = mysql.createPool(params);

/**
 * @params sql [查询语句]
 * @params arr [查询参数数组]
 * @params callback [回调函数]
 */
exports.excute = function(sql, arr, callback){
    //建立链接
    pool.getConnection(function(err, connection){
        if(err){throw err;return;}
        connection.query(sql, arr, function(error, results, fields){
            //将链接返回到连接池中，准备由其他人重复使用
            connection.release();
            //执行回调函数，将数据返回
            //Results代表是查询的结果，如果是插入修改等操作，则返回影响数据库信息的对象
            //fields代表查询的字段信息
            callback && callback(error, results, fields);
        });
    });
};