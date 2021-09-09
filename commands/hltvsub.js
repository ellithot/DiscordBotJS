const { HLTV } = require('hltv')
const fs = require('fs')
var name = 'C:/Users/ellio/discord_bot/commands/hltvconfig.json'

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

                    var tempObject = {}
                    var teamId = res.id
                    var teamName = res.name
                    var teamConfig = []
                    var rawData = fs.readFileSync(name, "utf8")
                    stringObject = JSON.parse(rawData)
                    if(stringObject[teamId] != undefined) {
                        teamConfig = stringObject[teamId].subscribedChannels

                    } else {
                        teamConfig = []
                        tempObject.currentlyLive = false
                    }
                    if(!teamConfig.includes(msg.channel.id)) {
                        teamConfig.push(msg.channel.id)
                    }
                    //serverConfigs[msg.guild.id] = teamConfig
                    tempObject.subscribedChannels = teamConfig
                    if (tempObject.teamName == undefined) {
                        tempObject.teamName = teamName
                    }
                    stringObject[teamId] = tempObject
                    fs.writeFileSync(name, JSON.stringify(stringObject, null, "\t"))
                    msg.channel.send('You will now receive updates for ' + teamName + '.')

                },

        function (error) {
            msg.channel.send('This Works!!!!')
        }

        )
    }

},
};