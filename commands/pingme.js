const ms = require('ms');
const { description, execute } = require('./ping');
module.exports = {
    name: "pingme",
    description: "Pings after a specified time",
    syntax: "n.pingme [time]",
    execute: function(message,args){
        var timer = getRealTime();
        function getRealTime(){
            if(args[0].slice(-2) === "pm" || args[0].slice(-2) === "am"){
                let mornaft;
                let time;
                let hours;
                let timer = 0;
                let minutes;
                let date = new Date();
                let currentHours = date.getHours();
                let currentMinutes = date.getMinutes();
                let currentSeconds = date.getSeconds();
                if(args[0].slice(-2) === "pm"){
                    mornaft = args[0].slice(-2);
                    time = args[0].slice(0,-2);
                    time = time.split(":");
                    hours = parseInt(time[0])
                    if(hours != 12){
                        hours+=12
                    }
                    minutes =parseInt (time[1])
                    if(hours>currentHours){
                        timer =ms(String(hours-currentHours) +"h") + ms(String(minutes-currentMinutes) +"m") - ms(String(currentSeconds)+"s")
                        console.log(timer)
                        return timer;
                    }else if(hours == currentHours){
                        if(minutes>currentMinutes){
                            timer = ms(String(minutes-currentMinutes) +"m")- ms(String(currentSeconds)+"s");
                            console.log(timer)
                            return timer;
                        }
                        else{
                            message.channel.send("Invalid!");
                            timer = 0;
                            console.log(timer)
                            return timer;
                        }
                    }else{
                        message.channel.send("Invalid!");
                        timer =0;
                        console.log(timer)
                        return timer;
                    }

                }else if(args[0].slice(-2) === "am"){
                    mornaft = args[0].slice(-2);
                    time = args[0].slice(0,-2);
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
                timer = ms(args[0])
                return timer;
            }
           
        }
        console.log(timer)
        if(timer!=0){
        setTimeout(async function (){
            try{ 
                await  message.reply('Your timer has completed');
            }catch(e){
                console.log("timer failed")
            }
           
        },timer)
        }
    }
    
}