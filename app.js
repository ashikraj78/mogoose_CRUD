// require
var express = require("express");
var mongoose = require("mongoose");
var path = require("path");
var PORT = process.env.PORT || 5000;


// require User model
var usersRouter = require("./router/user");
var indexRouter = require("./router/index")


// connect to database 
mongoose.connect("mongodb://localhost:27017/mongoose_crud",{ useUnifiedTopology: true ,useNewUrlParser: true},(err)=>{
    console.log('database connected :', err ? err :true);
})

// express instantiate
var app = express();


// middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.set("views", path.join(__dirname, "views")) 
app.set("view engine", "ejs");


// routing middleware
app.use("/", indexRouter);
app.use('/users', usersRouter);


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

app.listen(PORT, ()=>{
    console.log("local server ", PORT)
})



