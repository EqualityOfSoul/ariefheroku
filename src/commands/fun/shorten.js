const shorten = require('isgd');

exports.run = async (client, message, args, tools) => {
    if (!args[0]) return message.channel.send('**Usage: $shorten <URL> [title]**')
    if (!args[1]) {
    shorten.shorten(args[0], function(res) {
        if (res.startsWith('Error:')) return message.channel.send('**Masukan URL yang valid**');
        message.channel.send(`**<${res}>**`);
    })

    } else {
      shorten.custom(args[0], args[1], function(res) {
          if (res.startsWith('Error:')) return message.channel.send(`**${res}**`);
          message.channel.send(`**<${res}>**`);
      })
    };
}
exports.conf = {
    aliases: [],
    cooldown: "3"
}

exports.help = {
    name: "shorten",
    description: "Mempersingkat URL",
    usage: "shorten <URL> [title]"
}
