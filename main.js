const Discord = require('discord.js');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const commands = require('./command');
const botCommands = commands.test1
const { HLTV } = require('hltv')

HLTV.getMatches().then((res) => {
    console.log(res[0].event.id)
})


var likeData

test = Object.keys(botCommands).map(key => {
  bot.commands.set(botCommands[key].name, botCommands[key]);
});

bot.on('message', msg => {

  if (msg.author.id == '802341943539269663') {
    msg.react('🗑')
    var filter = (reaction, user) => reaction.emoji.name === '🗑' && user.id != '802341943539269663';
    msg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
      .then(collected => {
        const reaction = collected.first();
        msg.delete()
      })

    /* msg.react('👍')
    var filter = (reaction, user) => reaction.emoji.name === '👍' && user.id != '802341943539269663';
    msg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
      .then(collected => {
        const fs = require('fs')

        likeData = fs.readFileSync('./likes.json', 'utf8')
        JSON.parse(likeData)
        console.log(likeData["likes"])
      }) */
  }

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
    console.error(error);
    msg.reply('there was an error trying to execute that command!');
  }
});



bot.login('ODAyMzQxOTQzNTM5MjY5NjYz.YAt1Kg.moIwJ1j-pYiJS-ZeNhqQMle61Ok');