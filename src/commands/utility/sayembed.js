const Discord = require('discord.js');

exports.run = async (client, message, args, color) => {

    let specifyembed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription(`${message.author}, Mohon masukkan kata atau pesan untuk di embed.`)
        .setTimestamp();

    var text = args.join(" ");
    if (!text) return message.channel.send(specifyembed);

    let postMsg = await message.channel.send('**Mohon tunggu sebentar...**');
    let embedsay = new Discord.RichEmbed()
        .setColor("#0365a3")
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setDescription(`${text}`);
        message.channel.send(embedsay).then(() => { postMsg.delete();});
};

exports.conf = {
    aliases: ['embed'],
    cooldown: '10'
};

exports.help = {
    name: "sayembed",
    description: "Embed pesan yang kamu mau.",
    usage: "embed <text/message>"
};
