var socket=require('socket.io');
var bodyParser=require('body-parser');
var mongoose=require('mongoose');

// creating body parser object
var urlencodedParser = bodyParser.urlencoded({ extended: false});

var control=function(app){
    // connect to database
    mongoose.connect('mongodb+srv://naveen:test@temperture-gqjtc.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser: true })
    // create schema to store data in database
    var dataSchema=new mongoose.Schema({
        id : String,
        level: Number,
        gas: Boolean,
        time: Number
    });

    // create data base module
    var Data=mongoose.model('Data',dataSchema);

    // route '/todo' path in my app
    app.get('/home',function(req,res){
        res.render('home')
    });
    
    app.get('/results',function(req,res){
        data=Data.find({},function(err,data){
            if (err) throw err;
            data=data[data.length-1]
            res.render('results',{data:data});

        })
        
    })
    
    // Arduino posting data to a server in a json format
    // using to read json data
    app.use(bodyParser.json())
    app.post('/home',urlencodedParser,function(req,res){
        var data=Data(req.body).save(function(err,data){
            if (err) throw err;
            res.json(data)
        })

    })
    
}

module.exports={
    req_control:control
};