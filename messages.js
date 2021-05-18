const { MessageEmbed } = require("discord.js")

module.exports.errorMessage = function(msg,error) {
  var embed = new MessageEmbed()
  .setAuthor(error, 'https://cdn0.iconfinder.com/data/icons/shift-free/32/Error-512.png')
  .setColor('D72828')
  msg.channel.send(embed)

}

module.exports.errorMessageLink = function(msg,error,link) {
  var embed = new MessageEmbed()
  .setAuthor(error, 'https://cdn0.iconfinder.com/data/icons/shift-free/32/Error-512.png', link)
  .setColor('D72828')
  msg.channel.send(embed)
}