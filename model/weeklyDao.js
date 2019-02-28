var mysql = require('../mysql/mysql.js');
var randomID = require('../utils/randomid.js');

var weeklyDao = {
    /**
     * 获取周报列表
     * @param {*} req 
     * @param {*} res 
     */
    queryAllWeekly: function(req, res){
        var sql = 'select * from weekly';
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
    insertWeekly: function(req, res){
        
        console.log(req.body.weeklyName);
        var weeklyId = randomID();
        var weeklyName = decodeURIComponent(req.body.weeklyName);
        var workContent = decodeURIComponent(req.body.workContent);
        var solveProblems = decodeURIComponent(req.body.solveProblems);
        var summingUpExperience = decodeURIComponent(req.body.summingUpExperience);
        var remainingProblems = decodeURIComponent(req.body.remainingProblems);
        var nextWeekPlan = decodeURIComponent(req.body.nextWeekPlan);
        var userId = req.body.userId;
        var sql = 'insert into weekly values(?, ?, ?, ?, ?, ?, ?, ?)';
        mysql.excute(sql, [weeklyId, weeklyName, workContent, solveProblems, summingUpExperience, remainingProblems, nextWeekPlan, userId], function(error, result, fields){
            console.log(error, result);
            if (error) {
                var statusObj = {
                    "status": "500",
                    "message": "服务器错误"
                }
                res.json(statusObj);
            }else{
                var success = result.affectedRows === 1 ? true : false ;
                var statusObj = {
                    "status": "200",
                    "message": "success",
                    "success" : success
                }
                res.json(statusObj);
            }
        });
    },
    /**
     * 根据用户名获取该用户所有的周报
     * @param {*} req 
     * @param {*} res 
     */
    queryAllWeeklyByUserId: function(req, res){
        var userid = req.query.userId;
        console.log(userid);
        var sql = 'select weekly_id as weeklyId, weekly_name as weeklyName, work_content as workContent, solve_problems as solveProblems, summing_up_experience summingUpExperience, remaining_problems as remainingProblems, next_week_plan as nextWeekPlan, user_id as userId from weekly where user_id = ?';
        mysql.excute(sql, [userid], function(error, result, fields){
            console.log(error, result);
            if (error) {
                var statusObj = {
                    "status": "500",
                    "message": "服务器错误"
                }
                res.jsonp(statusObj);
            }else{
                var statusObj = {
                    "status": "200",
                    "message": "success",
                    "dataList" : result
                }
                res.jsonp(statusObj);
            }
        });
    }
};

module.exports = weeklyDao;