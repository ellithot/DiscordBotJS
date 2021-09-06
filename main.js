const Discord = require('discord.js');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const commands = require('./command');
const keywordCheck = require('./commands/keywords/keywordcheck');
const botCommands = commands.test1

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
  keywordCheck.Check(msg, args)
  if (msg.content == '!jm') {
    var embed = new Discord.MessageEmbed()
      .setTitle('About Joe Mama:')
      .setAuthor('Hosted by Elliott#3501', 'https://cdn.discordapp.com/avatars/266231934978359297/bf15092ad0b8d43cc9b56f3da34823f0.png?size=128')
      .setDescription("Closed source Discord bot written in Node.js.\nhttps://github.com/go/fuckyourself")
      .setFooter('- I am going to hit you with my car.')
      .setColor('#b0b0b0')
    msg.channel.send(embed)
  }

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