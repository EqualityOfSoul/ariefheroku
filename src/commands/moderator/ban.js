const { RichEmbed } = require('discord.js');

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("BAN_MEMBERS")){ 
    let embed = new RichEmbed()
      .setColor("RANDOM")
      .setDescription("Maaf, Kamu Tidak Mempunyai Permissions Untuk Ban Members");
return message.channel.send(embed);
  }
  if (!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) return message.channel.send(`**${message.author.tag}** Maaf, KuuHaku Tidak Mempunyai Permissions \`BAN_MEMBERS\` Tolong Beri KuuHaku Permissions Untuk Ban Member :)`).then(msg=>msg.delete(5000))
  
  let toBan = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!toBan) return message.channel.sendMessage("Tidak Dapat Menemukan User! Mention User Terlebih Dahulu!");
  let reason = args.join(" ").slice(22);
  if (toBan.hasPermission("BAN_MEMBERS")) return message.channel.send("User Ini Tidak Dapat Diban :(");
  
  if (toBan.highestRole.position < message.guild.member(client.user).highestRole.position) {
   message.guild.member(toBan).ban(reason);
   try {
    if (!reason) {
      toBan.send(`**${toBan.user.tag}** Kamu Telah Di Ban Dari **${message.guild.name}**`)
    } else {
      toBan.send(`**${toBan.user.tag}** Kamu Telah Di Ban Dari **${message.guild.name}**
Alasan: "${reason}"`);
    }
    let embedB = new RichEmbed()
    .setColor("RANDOM")
    .setTitle('User Telah Diban Dari Server')
    .addField('username', toBan.user.username, true)
    .addField('ID', toBan.id, true)
    message.channel.send(embedB);
  } catch (e) {
    console.log(e.message)
  }
  } else {
   message.channel.send(`Aku Tidak Bisa Ban **${toBan.user.tag}** Karena Role Dia Lebih Tingi Dari Roleku.`)
  }
}
 
exports.conf = {
  aliases: ['b'],
  cooldown: "5"
}

exports.help = {
  name: "ban",
  description: 'Ban Seseorang Dari Servermu [PERMISSION BAN MEMBERS ONLY]',
  usage: 'ban [@mention someone]'
}
