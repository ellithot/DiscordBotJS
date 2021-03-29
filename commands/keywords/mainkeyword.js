const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const jsonfile = require('jsonfile')

module.exports = {
    AddWord: (msg) => {
        splitMsg = msg.content.split(' ');
        console.log(splitMsg[3])

        if (splitMsg[3] != undefined && splitMsg[4] != undefined) {
            var keyword = splitMsg[3]
            var valueList = []
            for (i=0;i<splitMsg.length-4;i++) {
                valueList.push(splitMsg[i+4])
            }
            value = valueList.join(' ')
            if (keyword.length >= 1500 || value.length >= 1500) {
                msg.channel.send('Too large. Fuck you.')
                return;
            }
        } else {
            msg.channel.send('Fuck you. Stop trying to break my code.');
            return
        }

        let serverId = msg.guild.id;
        let serverFile = './commands/keywords/config/' + serverId + '.json';
        fs.mkdir('./commands/keywords/config/', err => {
            if (err) console.log(err)
        })

        try {
            testRead = jsonfile.readFileSync(serverFile)
            testRead.push(keyword,value)
        } catch {
            testRead = [keyword, value]
        }

        testRead = JSON.stringify(testRead)
        fs.writeFile(serverFile, testRead, function (err) {
            if (err) console.error(err)
        })
        
        var embed = new MessageEmbed()
        .setTitle(':white_check_mark: New Keyword added:')
        .setColor('#77B255')
        .setFooter(value)
        .setDescription(keyword)
        msg.channel.send(embed)
    },
    RemoveWord: (msg) => {
        try {
            let serverId = msg.guild.id;
            let serverFile = './commands/keywords/config/' + serverId + '.json';
            splitMsg = msg.content.split(' ');
            testRead = jsonfile.readFileSync(serverFile);
            if (splitMsg[3] != undefined && splitMsg[4] != undefined) {
                var keyword = splitMsg[3]
                var valueList = []
                for (i=0;i<splitMsg.length-4;i++) {
                    valueList.push(splitMsg[i+4])
                }
                value = valueList.join(' ')
            } else {
                var embed = new MessageEmbed()
                .setTitle(':no_entry: Invalid Parameters!')
                .setColor('BE1931')
                msg.channel.send(embed)
                return
            }
            msg.channel.send(testRead)
            msg.channel.send(value,keyword)

        } catch {
            var embed = new MessageEmbed()
            .setTitle('STOP TRYING TO BREAK ME')
            msg.channel.send(embed)
        }
    },
    ListWord: (msg, args) => {
        let serverId = msg.guild.id;
        let serverFile = './commands/keywords/config/' + serverId + '.json';

        try {
            var testRead = jsonfile.readFileSync(serverFile)

            for (i=0;i<testRead.length;i++) {
                if (testRead[i].length >= 16) {
                    testRead[i] = testRead[i].slice(0,15) + '...'
                }
            }

            var testVar = {}

            for (i=0;i<testRead.length/2;i++) {
                if (i % 10 == 0) var finalMsg = ''
                finalMsg += '`' + testRead[i*2] + '` - ' + testRead[i*2+1] + '\n'
                var testNum = 10 + i
                var testVar2 = Math.floor(testNum/10).toString()
                testVar[testVar2] = finalMsg
            }
            
            var finalMsg = testVar["1"]
            var pageNum = args[3]

            try {
                if (args[3] != undefined && testVar[pageNum] != undefined) {
                    var finalMsg = testVar[pageNum]
                } else {
                    throw TypeError
                }
            } catch {
                var pageNum = testVar2
                var finalMsg = testVar[pageNum]
            }

            var embed = new MessageEmbed()
            .setTitle('List of keywords:')
            .setFooter('Page ' + pageNum + "/" + testVar2)
            .setDescription(finalMsg)
            msg.channel.send(embed)
        } catch {
            var embed = new MessageEmbed()
            .setAuthor('No Keywords!', 'https://cdn0.iconfinder.com/data/icons/shift-free/32/Error-512.png')
            .setColor('D72828')
            msg.channel.send(embed)
        }
    }
}