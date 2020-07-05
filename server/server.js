const path = require("path")
const express  = require("express");

var app = express();
var port = process.env.PORT || 3001;

const publicPath = path.join(__dirname,"../public");
app.use(express.static(publicPath));



app.listen(port,()=>{
    console.log("server is up on port: 3001");
})









// console.log(publicPath);
// console.log(__dirname+"/../public");