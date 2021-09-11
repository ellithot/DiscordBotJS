const { HLTV } = require('hltv')
const fs = require('fs')


const liveTeamFile = 'C:/Users/ellio/discord_bot/currentlylive.json'
const hltvConfigFile = 'C:/Users/ellio/discord_bot/commands/hltvconfig.json'
var numEntries = 0

module.exports = function(bot) {
    var requestLoop = setInterval(function () {
        HLTV.getMatches().then((res) => {

            var liveMatches = []

            for (i = 0; i < res.length; i++) {

                if (res[i].live == true) {

                    var team1 = res[i].team1.id
                    var team2 = res[i].team2.id

                    liveMatches.push(team1)
                    liveMatches.push(team2)

                    var rawData = fs.readFileSync(hltvConfigFile, "utf8")
                    var liveData = fs.readFileSync(liveTeamFile, "utf8")

                    var liveObject = JSON.parse(liveData)
                    var stringObject = JSON.parse(rawData)

                    var team1Name = res[i].team1.name
                    var team2Name = res[i].team2.name

                    var team1Link = 'https://www.hltv.org/team/' + res[i].team1.id + '/' + team2Name.replace(' ', '-')
                    var team2Link = 'https://www.hltv.org/team/' + res[i].team2.id + '/' + team2Name.replace(' ', '-')

                    var liveArray = liveObject.liveTeams

                    if (stringObject[team1] != undefined && liveArray.indexOf(team1) == -1) {


                        numEntries = stringObject[team1].subscribedChannels.length

                        if (numEntries > 1) {

                            for (i = 0; i < 2; i++) {
                                bot.channels.cache.get(stringObject[team1].subscribedChannels[i].toString()).send(stringObject[team1].teamName + " are currently live, playing " + team2Name + "! You can view them here: " + team1Link)
                            }

                        } else {

                            bot.channels.cache.get(stringObject[team1].subscribedChannels[0].toString()).send(stringObject[team1].teamName + " are currently live, playing " + team2Name + "! You can view them here: " + team1Link)
                        }

                    }

                    if (stringObject[team2] != undefined && liveArray.indexOf(team2) == -1) {


                        numEntries = stringObject[team2].subscribedChannels.length

                        if (numEntries > 1) {

                            for (i = 0; i < 2; i++) {
                                bot.channels.cache.get(stringObject[team2].subscribedChannels[i].toString()).send(stringObject[team2].teamName + " are currently live, playing " + team1Name + "! You can view them here: " + team2Link)
                            }

                        } else {

                            bot.channels.cache.get(stringObject[team2].subscribedChannels[0].toString()).send(stringObject[team2].teamName + " are currently live, playing " + team1Name + "! You can view them here: " + team2Link)
                        }
                    }

                }
            }

            if (liveObject != undefined) {
                liveObject.liveTeams = liveMatches
                fs.writeFileSync(liveTeamFile, JSON.stringify(liveObject, null, "\t"))
            }

        })

    }, 600000);
}