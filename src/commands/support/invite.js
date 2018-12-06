const { RichEmbed: SharifEmbed } = require('discord.js');

exports.run = async (client, message, args) => {

let embed = new SharifEmbed()
      .setColor("RANDOM")
      .setAuthor("Ingin Menginvite ~~KuuHaku~~ Ke Server Mu?")
      .setDescription("**[Klik Disini](~~link bot invite~~)**")
      .setFooter(`Requested By : ${message.author.username}`);
      
     message.channel.send(embed);
     
}

exports.conf = {
  aliases: ['invitebot'],
  cooldown: "5"

}

exports.help = {
  name: "invite",
  description: 'Untuk Menginvite ~~KuuHaku~~ Ke Server Mu',
  usage: 'invite'

}
