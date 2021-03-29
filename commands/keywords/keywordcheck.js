const jsonfile = require('jsonfile')

module.exports = {
    Check: (msg) => {
        var newArray = []
        let serverId = msg.guild.id;
        let serverFile = './commands/keywords/config/' + serverId + '.json';
        try {
            var serverArray = jsonfile.readFileSync(serverFile);
            for (i=0;i<serverArray.length/2;i++) {
                if (msg.content.indexOf(serverArray[i*2]) != -1) {
                    newArray.push(serverArray[i*2+1])
                }
            }
            if (newArray.length > 0) {
                randomInt = Math.floor(Math.random() * newArray.length);
                msg.channel.send(newArray[randomInt])
            }
        } catch {
            //pass
        }
    }
}