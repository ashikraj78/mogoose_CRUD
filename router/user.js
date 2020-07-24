var express = require('express');
var router = express.Router();

var User = require("../models/user");



// routes

router.get('/', (req,res)=>{
    User.find({},{name:1,age:1,email:1,_id:0},(err, users)=>{   
        if(err) return next(err);
        res.render("listofUsers", { users });
    })
});

router.get('/new', (req,res)=>{
    res.render("userForm")
})

router.get('/:email',(req,res,next)=>{
    var userEmail= req.params.email;
    User.findOne({email:userEmail},{name:1,age:1,email:1,_id:0},(err,singleUser)=>{
        if(err) return next(err);
        res.render("singleUser", {user: singleUser})
    })
});

router.post('/',(req,res, next)=>{
    User.create(req.body,(err, createdUser)=>{
        if(err) return next(err);
        res.redirect("/users");
    })
});

router.get('/:email/edit',(req,res,next)=>{
    var userEmail= req.params.email;
    User.findOne({email:userEmail},{name:1,age:1,email:1,_id:0},(err,updateUser)=>{
        if(err) return next(err);
        res.render("updateUser", {user: updateUser})
    })
})


router.post('/:email',(req,res,next)=>{
    var userEmail= req.params.email;
    User.findOneAndUpdate({email:userEmail}, req.body ,{new:true} ,(err,updatedUser)=>{
        if(err) return next(err);
        res.redirect(`/users/ ${updatedUser.email}`);
    })
});

router.get('/:email/delete',(req,res,next)=>{
    var userEmail= req.params.email;
    User.findOneAndDelete({email:userEmail}, (err, deleteUser)=>{
        if(err) return next(err);
        res.redirect("/users");
    })
});

module.exports = router;