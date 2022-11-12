// ./help
// ./admin
// ./error

const express = require("express")
const router = express.Router()

//error route
router.get('/somethingiswrong', (req,res)=>{
    console.log("caught error")
    res.render("error")
})

module.exports = router