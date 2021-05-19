const Discord = require('discord.js');

module.exports = {
  name: 'leave',
  description: 'Leaves the voice channel',
  parameters: ' ',
  execute(msg, args) {
    if (msg.guild.me.voiceChannel !== undefined) {
      msg.guild.me.voiceChannel.leave();
    }
  },
};