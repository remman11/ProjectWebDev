var express = require('express');
var mvRouter = express.Router();
var homeRouter = express.Router();
var calendarRouter = express.Router();
var contactRouter = express.Router();
var rulesRouter = express.Router();
var newsRouter = express.Router();
var db = require('../../lib/database')();
var authMiddleware = require('../auth/middlewares/auth');
var counter = require('../auth/middlewares/SC');

mvRouter.get(`/`,(req,res)=>{
    res.render(`cisHome/views/missionandvision`);
})
calendarRouter.get(`/`,(req,res)=>{
    res.render(`cisHome/views/calendar`);
});

rulesRouter.get(`/`,(req,res)=>{
    res.render(`cisHome/views/rules`)
});
newsRouter.get(`/`,(req,res)=>{
    res.render(`cisHome/views/news`);
});
contactRouter.get(`/`,(req,res)=>{
    res.render(`cisHome/views/contact`);
});

exports.home = homeRouter;
exports.missionandvision = mvRouter;
exports.rules = rulesRouter;

exports.news = newsRouter;
exports.calendar = calendarRouter;
exports.contact = contactRouter;