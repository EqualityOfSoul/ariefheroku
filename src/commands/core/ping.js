const Discord = require("discord.js");

exports.run = async (client, message, args, color) => {
  let start = Date.now(); message.channel.send(':ping_pong:').then(message => {
    message.delete();
    let diff = (Date.now() - start).toLocaleString();
    let API = (client.ping).toFixed(2)
    let embed = new Discord.RichEmbed()
    .setTitle(`🏓 Pong!`)
    .setColor("RANDOM")
    .addField("📡 Latency", `${diff}ms`, true)
    .addField("💻 API", `${API}ms`, true)
    message.channel.send(embed);
  });
};

exports.conf = {
  aliases: ['pang', 'peng', 'pong'],
  cooldown: '10'
}

exports.help = {
  name: "ping",
  description: 'Ping bot untuk melihat apakah ada masalah latensi.',
  usage: 'ping'
}
