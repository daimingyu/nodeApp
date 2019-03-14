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
    /**
     * 创建新周报
     * @param {*} req 
     * @param {*} res 
     */
    insertWeekly: function(req, res){

        //允许跨域
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

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
    },
    /**
     * 根据id查询一个周报
     * @param {*} req 
     * @param {*} res 
     */
    queryOneWeekly: function(req, res){
        var weeklyid = req.query.weeklyId;
        console.log(weeklyid);
        var sql = 'select weekly_id as weeklyId, weekly_name as weeklyName, work_content as workContent, solve_problems as solveProblems, summing_up_experience summingUpExperience, remaining_problems as remainingProblems, next_week_plan as nextWeekPlan, user_id as userId from weekly where weekly_id = ?';
        mysql.excute(sql, [weeklyid], function(error, result, fields){
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
                    "weekly" : result[0]
                }
                res.jsonp(statusObj);
            }
        });
    },    
    /**
     * 根据id更新一个周报
     * @param {*} req 
     * @param {*} res 
     */
    updateOneWeekly(req, res){
        //允许跨域
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        var weeklyId = randomID();
        var weeklyName = decodeURIComponent(req.body.weeklyName);
        var workContent = decodeURIComponent(req.body.workContent);
        var solveProblems = decodeURIComponent(req.body.solveProblems);
        var summingUpExperience = decodeURIComponent(req.body.summingUpExperience);
        var remainingProblems = decodeURIComponent(req.body.remainingProblems);
        var nextWeekPlan = decodeURIComponent(req.body.nextWeekPlan);
        var userId = req.body.userId;
        var weeklyId = req.body.weeklyId;

        var sql = 'update weekly set weekly_name=?, work_content=?, solve_problems=?, summing_up_experience=?, remaining_problems=?, next_week_plan=? where weekly_id = ?';
        mysql.excute(sql, [weeklyName, workContent, solveProblems, summingUpExperience, remainingProblems, nextWeekPlan, weeklyId], function(error, result, fields){
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
     * 根据id删除一个周报
     * @param {*} req 
     * @param {*} res 
     */
    deleteWeekly: function(req, res){
        var weeklyid = req.query.weeklyId;
        console.log(weeklyid);
        var sql = 'delete from weekly where weekly_id = ?';
        mysql.excute(sql, [weeklyid], function(error, result, fields){
            console.log(error, result);
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
                    "success" : success
                }
                res.jsonp(statusObj);
            }
        });
    }
};

module.exports = weeklyDao;