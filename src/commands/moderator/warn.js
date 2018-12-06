const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
const db = require('quick.db')

module.exports.run = async (client, message, args) => {

  message.delete()
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Tidak ada yang dapat dilakukan!");
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!wUser) return message.reply("Tidak dapat menemukan user yang dicari");
  if(wUser.hasPermission("ADMINISTRATOR")) return message.reply("Dia tidak bisa di warn");
  let reason = args.join(" ").slice(22);

  let warns = db.get(`warns_${wUser.id}`)
  if(!warns) warns = 1;

  let warnEmbed = new Discord.RichEmbed()
  .setDescription("Warn Our Member Logs")
  .setAuthor(message.author.username)
  .setColor("RANDOM")
  .addField("Warned User", `<@${wUser.id}>`)
  .addField("Warned In", message.channel)
  .addField("Number of Warnings", warns)
  .addField("Reason", reason);

  let warnchannel = message.guild.channels.find(`name`, "【❗】server_log");
  if(!warnchannel) return message.reply("Tidak dapat menemukan channel");

  message.channel.send(`${wUser} Berhasil diberi peringatan oleh ${message.author}, Alasan: [${reason}], Warnings Number: [${warns} Warnings]`);
  db.add(`warns_${wUser.id}`, 1)
  warnchannel.send(warnEmbed);

  if(warns == 2){
    let muterole = message.guild.roles.find(`name`, "Muted");
    if(!muterole) return message.reply("Kamu harus membuat role Muted terlebih dahulu.");

    let mutetime = "10s";
    await(wUser.addRole(muterole.id));
    message.channel.send(`<@${wUser.id}> berhasih diMuted untuk sementara`);

    setTimeout(function(){
      wUser.removeRole(muterole.id)
      message.reply(`<@${wUser.id}> berhasil di Unmute.`)
    }, ms(mutetime))
  }
  if(warns == 3){
    message.guild.member(wUser).ban(reason);
    message.reply(`<@${wUser.id}> berhasil di Banned.`)
  }

}

exports.conf = {
  aliases: [],
  cooldown: "5"
}
exports.help = {
  name: "warn",
  description: "Memberi peringatan",
  usage: "warn <@mention> <Alasan>"
}