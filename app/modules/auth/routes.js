var express = require('express');
var loginRouter = express.Router();
var logoutRouter = express.Router();

var authMiddleware = require('./middlewares/auth');

loginRouter.route('/')
    .get(authMiddleware.noAuthed, (req, res) => {
        res.render('auth/views/login', req.query);
    })
    .post((req, res) => {
        var db = require('../../lib/database')();

        db.query(`SELECT * FROM tblaccount WHERE strUserName = "${req.body.username}"`,(err, results, fields)=>{
            if(err) throw err;
            console.log(err);

            if (results.length === 0) 
            {
                return res.redirect('/login?e=1');
            }

            var user = results[0];

            if (user.strPassword !== req.body.password) 
                {
                    return res.redirect('/login?passwordincorrect');
                }
                
                
                delete user.strPassword;
                
                req.session.user = user;
                if(req.session.user.intUserTypeID===1)
                {
                    console.log(user.strAccountPassword);
                    return res.redirect(`/admin`);
                }
                else if(req.session.user.intUserTypeID===2)
                {
                    return res.redirect(`/teachers`);
                }
                else
                {
                    return res.redirect(`/students`);
                }
        });
    });

logoutRouter.get('/', (req, res) => {
    req.session.destroy(err => {
        if (err) throw err;
        res.redirect('/login');
    });
});

exports.login = loginRouter;
exports.logout = logoutRouter;