// require
var express = require("express");
var mongoose = require("mongoose");

// require User model
var User = require("./models/user");
console.log(User);

// connect to database 


mongoose.connect("mongodb://localhost:27017/mongoose_crud",{ useUnifiedTopology: true ,useNewUrlParser: true},(err)=>{
    console.log('database connected :', err ? err :true);
})



// express instantiate
var app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// routes
app.get('/users',(req,res)=>{
    User.find({},{name:1,age:1,email:1,_id:0},(err, listofUsers)=>{
        if(err) return next(err);
        res.json({users : listofUsers});
    })
});
app.get('/users/:email',(req,res,next)=>{
    var userEmail= req.params.email;
    User.findOne({email:userEmail},{name:1,age:1,email:1,_id:0},(err,singleUser)=>{
        if(err) return next(err);
        res.send(singleUser)
    })
});

app.post('/users',(req,res, next)=>{
    User.create(req.body,(err, createdUser)=>{
        if(err) return next(err);
        res.send(createdUser);
    })
});
app.put('/users/:email',(req,res,next)=>{
    var userEmail= req.params.email;
    User.findOneAndUpdate({email:userEmail}, req.body ,{new:true} ,(err,updatedUserData)=>{
        if(err) return next(err);
        res.send(updatedUserData);
    })
});
app.delete('/users/:email',(req,res,next)=>{
    var userEmail= req.params.email;
    User.findOneAndDelete({email:userEmail}, (err, deleteUser)=>{
        if(err) return next(err);
        res.send(deleteUser.name + ' data deleted');
    })

    
});

// error handler middleware

// 404 error handler
app.use((req, res, next)=>{
    res.status(404).send("Page not found");
});
// custom error either by client or by server
app.use((err, req, res, next) => {
    res.status(400).send(err);
  });

// app listen

app.listen(3000, ()=>{
    console.log("local server 3000")
})



