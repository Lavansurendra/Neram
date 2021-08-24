const { Role } = require('discord.js');
const ms = require('ms');
const ping = require('./ping');
const { description, execute } = require('./ping');
module.exports = {
    name: "remind",
    description: "Reminds pinged user to do something after a certain time",
    syntax: "n.remind [@user] [time to remind after] [reminder message]",
    execute: function(message,args){
        console.log(args)
        setTimeout(async function (){
            const target = message.mentions.users.first()
            if (target){
                let member= message.guild.members.cache.get(target.id)
                let response = args[2]
                response = response.replace(/_/g, " ")// all occurences replaced
                try{
                   await message.channel.send(`<@${member.user.id}>` + " " +response);
                }catch(e){
                    console.log(e)
                }
               
            }else{
                try{
                    await message.channel.send("User not found")
                }catch(e){
                    console.log(e)
                }
              
            } 
        },ms(args[1]))
    }
    
}