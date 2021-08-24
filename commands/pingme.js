const ms = require('ms');
const { description, execute } = require('./ping');
module.exports = {
    name: "pingme",
    description: "Pings after a specified time",
    syntax: "n.pingme [time]",
    execute: function(message,args){
        setTimeout(async function (){
            try{ 
                await  message.reply('Your timer has completed');
            }catch(e){
                console.log("timer failed")
            }
           
        },ms(args[0]))
    }
    
}