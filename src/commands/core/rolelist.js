const Discord = require("discord.js");

exports.run = async (client, message, args) => {

    var embed = new Discord.RichEmbed()
    .setAuthor(`${message.guild.name}`, message.guild.iconURL)
    .setDescription(`💳 | ID : ${message.guild.id}`)
    .setThumbnail(message.guild.iconURL)
    .setColor("RANDOM")
    .addField(`🔒 | Roles List [${message.guild.roles.size}]`, `${message.guild.roles.map(roles => roles).join(' \n ')}`, true)
    .setFooter(`Requested By : ${message.author.tag}`)

    message.channel.send(embed)
}

exports.conf = {
    aliases: [],
    cooldown: "10"
}

exports.help = {
    name: "rolelist",
    description: "List Role di server",
    usage: "rolelist"
}