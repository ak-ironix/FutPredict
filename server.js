const express = require('express')
const app = express()

app.set('view engine','ejs')//tell app to use ejs view engine

app.use(express.static("public"))//access static files
app.use(express.urlencoded({ extended : true}))//allows to access form variables

//routers
const startRouter = require("./routes/startup")
app.use("/",startRouter)
const pageRouter = require("./routes/pages")
app.use("/",pageRouter)
const otherRouter = require("./routes/other")
app.use("/",otherRouter)

app.listen(3000)