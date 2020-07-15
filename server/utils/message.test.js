var expect = require('expect');
var {generateMessage} = require("./message");

describe('generateMessage',()=>{
    it('should generate correct message object',()=>{
        var from = "jen";   
        var text = "Some message";
        var message = generateMessage(from,text);
        
        expect(typeof message.createdAt).toBe("number");
        expect(message).toMatchObject({from,text});
       
        
    });
})