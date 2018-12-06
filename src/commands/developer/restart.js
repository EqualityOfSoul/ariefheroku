const Discord = require("discord.js");
const { owners_id } = require("../../config.json");

exports.run = (client, message, args) => {
      var authors = (owners_id);
    if(!authors.includes(message.author.id)) return message.channel.send("⛔ **ACCESS DENIED**");
  
  message.channel.send('Restarting...')
    .then(msg => client.destroy())
    .then(() => client.login(process.env.SECRET))
    .then(msg => message.channel.send("Restart completed."))
  
  return;
}

exports.conf = {
    aliases: [],
    cooldown: "60"
}

exports.help = {
    name: "restart",
    description: "Restart Bot",
    usage: "restart"
}
