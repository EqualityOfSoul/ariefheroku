const sess = new Set();
const { get } = require('node-superfetch');

async function tts (client, msg, args){
	const vc = msg.member.voiceChannel;
	if(sess.has(msg.guild.id)) return msg.channel.send('Aku sudah siap bermain text-to-speaks');
	if(!vc) return msg.channel.send('Masuk ke voice channel terlebih dahulu');
	if(!vc.permissionsFor(msg.guild.me).has(['CONNECT', 'SPEAK'])) return msg.channel.send('Tidak ada izin "Sambungkan" atau "Bicara" di voice channel.');
	if (!vc.joinable) return msg.say('Aku tidak bisa join ke voice channelmu.');
	if(!args.length) return msg.channel.send('Masukkan teks!');
	try{
		const { url } = await get('http://tts.cyzon.us/tts')
		.query({
			text: decodeURIComponent(args.join(' '))
		});
		const connection = await vc.join();
		sess.add(msg.guild.id);
		connection.playStream(url)
		.on('end', res => {
			sess.delete(msg.guild.id);
			return vc.leave();
		});
		return msg.react('✅');
	} catch (err) {
		return msg.channel.send(err.stack, { code: 'ini' });
	}
}

this.conf = {
	aliases: ['text-to-speaks'],
	cooldown: "10"
}

this.help = {
	name: 'tts',
	description: 'Mengubah teks menjadi suara',
	usage: 'tts <text>'
}

this.run = tts;
