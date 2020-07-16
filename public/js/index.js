

var socket = io();
    socket.on("connect",function(){
      console.log("connected to server");

    //   socket.emit("createEmail",{
    //       "to":"vm@gmail.com",
    //       "text":"i found my angel"
    //   });'

      socket.emit("createdMessage",{
          "from":"user1@gmail.com",
          "text":"user 1 is entered the room"
      },function(data){
         console.log("Got it "+data);
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
        var li = jQuery("<li></li>");
        li.text(data.from+" :  "+data.text );
        var ol = jQuery("#messages");
        ol.append(li);
    });

    socket.on("newMessageLocation",function(message){
      var li = jQuery("<li></li>");
      var a = jQuery('<a target="_blank"> My current location </a>');
      li.text(message.from+" :");
      console.log(message.url);
      a.attr("href",message.url);
      li.append(a);
      jQuery("#messages").append(li);
    })

jQuery("#message-form").on("submit",function(e){
  e.preventDefault();
  socket.emit("createdMessage",{
   from:"User",
   text:jQuery('[name=message]').val()
  },function(){

  });
})

jQuery("#send-location").on("click",function(e){
  if(!navigator.geolocation) {
    return alert ('Geolocation is not supported by your browser');
  } 
    
  navigator.geolocation.getCurrentPosition(function(position){
        console.log(position);
        socket.emit("createLocationMessage",{
          "latitude":position.coords.latitude,
          "longitude":position.coords.longitude
        })
    }, function(e){
      alert("unable to fetch location");
    });
})
    