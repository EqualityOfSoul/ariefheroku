const Discord = require("discord.js");

exports.run = async (bot, message, args) => {
  message.delete();
  var botmessage = args.join(" ");
  if (!botmessage) {
    message.channel.send(":x: Usage : <prefix>say <message>")
    return;
  }
  message.channel.send(botmessage);

}
exports.conf = {
  aliases: []
}

exports.help = {
  name: 'say',
  description: 'Ketik pesan yang kamu mau',
  usage: 'say [message]'
};
