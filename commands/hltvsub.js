const { HLTV } = require('hltv')

module.exports = {
    name: 'hltvsub',
    description: "Subscribe to a CS:GO team to get an update on when they're playing",
    parameters: '[Team Name]',
    execute(msg, args) {
        if (args.length <= 2) {
            msg.channel.send('Not valid lol')
        } else {
            for (i = 0; i < 2; i++) {
                args.shift()
            }
            teamName = 'joe'
            HLTV.getTeamByName({ name: args }).then(
                function (res) {
                    teamPlayers = []
                    teamName = res.name
                    teamLogo = res.logo
                    for (i = 0; i < res.players.length; i++) {
                        if (res.players[i].type == "Starter") {
                            teamPlayers.push(res.players[i].name)
                        }
                    }
                    msg.channel.send(teamName + ' ' + teamPlayers.join(', '))
                },
                function (error) {
                    msg.channel.send('This Works!!!!')
                }
            )
        }
    },
};