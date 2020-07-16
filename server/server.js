const path = require("path")
const express  = require("express");
const http = require("http");
const socketIO = require("socket.io");
const { Socket } = require("dgram");
const {generateMessage,generateMessageLocation}  = require("./utils/message");

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

    socket.emit("newMessage",generateMessage("Admin","Welcome to the chat room"));
    socket.broadcast.emit("newMessage",generateMessage("Admin","New user has joined in the chat room"));
       

    // socket.on("createEmail",(data)=>{
    //      console.log("create Email");
    //      console.log(data);
    // })

    socket.on("createdMessage",(data,callback)=>{
        console.log("create message");  
        console.log(data);
        io.emit("newMessage",generateMessage(data.from,data.text)); 
        callback("This is from the server");
    })
    socket.on("createLocationMessage",(cords)=>{
        io.emit('newMessageLocation',generateMessageLocation("Admin",cords.latitude,cords.longitude));
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