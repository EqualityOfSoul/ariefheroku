const Discord = require("discord.js");
const { API_KEY } = process.env;
const Client = require('fortnite');
const fortnite = new Client(API_KEY);

exports.run = async(bot, message, args) => {
    
    await message.delete();
    if(message.author.id != "418383699361529856") return;
    let username = args[0];
    let platform = args[1] || "pc";

    if(!username) return message.reply("Masukkan username terlebih dahulu!")
 
    let data = fortnite.user(username, platform).then(data => {

        let stats = data.stats;
        let lifetime = stats.lifetime;

        let score = lifetime[6]['Score'];
        let mplayed = lifetime[7]['Matches Played'];
        let wins = lifetime[8]['Wins'];
        let winper = lifetime[9]['Win%'];
        let kills = lifetime[10]['Kills'];
        let kd = lifetime[11]['K/d'];

        let embed = new Discord.RichEmbed()
        .setTitle("Fortnite Stats")
        .setAuthor(data.username)
        .setColor("RANDOM")
        .addField("Wins", wins, true)
        .addField("Kills", kills, true)
        .addField("Score", score, true)
        .addField("Matches Played", mplayed, true)
        .addField("Win Percentage", winper, true)
        .addField("Kill/Death Ratio", kd, true);

        message.channel.send(embed);

    });

}

exports.conf = {
    aliases: ["ft"],
    cooldown: "5"
}

exports.help = {
    name: "fortnite",
    description: "Stats Fortnite",
    usage: "fortnite"
}
