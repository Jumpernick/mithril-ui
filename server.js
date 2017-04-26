var express = require("express");
var app = express();
var cors = require("cors")

app.use(cors());

app.get("/api/test", function(req, res){
  setTimeout(function(){
    //res.status(500).send({error: "error"});
    res.send("hello")
  }, 100)
})

app.listen(3002, function(){
  console.log("listening...")
})