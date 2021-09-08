const { HLTV } = require('hltv')
fs = require('fs')
var name = 'C:/Users/ellio/discord_bot/commands/hltvconfig.json'
const util = require('util');


module.exports = {

    name: 'hltvsub',
    description: "Subscribe to a CS:GO team to get an update on when they're playing",
    parameters: '[Team Name]',
    execute(msg, args) {

        serverConfigs = {}

        if (args.length <= 2) {
            msg.channel.send('Not valid lol')
        } else {

            args.shift()
            args.shift()

            teamName = 'joe'

            HLTV.getTeamByName({ name: args }).then(

                function (res) {

                    teamId = res.id
                    teamName = res.name
                    teamConfig = []
                    rawData = fs.readFileSync(name, "utf8")
                    stringObject = JSON.parse(rawData)
                    if(stringObject[teamId] != undefined) {
                        teamConfig = stringObject[teamId]
                    } else {
                        teamConfig = []
                    }
                    if(!teamConfig.includes(msg.channel.id)) {
                        teamConfig.push(msg.channel.id)
                    }
                    //serverConfigs[msg.guild.id] = teamConfig
                    stringObject[teamId] = teamConfig
                    fs.writeFileSync(name, JSON.stringify(stringObject))
                    msg.channel.send('You will now receive updates for ' + teamName + '.')

                },

        function (error) {
            msg.channel.send('This Works!!!!')
        }

        )
    }

},
};