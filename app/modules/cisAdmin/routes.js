var express = require('express');
var router = express.Router();
var db = require('../../lib/database')();
var authMiddleware = require('../auth/middlewares/auth');
var counter = require('../auth/middlewares/SC');


router.get(`/`,(req,res)=>{
    res.render(`cisAdmin/views/dashboard`);
});

//Departments

router.get(`/maintenance/Departments`,(req,res)=>{
    db.query(`select * from tbldepartment where boolDeleted = 0`,(err,results,fields)=>{
        if(err) throw err;
        console.log(err);
        return res.render(`cisAdmin/views/Maintenance/pages/Departments/Department`,{departments: results});
    });
});

router.get('/maintenance/Departments/new',(req,res)=>{
    db.query(`select max(intDepartmentID) as intDepartmentID from tbldepartment`,(err,results,field)=>{
        res.locals.ID = results[0].intDepartmentID;
        return res.render('cisAdmin/views/maintenance/pages/Departments/DepartmentForm');
    }); 
});
router.post('/maintenance/Departments/new',(req,res)=>{
    var zero = 0;
    var nID = counter.smart(req.body.count);
    db.query(`insert into tbldepartment (intDepartmentID, strDepartmentName, boolDeleted) VALUES ("${nID}","${req.body.dname}","${zero}");`,(err,results,field)=>{
        if(err) throw err;
        console.log(err);
        return res.redirect('/admin/maintenance/Departments');
    }); 
});
router.get('/maintenance/Departments/:intDepartmentID',authMiddleware.hasAuth,(req,res)=>{
    db.query(`SELECT * FROM tbldepartment where intDepartmentID = "${req.params.intDepartmentID}"`,(err,results,field)=>{
        if(err) throw err;
        console.log(err);
        if(results[0]==null) res.redirect('/admin/maintenance/Department');
        res.render('cisAdmin/views/maintenance/pages/Departments/DepartmentForm',{form : results[0]});
    })
});

router.put('/maintenance/Departments/:intDepartmentID',(req,res)=>{
    db.query(`update tbldepartment set
    strDepartmentName = "${req.body.dname}"
    where intDepartmentID = ${req.params.intDepartmentID}`,(err,results,field)=>{
        if(err) throw err;
        res.redirect('/admin/maintenance/Departments');
    })
});

router.get('/maintenance/Departments/:intDepartmentID/delete',(req,res)=>{
    var del = 1;
    db.query(`update tbldepartment 
    set boolDeleted = ${del}
    where intDepartmentID = ${req.params.intDepartmentID}`,(err,results,field)=>{
        if(err) throw err;
        console.log(err);
        return res.redirect('/admin/maintenance/Departments');
    });
});
    
//Madugo Tong Part Na To Promise

//Sections 4 parts 
router.get(`/maintenance/Sections`,(req,res)=>{
    res.render(`cisAdmin/views/Maintenance/pages/Sections/Section`);
});

//Sections Grade 7 Part 1
router.get(`/maintenance/Sections/Grade7`,(req,res)=>{
    db.query(`select * from tblsection where intSYearLevelID = 1 AND boolDeleted = 0 ORDER BY strSectionDesc`,(err,results,fields)=>{
        if(err) throw err;
        console.log(err);
        return res.render(`cisAdmin/views/maintenance/pages/Sections/Pages/Grade7`,{sections: results});
    });    
});

router.get('/maintenance/Sections/Grade7/new',(req,res)=>{
    db.query(`select max(intDepartmentID) as intDepartmentID from tbldepartment`,(err,results,field)=>{
        res.locals.ID = results[0].intDepartmentID;
        return res.render('cisAdmin/views/maintenance/pages/Departments/DepartmentForm');
    }); 
});
router.post('/maintenance/Sections/Grade7/new',(req,res)=>{
    var zero = 0;
    var nID = counter.smart(req.body.count);
    db.query(`insert into tbldepartment (intDepartmentID, strDepartmentName, boolDeleted) VALUES ("${nID}","${req.body.dname}","${zero}");`,(err,results,field)=>{
        if(err) throw err;
        console.log(err);
        return res.redirect('/admin/maintenance/Departments');
    }); 
});
router.get('/maintenance/Departments/:intDepartmentID',authMiddleware.hasAuth,(req,res)=>{
    db.query(`SELECT * FROM tbldepartment where intDepartmentID = "${req.params.intDepartmentID}"`,(err,results,field)=>{
        if(err) throw err;
        console.log(err);
        if(results[0]==null) res.redirect('/admin/maintenance/Department');
        res.render('cisAdmin/views/maintenance/pages/Departments/DepartmentForm',{form : results[0]});
    })
});

router.put('/maintenance/Departments/:intDepartmentID',(req,res)=>{
    db.query(`update tbldepartment set
    strDepartmentName = "${req.body.dname}"
    where intDepartmentID = ${req.params.intDepartmentID}`,(err,results,field)=>{
        if(err) throw err;
        res.redirect('/admin/maintenance/Departments');
    })
});

router.get('/maintenance/Departments/:intDepartmentID/delete',(req,res)=>{
    var del = 1;
    db.query(`update tbldepartment 
    set boolDeleted = ${del}
    where intDepartmentID = ${req.params.intDepartmentID}`,(err,results,field)=>{
        if(err) throw err;
        console.log(err);
        return res.redirect('/admin/maintenance/Departments');
    });
});

//Sections Grade 8 Part 2


router.get(`/maintenance/Sections/Grade8`,(req,res)=>{
    db.query(`select * from tblsection where intSYearLevelID = 2 ORDER BY strSectionDesc`,(err,results,fields)=>{
        if(err) throw err;
        console.log(err);
        return res.render(`cisAdmin/views/maintenance/pages/Sections/Pages/Grade8`,{sections: results});
    });    
});

//Sections Grade 9 Part 3
router.get(`/maintenance/Sections/Grade9`,(req,res)=>{
    db.query(`select * from tblsection where intSYearLevelID = 3 ORDER BY strSectionDesc`,(err,results,fields)=>{
        if(err) throw err;
        console.log(err);
        return res.render(`cisAdmin/views/maintenance/pages/Sections/Pages/Grade9`,{sections: results});
    });    
});

//Sections Grade 10 Part 4
router.get(`/maintenance/Sections/Grade10`,(req,res)=>{
    db.query(`select * from tblsection where intSYearLevelID = 4 ORDER BY strSectionDesc`,(err,results,fields)=>{
        if(err) throw err;
        console.log(err);
        return res.render(`cisAdmin/views/maintenance/pages/Sections/Pages/Grade10`,{sections: results});
    });    
});


//Subjects 
router.get(`/maintenance/Subjects`,(req,res)=>{
    db.query(`select * from tblsubject`,(err,results,fields)=>{
        if(err) throw err;
        console.log(err);
        return res.render(`cisAdmin/views/Maintenance/pages/Subject`,{subjects: results});
    });
});


//Section Criteria
router.get(`/maintenance/SectionCriteria`,(req,res)=>{
    
});

//Teachers 8 parts

router.get(`/maintenance/Teachers`,(req,res)=>{
    db.query(`select * from tbldepartment`,(err,results,fields)=>{
        if(err) throw err;
        console.log(err);
        res.render(`cisAdmin/views/Maintenance/pages/Teachers`,{departments: results});
    });
});


//User Type
router.get(`/maintenance/UserType`,(req,res)=>{
    db.query(`select * from tblusertype`,(err,results,fields)=>{
        if(err) throw err;
        console.log(err);
        return res.render(`cisAdmin/views/Maintenance/pages/UserType`,{users: results});
    });
});


//Year Level

router.get(`/maintenance/YearLevel`,(req,res)=>{
    db.query(`select * from tblyearlevel`,(err,results,fields)=>{
        if(err) throw err;
        console.log(err);
        return res.render(`cisAdmin/views/Maintenance/pages/YearLevel`,{yearlevels: results});
    });
});


exports.admin = router;