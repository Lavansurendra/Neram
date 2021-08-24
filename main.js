require('dotenv').config();
const Discord = require('discord.js'); // bringing in discord.js assets
const fs = require('fs');// Node's file system module (allows us to go through file names and find commands)
const client = new Discord.Client(); // instance of discord client (class, attribute of discord)
client.commands = new Discord.Collection();// makes maps more useful
const prefix = "n.";// starts with these for all commands
client.once('ready',() => {
    console.log("Neram is Alive")
});

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); // sorts all files in commands folder into an array 

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

client.on('message', message =>{
 
    if(message.author.bot ||message.guild ===null||!message.content.startsWith(prefix)) return;

    
    const args = message.content.slice(prefix.length).trim().split(/ +/)//splits regardless of number of spaces    
    const command = args.shift().toLowerCase(); 
   	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

//end of file 
client.login(process.env.token)