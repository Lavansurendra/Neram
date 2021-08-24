const ms = require('ms');
const { description, execute } = require('./ping');
module.exports = {
    name: "remindme",
    description: "Reminds user to do something after a certain time",
    syntax: "n.remindme [time] [reminder message]",
    execute: function(message,args){ 
        setTimeout(async function (){
            console.log(args[1])
            let response = args[1]
            response = response.replace(/_/g, " ")
            console.log(response)
            try{
                await message.reply(response);
            }catch(e){
                console.log("mission failed")
            }
            
        },ms(args[0]))
    }
    
}