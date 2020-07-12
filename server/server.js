const path = require("path")
const express  = require("express");
const http = require("http");
const socketIO = require("socket.io");
const { Socket } = require("dgram");

var app = express();
var port = process.env.PORT || 3001;

const publicPath = path.join(__dirname,"../public");
app.use(express.static(publicPath));

var server =  http.createServer(app);
var io = socketIO(server);

io.on("connection",(socket)=>{
    console.log("new user connection is establish");

    // socket.emit("newEmail",{
    //     "from":"yashjaiswal1405@gmail.com",
    //     "text":"Hi ,i am looking for a job",
    //     "createdAt":"123"
    // });

    // socket.emit("newMessage",{
    //     "from":"user1@gmail.com",
    //     "text":"user1 entered to this room",
    //     "createdAt":"253"
    // });

    // socket.on("createEmail",(data)=>{
    //      console.log("create Email");
    //      console.log(data);
    // })

    socket.on("createdMessage",(data)=>{
        console.log("create message");  
        console.log(data);
        io.emit("newMessage",{
         "from":data.from,
         "text":data.text,
         "createdAt": new Date().getTime()
        })
    })



    socket.on("disconnect",()=>{
        
        console.log("user is disconnected");
    })
})




server.listen(port,()=>{
    console.log("server is up on port: "+port);
})









// console.log(publicPath);
// console.log(__dirname+"/../public");