const { MessageEmbed }=require('discord.js');
const commands=require('../command')
var finalMessage='\n'

module.exports = {
  name: 'help',
  description: "Displays a Help Message",
  parameters: ' ',
  execute(msg, args) {
    for (i=0;i<commands.fullList.length/3;i++) {
      if (commands.fullList[i*3+2]==' ') {
        finalMessage+='`!jm '+commands.fullList[i*3]+'` - '+commands.fullList[i*3+1]+'\n\n'
      } else {
        finalMessage+='`!jm '+commands.fullList[i*3]+' '+commands.fullList[i*3+2]+'` - '+commands.fullList[i*3+1]+'\n\n'
      }
    };
    var embed=new MessageEmbed()
      .setTitle('List of commands:')
      .setDescription(finalMessage);
    msg.channel.send(embed)
  },
};