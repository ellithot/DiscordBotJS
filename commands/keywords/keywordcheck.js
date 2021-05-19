const { MessageEmbed } = require('discord.js');
const jsonfile = require('jsonfile')

module.exports = {
    Check: (msg, args) => {
        var newArray = []
        let serverId = msg.guild.id;
        let serverFile = './commands/keywords/config/' + serverId + '.json';
        try {
            var serverArray = jsonfile.readFileSync(serverFile);
            for (i = 0; i < serverArray.length / 2; i++) {
                for (i2 = 0; i2 < args.length; i2++) {
                    wordA = args[i2].toLowerCase().replace(/[^a-zA-Z0-9 ]/g, "")
                    wordB = serverArray[i * 2].toLowerCase().replace(/[^a-zA-Z0-9 ]/g, "")
                    if (wordA == wordB) newArray.push(serverArray[i * 2 + 1])
                }
            }
            if (newArray.length > 0) {
                randomInt = Math.floor(Math.random() * newArray.length);
                if (!newArray[randomInt].startsWith("https://media.discordapp.net/") && !newArray[randomInt].startsWith('https://cdn.discordapp.com/')) {
                    var embed = new MessageEmbed()
                        .setDescription(newArray[randomInt])
                    msg.channel.send(embed)
                } else {
                    msg.channel.send(newArray[randomInt])
                }
            }
        } catch {
            //pass
        }
    }
}