var moment = require('moment-timezone');

module.exports = client => {
  console.log(`${client.user.username} Ready to playing with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  function randStatus() {
    let status = [
      `Say m$help || Released Now!`,
      `24/7 Online Forever`,
      `Hosted In Heroku`,
      `Type m$help To Show Commands`,
      `Type m$invite To Invite me`,
      `In Development.`,
      `On 👥 ${client.users.size} User`,
      `On 📻 ${client.channels.size} Channel`,
      `On 📡 ${client.guilds.size} Server`,
      `My Prefix : ?`,
      `Pukul ${moment().tz("Asia/Makassar").format('LT')} WITA`,
      `Pukul ${moment().tz("Asia/Jakarta").format('LT')} WIB`,
      `Pukul ${moment().tz("Asia/Jayapura").format('LT')} WIT`];
    let rstatus = Math.floor(Math.random() * status.length);
    client.user.setActivity(status[rstatus], {
          type: "STREAMING",
          url: "https://www.twitch.tv/semutberak"
    });
  };
setInterval(randStatus, 8000);
  console.log(`${client.user.username} sukses online!`);
  
}
