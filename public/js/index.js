var socket = io();
    socket.on("connect",function(){
      console.log("connected to server");

    //   socket.emit("createEmail",{
    //       "to":"vm@gmail.com",
    //       "text":"i found my angel"
    //   });

      socket.emit("createdMessage",{
          "from":"user1@gmail.com",
          "text":"user 1 is entered the room"

      })

    })

    socket.on("disconnect",function(){
      console.log("disconnected to server");
    })
    
    // socket.on("newEmail",function(data){
    //     console.log("new email ");
    //     console.log(data);
    // });
    
    socket.on("newMessage",function(data){
        console.log("new message");
        console.log(data);
    });


    