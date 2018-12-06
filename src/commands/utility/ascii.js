const figlet = require('figlet');

exports.run = async (client, message, args, tools) => {
  
  message.delete()
  if(args.join(' ').length > 400) return message.channel.send('Hanya dapat menerima 400 huruf!') 
  if (!args.join(' ')) return message.channel.send('Masukkan teks yang ingin diubah menjadi format ASCII'); 
    figlet(args.join(' '), (err, data) => {
      message.channel.send('```' + data + '```')
    })
};

exports.conf = {
  aliases: [],
  cooldown: "5"
}

exports.help = {
  name: "ascii",
  description: "Mengubah teks menjadi format ASCII",
  usage: "ascii [teks yang ingin di ubah]"
}
