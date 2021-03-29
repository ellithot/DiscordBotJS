const discord = require('discord.js')

embedFunction = function(msg,member) {
  if (member.avatarURL() != undefined) embedImage = member.avatarURL();
  else embedImage = member.defaultAvatarURL;
  var embed = new discord.MessageEmbed()
  .setImage(embedImage)
  .setTitle('@' + member.tag + "'s Avatar")
  .setFooter('If you want to see your own avatar, do !jm avatar')
  msg.channel.send(embed)
}

module.exports = {
    name: 'avatar',
    description: "Gets someone's avatar",
    parameters: '[user]',
    execute(msg, args) {
      switch (args.length) {
        case 2:
          var member = msg.author
          embedFunction(msg,member)
          break
        case 3:
          var member = msg.mentions.users.first();
          if (member != undefined) embedFunction(msg,member);
          else {
            var embed = new discord.MessageEmbed()
            .setTitle("Invalid Parameters!")
            msg.channel.send(embed)
            return
          }
          break
        default:
          var embed = new discord.MessageEmbed()
          .setTitle('Oops! Looks like you set too many parameters. Did you make a typo?')
          msg.channel.send(embed)
          return
      }
      if (member.avatarURL() != undefined) embedImage = member.avatarURL();
      else embedImage = member.defaultAvatarURL;
      
    },
  };