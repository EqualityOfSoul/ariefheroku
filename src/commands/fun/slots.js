const slots = ['🍇', '🍊', '🍐', '🍒', '🍋'];

exports.run = async(client, msg, args) => {
    const slotOne = slots[Math.floor(Math.random() * slots.length)];
    const slotTwo = slots[Math.floor(Math.random() * slots.length)];
    const slotThree = slots[Math.floor(Math.random() * slots.length)];
    if (slotOne === slotTwo && slotOne === slotThree) {
        return msg.reply(`
            ${slotOne}|${slotTwo}|${slotThree}
            Wow! Kamu menang! Selamat atas keberuntunganmu!
        `);
    }
    return msg.reply(`
        ${slotOne}|${slotTwo}|${slotThree}
        Yah... Kamu kalah... Coba lagi lain kali ya?
    `);
}

exports.conf = {
    aliases: [],
    cooldown: "3"
}

exports.help = {
    name: "slots",
    description: "Rame-ramean doang",
    usage: "slots"
}
