var express = require('express');
var router = express.Router();
var db = require('../../lib/database')();
var authMiddleware = require('../auth/middlewares/auth');
var counter = require('../auth/middlewares/SC');


router.get(`/`,(req,res)=>{
    res.render(`cisStudents/views/dashboard`);
});
exports.students = router;