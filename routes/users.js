var express = require('express');
var userDao = require('../model/userDao.js');
var router = express.Router();


/**
 * 获取用户列表数据
 */
router.get('/', function(req, res, next) {
	userDao.queryAllUser(req, res);
});

/**
 * 根据id检查用户名是否存在
 */
router.get('/CheckHasUser', function(req, res, next) {
	userDao.checkHasUser(req, res);
});

/**
 * 检查用户登陆是否有效
 */
router.get('/CheckUserLogin', function(req, res, next) {
	userDao.checkUserLogin(req, res);
});

/**
 * 检查用户登陆是否有效
 */
router.get('/InsertUser', function(req, res, next) {
	userDao.insertUser(req, res);
});

module.exports = router;
