const { RichEmbed } = require('discord.js');
const { get } = require('node-superfetch');

async function gameBuilder (client, msg, args){
	try{
		if(!args.length){
			const embed = new RichEmbed()
			.setColor("RANDOM")
			.addField('❓ GuessThatNumber [gtn]', 'Bot akan memberikan nomor yang disembunyikan secara acak dan kamu harus menebaknya.', true)
			.addField('🗨 Trivia [tv]', 'Uji pengetahuan kamu dengan kuis acak', true)
			.addField('🔢 Math [mt]', 'Selesaikan soal matematika', true)
			.addField('⏫ EmojiEmojiRevolution [emjr]', 'Uji kecepatan Anda mengetik dengan emoji yang diberikan', true)
			.setFooter('💡 To play game use <prefix>game <gamename>')
			return msg.channel.send(embed);
		}
		const gamename = args[0].toLowerCase();
		if(gamename === 'guessthatnumber' || gamename === 'gtn'){
			const numberToGuess = Math.floor(Math.random()*100);
			let passes = 10;
			let isWin = false;
			let ans = 'Tebak nomor itu!';
			while(passes > 0 && !isWin){
				await msg.channel.send(`${ans}\nkamu memiliki \`${passes}\` kesempatan!`);
				const filter = msgs => !isNaN(msgs.content) && msgs.author.id === msg.author.id;
				const response = await msg.channel.awaitMessages(filter, {
					max: 1,
					time: 15000
				});
				if(!response.size){
					await msg.channel.send('Maaf, waktu untuk menebak sudah habis');
					break;
				}
				const choice = parseInt(response.first().content, 10);
				if(choice > numberToGuess){
					ans = '🔻 Angka itu lebih rendah dari !'
				}else if(choice < numberToGuess){
					ans = '🔺 Angka itu lebih tinggi dari !'
				}else{
					isWin = true;
				}
				passes--;
			}
			if(isWin) return msg.channel.send(`Kamu menang! itu adalah \`${numberToGuess}\``);
			return msg.channel.send(`Sayang sekali... itu adalah \`${numberToGuess}\``);

		} else if(gamename === 'trivia' || gamename === 'tv'){
			const choices = ['🇦', '🇧', '🇨', '🇩'];
			const fetchMess = await msg.channel.send('Mengambil pertanyaan...');
			const { body } = await get('https://opentdb.com/api.php')
			.query({
				amount: 1,
				encode: 'url3986'
			});
			let answer = body.results[0].incorrect_answers;
			answer.push(body.results[0].correct_answer);
			answer = shuffle(answer);
			for(let i = 0; i < answer.length; i++){
				await fetchMess.react(choices[i]);
			}
			const embed = new RichEmbed()
			.setColor("RANDOM")
			.setDescription(`**${decodeURIComponent(body.results[0].question)}**\n\n` + answer.map((x,i) => `**${choices[i]}** - __**${decodeURIComponent(x)}**__`).join('\n'));
			fetchMess.edit('🗨 Kamu memiliki 15 detik untuk menjawab pertanyaan ini', {embed: embed});
			const filter = (rect, usr) => choices.includes(rect.emoji.name) && usr.id === msg.author.id;
			const response = await fetchMess.awaitReactions(filter, { max: 1, time: 15000 });
			if(!response.size) return msg.channel.send(`⏱️ Maaf, waktunya sudah habis **${decodeURIComponent(body.results[0].correct_answer)}**`);
			await fetchMess.delete()
			if(answer[choices.indexOf(response.first().emoji.name)] === body.results[0].correct_answer) return msg.reply(`Benar sekali! **${decodeURIComponent(body.results[0].correct_answer)}**`);
			return msg.reply(`Sayang sekali, jawabannya **${decodeURIComponent(body.results[0].correct_answer)}**`);

		}else if(gamename === 'math' || gamename === 'mt'){
			const numberOne = Math.floor(Math.random()*100);
			const numberTwo = Math.floor(Math.random()*100);
			const oppr = Math.floor(Math.random()*4);
			let msgs;
			let answer;
			if(oppr === 1){
				msgs = `${numberOne} + ${numberTwo} = ?`;
				answer = numberOne + numberTwo;
			} else if(oppr === 2){
				msgs = `${numberOne} - ${numberTwo} = ?`;
				answer = numberOne - numberTwo;
			}else if(oppr === 3){
				msgs = `${numberOne} × ${numberTwo} = ?`;
				answer = numberOne * numberTwo;
			}else{
				msgs = `${numberOne} : ${numberTwo} = ?`;
				answer = numberOne / numberTwo;
			}
			await msg.reply(`Kamu memiliki 15 detik untuk menjawab pertanyaan ini.\n\`\`\`${msgs}\`\`\``);
			const filter = res => !isNaN(res.content) && res.author.id === msg.author.id;
			const response = await msg.channel.awaitMessages(filter, {
				max: 1,
				time: 15000
			});
			if(!response.size){
				return msg.reply(`Maaf, waktunya sudah habis. Jawabannya \`${answer}\``);
			}
			const choice = parseInt(response.first().content, 10);
			if(choice === answer) return msg.reply(`Benar sekali \`${answer}\``);
			return msg.reply(`Sayang sekali... Jawabannya \`${answer}\``);
		}else if(gamename === 'emojiemojirevolution' || gamename === 'emjr'){
			const emo = ['⬅', '↖', '⬆', '↗', '➡', '↘', '⬇', '↙'];
			let mustAns = '';
			for(let i = 0; i < 10; i++){
				mustAns += emo[Math.floor(Math.random()*emo.length)%emo.length];
			}
			const m = await msg.reply(`Kamu memiliki 15 detik untuk mengetik.\n\`\`\`${mustAns}\`\`\``);
			const filter = res => res.content === mustAns && res.author.id === msg.author.id;
			const response = await msg.channel.awaitMessages(filter, {
				max: 1,
				time: 15000
			});
			if(!response.size){
				return msg.reply('Waktunya habis dan kamu kalah :P');
			}
			return msg.reply(`Kamu menang 😮, kecepatan mengetikmu adalah \`${(response.first().createdTimestamp - m.createdTimestamp)/1000}s\``);
		}
	} catch (err) {
		return msg.channel.send(err.stack, { code: 'ini' });
	}
}

function shuffle(array) {
	const arr = array.slice(0);
	for (let i = arr.length - 1; i >= 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = arr[i];
		arr[i] = arr[j];
		arr[j] = temp;
	}
	return arr;
}

this.conf = {
	aliases: ['g'],
	cooldown: 10
}

this.help = {
	name: 'game',
	description: 'play game',
	usage: 'game'
}

this.run = gameBuilder;
