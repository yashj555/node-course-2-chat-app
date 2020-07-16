var expect = require('expect');
var {generateMessage,generateMessageLocation} = require("./message");

describe('generateMessage',()=>{
    it('should generate correct message object',()=>{
        var from = "jen";   
        var text = "Some message";
        var message = generateMessage(from,text);
        
        expect(typeof message.createdAt).toBe("number");
        expect(message).toMatchObject({from,text});
       
        
    });
})

describe('generateMesaageLocation',()=>{
    it("shou;ld generate correct message location",()=>{
        var from = "yash"
        var latitude = 25;
        var longitude = 18;
        var url = "https://www.google.com/maps?="+latitude+","+longitude;
        var message = generateMessageLocation(from,latitude,longitude);
        expect(typeof message.createdAt).toBe("number");
        expect(message).toMatchObject({from,url});
    })
})



