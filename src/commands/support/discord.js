const { RichEmbed: SharifEmbed } = require('discord.js');

exports.run = async (client, message, args) => {

let embed = new SharifEmbed()
      .setColor("RANDOM")
      .setAuthor("Support Discord")
      .setDescription("**[Klik Disini](~~link server discord~~)**")
      .setFooter(`Requested By : ${message.author.username}`);
      
     message.channel.send(embed);
     
}

exports.conf = {
  aliases: ['support'],
  cooldown: '5'

}

exports.help = {
  name: "discord",
  description: 'Untuk Masuk/Join ke Discord',
  usage: 'discord'

}
