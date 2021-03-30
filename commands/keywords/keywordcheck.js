const { MessageEmbed } = require('discord.js');
const jsonfile = require('jsonfile')

module.exports = {
    Check: (msg,args) => {
        var newArray = []
        let serverId = msg.guild.id;
        let serverFile = './commands/keywords/config/' + serverId + '.json';
        try {
            var serverArray = jsonfile.readFileSync(serverFile);
            for (i=0;i<serverArray.length/2;i++) {
                for (i2=0;i<args.length;i++) {
                    if (args[i2] == serverArray[i*2]) newArray.push(serverArray[i*2+1])
                }
            }
            if (newArray.length > 0) {
                randomInt = Math.floor(Math.random() * newArray.length);
                var embed = new MessageEmbed()
                .setDescription(newArray[randomInt])
                msg.channel.send(embed)
            }
        } catch {
            //pass
        }
    }
}