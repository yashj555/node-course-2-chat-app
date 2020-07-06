const path = require("path")
const express  = require("express");
const http = require("http");
const socketIO = require("socket.io");

var app = express();
var port = process.env.PORT || 3001;

const publicPath = path.join(__dirname,"../public");
app.use(express.static(publicPath));

var server =  http.createServer(app);
var io = socketIO(server);

io.on("connection",(socket)=>{
    console.log("new user connection is establish");
})

io.on("disconnect",(socket)=>{
    console.log("user is disconnected");
})


server.listen(port,()=>{
    console.log("server is up on port: "+port);
})









// console.log(publicPath);
// console.log(__dirname+"/../public");