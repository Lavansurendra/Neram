module.exports = {
	name: 'ping',
	description: 'Ping!',
	syntax: 'n.ping',
	execute: async function(message, args) {
		try{
			await message.channel.send('Pong.');
		}catch(e){
			console.log(e);
		}
	
	},
};