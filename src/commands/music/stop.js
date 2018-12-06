const { RichEmbed } = require('discord.js');

async function stop (client, msg, args){
	try{
		const queue = client.queue.get(msg.guild.id);
		if(!queue) return msg.channel.send('Tidak dapat berhenti karena antrian kosong');
		if(!msg.member.voiceChannel) return msg.channel.send('Kamu harus masuk voice channel untuk menghentikan antrian');
		queue.songs = [];
		queue.connection.dispatcher.end();
		return msg.channel.send('🛑 Menghentikan antrean saat ini');
	} catch (err) {
		return msg.channel.send(err.stack, { code: 'ini' });
	}
}

this.conf = {
	aliases: ['s, dc, leave'],
	cooldown: "3"
}

this.help = {
	name: 'stop',
	description: 'Menghentikan antrean',
	usage: 'stop'
}

this.run = stop;
