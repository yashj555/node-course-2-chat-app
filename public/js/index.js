

var socket = io();
    socket.on("connect",function(){
      console.log("connected to server");

 
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
  var messagetext = jQuery('[name=message]');
  socket.emit("createdMessage",{
   from:"User",
   text:messagetext.val()
  },function(){
    messagetext.val('');
  });
})

jQuery("#send-location").on("click",function(e){
  if(!navigator.geolocation) {
    return alert ('Geolocation is not supported by your browser');
  } 

  var locationbutton = jQuery("#send-location"); 
  locationbutton.attr("disabled","disabled").text("Sending..");  


  navigator.geolocation.getCurrentPosition(function(position){
        console.log(position);
        locationbutton.removeAttr("disabled").text("Send Location");
        socket.emit("createLocationMessage",{
          "latitude":position.coords.latitude,
          "longitude":position.coords.longitude
        })
    }, function(e){
      locationbutton.removeAttr("disabled").text("Send Location");
      alert("unable to fetch location");
    });

})
    