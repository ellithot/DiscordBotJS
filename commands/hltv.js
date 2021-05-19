const { HLTV } = require('hltv')
const discord = require('discord.js')


module.exports = {
    name: 'hltv',
    description: 'Gets ongoing HLTV matches',
    parameters: ' ',
    execute(msg, args) {
        teamList = {}
        finalMessage = ''
        numLiveMatches = 0
        testArray = []
        HLTV.getMatches().then((res) => {
            for (i = 0; i < res.length; i++) {
                if (res[i].live) {
                    console.log(res[i])
                    currentTeam = (numLiveMatches + 1) + '. ' + res[i].team1.name + " vs " + res[i].team2.name + "\n"
                    teamList[numLiveMatches] = res[i].team1.id
                    teamList[numLiveMatches + 'a'] = res[i].team2.id
                    finalMessage += currentTeam
                    numLiveMatches++
                }
            }
            if (args[2] <= numLiveMatches && args[2] > 0) {
                var team2List = ''
                var team1List = ''
                var team1Name = '   '
                var team1Name = ''
                HLTV.getTeam({ id: teamList[Math.floor(args[2] / 2)] }).then((res) => {
                    console.log(res)
                    var team1Name = res.name
                    for (i = 0; i < 5; i++) {
                        team1List += res.players[i] + '\n'
                    }
                }).then(() => {
                    HLTV.getTeam({ id: teamList[Math.floor(args[2] / 2) + 'a'] }).then((res) => {
                        console.log(res)
                        var team2Name = res.name
                        for (i = 0; i < 5; i++) {
                            team2List += res.players[i] + '\n'
                        }
                    })
                }).then(() => {
                    var playerEmbed = new discord.MessageEmbed()
                        .addField('team1Name', team1List, true)
                        .addField('team2Name', team2List, true)
                    msg.channel.send(playerEmbed)
                })



            } else if (args[2] != undefined) {
                msg.channel.send('Not a valid match number!')
            } else {
                var embed = new discord.MessageEmbed()
                    .setTitle('Currently Ongoing Matches:')
                    .setDescription(finalMessage)
                    .setFooter('If you want to see matches, do !jm hltv 1, hltv 2, etc.')
                msg.channel.send(embed)
            }
        })
    },
};