const Discord = require("discord.js");
const Text = ['Bacod!', 'Ngentod', 'Bangsat', 'Goblok', 'Ngentod-Ngentod', 'Bacod Ngentod!', 'Apa Bangsat!', 'Tayo'];

exports.run = async (bot, message, args) => {
    const rText = Text[Math.floor(Math.random() * Text.length)];
	message.channel.send(rText)
}

exports.conf = {
    aliases: ['hai, hallo, hey'],
    cooldown: "5"
}

exports.help = {
    name: "hai",
    description: "Bercanda... 😅",
    usage: "hai"
}
