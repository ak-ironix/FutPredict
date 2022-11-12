// ./dashboard
// ./make-prediction
// ./fixtures-results
// ./leaderboard

const express = require("express")
const router = express.Router()
const db=require('/Jaymin/prediction/project_ver1/db-connection');//call file that connects to db

//dashboard routes
router.get('/dashboard', (req,res)=>{
    console.log("GET request to /dashboard")


    res.render("dashboard")
})

//make-prediction routes
router.get('/make-prediction', (req,res)=>{
    console.log("GET request to /make-prediction")


    res.render("make-prediction")
})

//fixtures-results routes
router.get('/fixtures-results', (req,res)=>{
    console.log("GET request to /fixtures-results")

    //select match_id as id, home_team, away_team, IF(result IS NULL,'TBD', IF(STRCMP(result,'d') = 0, 'DRAW', IF(STRCMP(result,'h')=0 , home_team, away_team)))AS result, home_goals, away_goals from matches;

    res.render("fixtures-results")
})

//leaderboard routes
router.get('/leaderboard', getLeaderboard, (req,res)=>{
    console.log("GET request to /leaderboard")

    if(req.leaderboard==undefined){
        res.render("error", {error:"unable to get leaderboard"})//-------redirect to dashboard after >>>error message<<<< -------//
    } else{
        res.render("leaderboard", {page:"leaderboard", action:"display", data:req.leaderboard})
    }    
})


////////// functions ///////////
function getLeaderboard(req, res, next){
    var sql = `SELECT row_number() over() as position, name, username, tokens FROM users ORDER BY tokens DESC`
    db.query(sql, function(err,userdata){
        if (err) {
            console.log(err);
            next()
            return
        }
        else {
            req.leaderboard = userdata
            next()
            return
        }
    })
}

function getSelfUserPos(req, res, next){
    var sql = `SELECT * FROM (SELECT row_number() over() as position, name, username, tokens FROM users ORDER BY tokens DESC) AS leaderboard where username="${req.userself}";`
    db.query(sql, function(err,userdata){
        if (err) {
            console.log(err);
            next()
            return
        }
        else {
            req.userSelf = userdata
            next()
            return
        }
    })
}

function getSearchUserPos(req, res, next){
    var sql = `SELECT * FROM (SELECT row_number() over() as position, name, username, tokens FROM users ORDER BY tokens DESC) AS leaderboard where username="${req.usersearch}";`
    db.query(sql, function(err,userdata){
        if (err) {
            console.log(err);
            next()
            return
        }
        else {
            req.userSearch = userdata
            next()
            return
        }
    })
}

module.exports = router