// importing dependencies
var express = require('express');


var toDoController=require('./controllers/todoController');

var app=express();

//set up template engine
app.set("view engine",'ejs');

//static files
// public is the root file for static files
app.use('/assets',express.static('./public'))
// app.use(function(req,res,next){
//     console.log(req.url)
//     next()
// })//express.static('./public'));

//fire controllers
toDoController.control(app)

//listen 
app.listen(3000);
console.log("App is listining on 3000")
