require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const commands = require('./command');
const botCommands = commands.test1
const fs = require('fs')

const hltvCheck = require('./hltvcheck')

const liveTeamFile = 'C:/Users/ellio/discord_bot/currentlylive.json'
const hltvConfigFile = 'C:/Users/ellio/discord_bot/commands/hltvconfig.json'
var numEntries = 0






bot.on('ready', () => {
  hltvCheck(bot)
})



var likeData

test = Object.keys(botCommands).map(key => {
  bot.commands.set(botCommands[key].name, botCommands[key]);
});

bot.on('message', msg => {

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



bot.login(process.env.API_KEY);