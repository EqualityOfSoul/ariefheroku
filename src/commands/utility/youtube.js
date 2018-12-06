const Discord = require("discord.js");

exports.run = async(client, message, args) => {

    let youtube = args.slice(0).join('+');

    let link = `https://www.youtube.com/results?search_query=` + youtube;
    if(!youtube)return message.reply(`Masukan Kata yang Dicari `)
    if(!link)return message.reply("Console error")
    let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setTimestamp()
    .addField('Action:', 'Mencari di youtube')
    .addField("Word:", `${args.slice(0).join(' ')}`)
    .addField('Link:', `${link}`)
    .setFooter("Foto Profile", message.author.avatarURL);
    message.channel.send(embed);
    message.author.send(`Kamu telah mencari ${link} di ${ message.guild.name}`);
}

exports.conf = {
    aliases: ['yt'],
    cooldown: "5"
}

exports.help = {
    name: "youtube",
    description: "Cari di Youtube",
    usage: "youtube <kata yang ingin dicari>"
}
