exports.run = (client, message, args) => {
    message.delete();
    const guildArray = client.guilds.map((guild) => {
    return `${guild.name} : ${guild.id}`
    })
  
    message.channel.send(`\`\`\`${guildArray.join("\n")}\`\`\``)
}

exports.conf = {
    aliases: [],
    cooldown: "10"
}

exports.help = {
    name: "guilds",
    description: "Cek list server dari bot",
    usage: "guilds"
}
