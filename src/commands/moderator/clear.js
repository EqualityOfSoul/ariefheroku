const Discord = require("discord.js");
exports.run = async (bot, message, args) => {
  message.delete()
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("No.");
  if(!args[0]) return message.channel.send("no");
  message.channel.bulkDelete(args[0]).then(() => {
  message.channel.send(`Clear ${args[0]} messages.`).then(msg => msg.delete(2000));
});

}
exports.conf = {
    aliases: ['c'],
    cooldown: "5"
}

exports.help = {
    name: "clear",
    description: "Menghapus pesan yang tidak kamu inginkan",
    usage: "clear [Jumlah Pesan yang  ingin dihapus <1-100>]"
}
