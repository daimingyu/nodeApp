var express = require('express');
var weeklyDao = require('../model/weeklyDao.js');
var router = express.Router();


/**
 * 获取所有周报列表数据
 */
router.get('/', function(req, res, next) {
	weeklyDao.queryAllWeekly(req, res);
});

/**
 * 新建周报
 */
router.post('/InsertWeekly', function(req, res, next) {
    console.log('1');
	weeklyDao.insertWeekly(req, res);
});

/**
 * 根据用户id获取周报
 */
router.get('/QueryAllWeeklyByUserId', function(req, res, next) {
	weeklyDao.queryAllWeeklyByUserId(req, res);
});

module.exports = router;
