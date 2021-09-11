require('dotenv').config()
const Discord = require('discord.js')
const bot = new Discord.Client()
bot.commands = new Discord.Collection()
const commands = require('./command')
const botCommands = commands.test1

const hltvCheck = require('./hltvcheck')


bot.on('ready', () => {
  hltvCheck(bot)
})

Object.keys(botCommands).map(key => {
  bot.commands.set(botCommands[key].name, botCommands[key])
});

bot.on('message', msg => {

  //If the message was sent by a bot, don't bother
  if (msg.author.bot) return
  const args = msg.content.split(/ +/)

  if (!msg.content.startsWith('!jm ')) return;
  const command = args[1].toLowerCase()

  if (!bot.commands.has(command)) {
    var embed = new Discord.MessageEmbed()
      .setAuthor("Hmmm, that's not a command. Did you make a typo?")
    msg.channel.send(embed)
    return
  }
  try {
    bot.commands.get(command).execute(msg, args)
  } catch (error) {
    console.error(error)
    msg.reply('there was an error trying to execute that command!')
  }
});



bot.login(process.env.API_KEY)