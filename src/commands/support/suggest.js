const Discord = require('discord.js');

exports.run = async (client, message, args) => {

    message.delete();
    var suggest = args.slice(0).join(" ")
    if(!suggest) return message.reply("Tuliskan saranmu")

    const channel = client.channels.get('ID_CHANNEL')
    let saran = args.join(" ");
    let embed = new Discord.RichEmbed()
    .setTitle(`Saran`) //Judul 
    .setDescription(saran) //Isi
    .setColor("RANDOM")
    .setTimestamp()
    .setFooter("Pendapat dari " + message.author.username)
    channel.send(embed)
        .then(function (message) {
            message.react("435160985259737099")
            message.react("435160984521408512")
        });

    message.channel.send("Saran telah dikirim. Terima kasih").then(function (message) {
        message.react("✅")
    });

}
exports.conf = {
    aliases: [],
    cooldown: "10"
}

exports.help = {
    name: "suggest",
    description: "Memberikan saran",
    usage: "suggest <saran/pendapat>"
}
