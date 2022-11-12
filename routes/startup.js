// ./
// login/signup page
// ./account-created

const express = require("express")
const router = express.Router()

const db=require('/Jaymin/prediction/project_ver1/db-connection');//call file that connects to db

//mainpage get route
router.get('/',(req,res) =>{
    console.log("GET request to /")
    res.render("startup")
})

router.post('/',(req,res) =>{
    console.log("POST request to /")
    var username = req.body.loginuser
    if(username==undefined){
        username = req.body.signupuser
        var name = req.body.signupname
        var pass = req.body.signuppwd
        //INSERT INTO users VALUES (1,"name","username","password");
        var sql = `INSERT INTO users (name, username, password)VALUES ("${name}", "${username}", "${pass}")`;
        db.query(sql, function(err, result) {
            if (err) {
                console.log(err);
                res.redirect("/")//-------redirect to home after >>>error message<<<< -------//
            }
            console.log('record inserted');
            res.redirect("/")//-------redirect to home after >>>success message<<<< -------//
        });
    }
    else {
        //-------validation and code to be added-------//
        res.render("dashboard")
    }
})

//account-created route
// router.get('/account-created',(req,res) =>{
//     console.log("GET request to /account-created")
//     res.render("???")
// })

module.exports = router