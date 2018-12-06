const Discord = require("discord.js");
const ColorMap = {
    'online' : '#00FF00',
    'idle' : '#FF8000',
    'streaming' : '#A901DB',
    'dnd' : '#FF0000',
    'offline' : '#848484'
};
const ngebot = {
    'true' : 'Bot User',
    'false' : 'Regular User'
};
const StatusMap = {
    'online' : `💚`,
    'idle' : `💛`,
    'streaming' : `💜`,
    'offline' : `🖤`,
    'dnd' : `❤`
};
const StatusText = {
    'online' : 'Online',
    'idle' : 'Idle',
    'dnd' : 'Do Not Disturb',
    'offline' : 'Offline',
    'streaming' : 'Streaming'
};

exports.run = async(client, message, args) => {

    let user = message.author;
    var member = message.guild.member(user) 
    let embed = new Discord.RichEmbed()
    .setDescription("Informasi: ")
    .setAuthor(`${user.username}#${user.discriminator}`, user.displayAvatarURL)
    .setThumbnail(user.displayAvatarURL)
    .addField('Username', user.username, true)
    .addField('ID', user.id, true)
    .addField('Nickname', `${member.nickname ? '' + member.nickname + '' : 'None'}`, true)
    .addField('Registered', new Date(user.createdAt).toISOString().replace(/T/, ' ').replace(/\..+/, ''), true)
    .addField('Joined', new Date(member.joinedAt).toISOString().replace(/T/, ' ').replace(/\..+/, ''), true)
    .addField('Status', StatusMap[user.presence.status]+' '+StatusText[user.presence.status], true)
    .addField('Member Type', ngebot[user.bot], true)
    .setColor(ColorMap[user.presence.status])
    .setThumbnail(user.displayAvatarURL)
    message.channel.send(embed);

}

exports.conf = {
    aliases: [],
    cooldown: "5"
}

exports.help = {
    name: "userinfo",
    description: "Cek status user",
    usage: "userinfo"
}
