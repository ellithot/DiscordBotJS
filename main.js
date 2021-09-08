const Discord = require('discord.js');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const commands = require('./command');
const botCommands = commands.test1
const { HLTV } = require('hltv')
const fs = require('fs')


const hltvConfigFile = 'C:/Users/ellio/discord_bot/commands/hltvconfig.json'
var numEntries = 0

bot.on('ready', () => {

  HLTV.getMatches().then((res) => {

    console.log(res)
    liveMatches = []

    for (i = 0; i < res.length; i++) {

      if (res[i].live == true) {

        liveTeams = {}
        var team1 = res[i].team1.id
        var team2 = res[i].team2.id
        var rawData = fs.readFileSync(hltvConfigFile, "utf8")
        var stringObject = JSON.parse(rawData)
        console.log(stringObject[team1])
        

        if (stringObject[team1] != undefined) {
          numEntries = stringObject[team1].length
          if (numEntries > 1) {
            for (i = 0; i < 2; i++) {
              bot.channels.cache.get(stringObject[team1][i].toString()).send(`Yahoo!`)
            }
          } else {
            bot.channels.cache.get(stringObject[team1][0].toString()).send(`Yahoo!`)
          }
        }

      }
    }
  })
})


var requestLoop = setInterval(function () {
  HLTV.getMatches().then((res) => {
    console.log(res)
    for (i = 0; i < res.length; i++) {
      //pass
    }
  })
}, 600000);



var likeData

test = Object.keys(botCommands).map(key => {
  bot.commands.set(botCommands[key].name, botCommands[key]);
});

bot.on('message', msg => {


  /* if (msg.author.id == '802341943539269663') {
    msg.react('🗑')
    var filter = (reaction, user) => reaction.emoji.name === '🗑' && user.id != '802341943539269663';
    msg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
      .then(collected => {
        const reaction = collected.first();
        msg.delete()
      })

    msg.react('👍')
    var filter = (reaction, user) => reaction.emoji.name === '👍' && user.id != '802341943539269663';
    msg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
      .then(collected => {
        const fs = require('fs')

        likeData = fs.readFileSync('./likes.json', 'utf8')
        JSON.parse(likeData)
        console.log(likeData["likes"])
      })
  } */

  //If the message was sent by a bot, don't bother
  if (msg.author.bot) return
  const args = msg.content.split(/ +/);

  if (!msg.content.startsWith('!jm ')) return;
  const command = args[1].toLowerCase();

  if (!bot.commands.has(command)) {
    var embed = new Discord.MessageEmbed()
      .setAuthor("Hmmm, that's not a command. Did you make a typo?")
    msg.channel.send(embed)
    return
  }
  try {
    bot.commands.get(command).execute(msg, args);
  } catch (error) {
    console.log('here1')
    console.error(error);
    msg.reply('there was an error trying to execute that command!');
  }
});



bot.login('ODAyMzQxOTQzNTM5MjY5NjYz.YAt1Kg.WL4F_CyC4nRkrcOb5s51vrPnVFk');