async function queueS (client, msg, args){
	try{
		const queue = client.queue.get(msg.guild.id);
		if(!queue) return msg.channel.send('Tidak memainkan apa pun sekarang :/');
		const nowPlay = queue.songs[0];
		const q = queue.songs.slice(1);
		return msg.channel.send(`
**Now Playing**: ${nowPlay.title}
\`\`\`${trimArray(q.map(x => x.title)).map((x, i) => `${i+1}. ${x}`).join('\n')}\`\`\``);
	} catch (err) {
		return msg.channel.send(err.stack, { code: 'ini' });
	}
}

function trimArray(arr, maxLen = 10) {
	if (arr.length > maxLen) {
		const len = arr.length - maxLen;
		arr = arr.slice(0, maxLen);
		arr.push(`${len} more...`);
	}
	return arr;
}

this.conf = {
	aliases: ['q'],
	cooldown: "3"
}

this.help = {
	name: 'queue',
	description: 'Menampilkan antrian lagu',
	usage: 'queue'
}

this.run = queueS;
