exports.conf = {
    aliases: ['8b'],
    cooldown: '5'
}
exports.help = {
    name: "8ball",
    description: "Katakan pada 8 Ball yang hebat tentang keberuntunganmu.",
    usage: '8ball'
}
exports.run = async (client, message, args) => {
    let wishes = args.slice(0).join("");
    let author = message.author.username;
    /**
     * Get some random result from 8 ball
     * @param {String} wishes
     * @param {String} author
     */
    function get8ball(wishes, author) {
        /**
         * Lemme tell you, im not make this manually.
         * I have the ABSOLUTLY 8 BALL REFERENCES
         * https://en.wikipedia.org/wiki/Magic_8-Ball
         */
        const ballRef = [
            //affirmative answers
            "Sudah pasti.",,
            "Tanpa keraguan.",
            "Ya, tentu saja.",
            "Kamu mungkin bergantung padanya.",
            "Seperti yang saya lihat, ya.",
            "Yang paling disukai.",
            "Terlihat bagus.",
            "Ya.",
            "Menurutku, ya.",

            //non-committal answers
            "Coba lagi.",
            "Tanyakan lagi nanti.",
            "Lebih baik tidak memberitahumu sekarang.",
            "Tidak dapat diprediksi sekarang.",
            "Berkonsentrasilah dan coba lagi.",

            //negative answers
            "Jangan mengandalkannya.",
            "Menurutku, tidak.",
            "Ohh, itu tidak terlihat bagus.",
            "Sangat meragukan."
        ]
        let randomize = Math.floor(Math.random() * ballRef.length);
        if (!wishes) return "Tanyakan sesuatu."
        return `\:8ball\: | ${ballRef[randomize]} \*\*${author}\*\*`
    }
    message.channel.send(get8ball(wishes, author));
}
