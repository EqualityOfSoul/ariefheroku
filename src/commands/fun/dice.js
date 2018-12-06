const { RichEmbed } = require('discord.js');

exports.run = (client, message, args, color) => {
  
  let number = args.join('');
  if (!args[0]) number = 6; // astaga 
  if(isNaN(args[0])) return message.channel.send('Kamu hanya dapat menggunakan angka dalam sebuah dadu');
  
  
  let roll = Math.floor(Math.random() * number) + 1;
  const embed = new RichEmbed() 
  .setColor("RANDOM")
  .setThumbnail('https://gilkalai.files.wordpress.com/2017/09/dice.png?w=640')
  .setAuthor(message.author.username, message.author.avatarURL)
  .setTitle(`Rolling a ${number} sided dice.`)
  .setDescription(`Kamu mendapatkan angka ${roll}`)
  return message.channel.send(embed);
}

exports.conf = {
  aliases: ['role-dice, rd'],
  cooldown: "5"
}

exports.help = {
  name: "dice",
  description: 'Cobalah untuk melempar dadu dan dapatkan keberuntunganmu.',
  usage: 'dice'
}
