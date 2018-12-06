const Discord = require('discord.js');
const quiz = [
  { q: "Apa warna langit?", a: ["tidak berwarna", "transparan"] },
  { q: "Sebutkan planet ketujuh dari Matahari!.", a: ["uranus"] },
  { q: "Nama pulau terbesar di dunia.", a: ["greenland",] },
  { q: "Apa sungai terpanjang di dunia?", a: ["amazon", "sungai amazon"] },
  { q: "Nama samudera terbesar di dunia.", a: ["pasifik", "samudra pasifik"] },
  { q: "Kalo lapar ngapain?", a: ["makan"] }, 
  { q: "Kalo ngantuk ngapain?", a: ["tidur"] },
  { q: "Gajah terbang keliatan?", a: ["boongnya"] },
  { q: "Air yang berani ialah air?", a:["terjun"] },
  { q: "Berapa banyak warna yang ada di pelangi?", a: ["7", "tujuh"] },
];
const options = {
  max: 1,
  time: 30050,
  errors: ["time"],
};

exports.run = async (client, message, args) => {
  
  const item = quiz[Math.floor(Math.random() * quiz.length)];
  await message.channel.send(item.q);
  try {
    const collected = await message.channel.awaitMessages(answer => item.a.includes(answer.content.toLowerCase()), options);
    const winnerMessage = collected.first();
    return message.channel.send({embed: new Discord.RichEmbed()
                                 .setAuthor(`Pemenang: ${winnerMessage.author.tag}`, winnerMessage.author.displayAvatarURL)
                                 .setTitle(`Jawaban yang benar: \`${winnerMessage.content}\``)
                                 .setFooter(`Pertanyaan: ${item.q}`)
                                 .setColor(message.guild.me.displayHexColor)
                                })
  } catch (_) {
    return message.channel.send({embed: new Discord.RichEmbed()
                                  .setAuthor('Tidak ada seorangpun yang dapat menjawab!')
                                 .setTitle(`Jawaban yang benar: \`${item.a}\``)
                                 .setFooter(`Pertanyaan: ${item.q}`)
                                })
  }
}

exports.conf = {
  aliases: [],
  cooldown: "5"
}

exports.help = {
  name: "quiz",
  description: "Memberikan pertanyaan yang menarik",
  usage: "quiz"
}
