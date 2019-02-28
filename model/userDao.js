var mysql = require('../mysql/mysql.js');
var randomID = require('../utils/randomid.js');

var userDao = {
    /**
     * 获取用户列表
     * @param {*} req 
     * @param {*} res 
     */
    queryAllUser: function(req, res){
        var sql = 'select * from users';
        mysql.excute(sql, [], function(error, result, fields){
            console.log(error, result);
            if (error) {
                var statusObj = {
                    "status": "500",
                    "message": "服务器错误"
                }
                res.json(statusObj);
            }else{
                var statusObj = {
                    "status": "200",
                    "message": "success",
                    "result" : result
                }
                res.json(statusObj);
            }
        });
    },
    /**
     * 检查用户是否存在
     * @param {*} req 
     * @param {*} res 
     */
    checkHasUser: function(req, res){
        var username = decodeURIComponent(req.query.username);
        var sql = 'select * from users where user_name = ?';
        mysql.excute(sql, [username], function(error, result, fields){
            console.log(error, result, fields);
            if (error) {
                var statusObj = {
                    "status": "500",
                    "message": "服务器错误"
                }
                res.jsonp(statusObj);
            }else{
                var hasUser = result.length === 0 ? false : true ;
                var statusObj = {
                    "status": "200",
                    "message": "success",
                    "hasUser" : hasUser
                }
                res.jsonp(statusObj);
            }
        });
    },
    /**
     * 校验用户登陆
     * @param {*} req 
     * @param {*} res 
     */
    checkUserLogin: function(req, res){
        var username = decodeURIComponent(req.query.username);
        var password = req.query.password;
        var sql = 'select * from users where user_name = ?';
        mysql.excute(sql, [username], function(error, result, fields){
            console.log(error, result, fields);
            if (error) {
                var statusObj = {
                    "status": "500",
                    "message": "服务器错误"
                }
                res.jsonp(statusObj);
            }else{
                var loginFlag = result[0].password === password ? true : false ;
                var data = {
                    userName: result[0].user_name,
                    userId: result[0].user_id,
                    password: result[0].password,
                }
                var statusObj = {
                    "status": "200",
                    "message": "success",
                    "loginFlag" : loginFlag,
                    "data": data
                }
                res.jsonp(statusObj);
            }
        });
    },
    insertUser: function(req, res){
        var userid = randomID();
        var username = decodeURIComponent(req.query.username);
        var password = req.query.password;
        var sql = 'insert into users values(?, ?, ?)';
        mysql.excute(sql, [userid, username, password], function(error, result, fields){
            console.log(error, result, fields);
            if (error) {
                var statusObj = {
                    "status": "500",
                    "message": "服务器错误"
                }
                res.jsonp(statusObj);
            }else{
                var success = result.affectedRows === 1 ? true : false ;
                var statusObj = {
                    "status": "200",
                    "message": "success",
                    "success": success
                }
                res.jsonp(statusObj);
            }
        });
    }
};

module.exports = userDao;