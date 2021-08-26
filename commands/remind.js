const { Role } = require('discord.js');
const ms = require('ms');
const ping = require('./ping');
const { description, execute } = require('./ping');
module.exports = {
    name: "remind",
    description: "Reminds pinged user to do something after a certain time",
    syntax: "n.remind [@user] [time to remind after] [reminder message]",
    execute: function(message,args){
        var timer = getRealTime();
        function getRealTime(){
            if(args[1].slice(-2) === "pm" || args[1].slice(-2) === "am"){
                let mornaft;
                let time;
                let hours;
                let timer = 0;
                let minutes;
                let date = new Date();
                let currentHours = date.getHours();
                let currentMinutes = date.getMinutes();
                let currentSeconds = date.getSeconds();
                if(args[1].slice(-2) === "pm"){
                    mornaft = args[1].slice(-2);
                    time = args[1].slice(0,-2);
                    time = time.split(":");
                    hours = parseInt(time[0])
                    if(hours != 12){
                        hours+=12
                    }
                    minutes =parseInt (time[1])
                    if(hours>currentHours){
                        timer =ms(String(hours-currentHours) +"h") + ms(String(minutes-currentMinutes) +"m") - ms(String(currentSeconds)+"s")
                        return timer;
                    }else if(hours == currentHours){
                        if(minutes>currentMinutes){
                            timer = ms(String(minutes-currentMinutes) +"m")- ms(String(currentSeconds)+"s");
                            return timer;
                        }
                        else{
                            message.channel.send("Invalid!");
                            timer = 0;
                            return timer;
                        }
                    }else{
                        message.channel.send("Invalid!");
                        timer =0;
                        return timer;
                    }

                }else if(args[1].slice(-2) === "am"){
                    mornaft = args[1].slice(-2);
                    time = args[1].slice(0,-2);
                    time = time.split(":");
                    hours = parseInt(time[0])
                    minutes =parseInt (time[1])
                    if(hours>currentHours){
                        timer =ms(String(hours-currentHours) +"h") + ms(String(minutes-currentMinutes) +"m") - ms(String(currentSeconds)+"s")
                        return timer;
                    }else if(hours == currentHours){
                        if(minutes>currentMinutes){
                            timer = ms(String(minutes-currentMinutes) +"m")- ms(String(currentSeconds)+"s");
                            return timer;
                        }
                        else{
                            message.channel.send("Invalid!");
                            timer = 0;
                            return timer;
                        }
                    }else{
                        message.channel.send("Invalid!");
                        timer = 0;
                        return timer;
                    }

                }
            } else{
                timer = ms(args[1])
                return timer;
            }
           
        }
        console.log(timer)
        if(timer !=0){
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
        },timer)
        }
    }
    
}