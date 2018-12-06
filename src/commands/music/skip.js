const { RichEmbed } = require('discord.js');

async function skip (client, msg, args){
	try{
		const queue = client.queue.get(msg.guild.id);
		if(!queue) return msg.channel.send('Tidak ada antrian untuk dilewati');
		if(!msg.member.voiceChannel) return msg.channel.send('Kamu harus berada di voice channel');
		queue.connection.dispatcher.end();
		return msg.channel.send('⏩ Skipping current songs');
	} catch (err) {
		return msg.channel.send(err.stack, { code: 'ini' });
	}
}

this.conf = {
	aliases: [],
	cooldown: "3"
}

this.help = {
	name: 'skip',
	description: 'skip antrian lagu',
	usage: 'skip'
}

this.run = skip;
