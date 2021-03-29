const http = require('https');
const fs = require('fs');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'tts',
    description: 'Reads aloud a message in text-to-speech',
    parameters: '[message]',
    execute(msg, args) {
      const googleTTS = require('google-tts-api');
      if (args[2] != undefined) {
        var valueList = []
        for (i=0;i<args.length-2;i++) {
            valueList.push(args[i+2])
        }
        messageTTS = valueList.join(' ')
        if (messageTTS.length > 200) {
          var embed = new MessageEmbed()
          .setAuthor('Message too long (max 200 characters)', 'https://cdn0.iconfinder.com/data/icons/shift-free/32/Error-512.png')
          .setColor('D72828')
          msg.channel.send(embed)
          return
        }
      } else {
        var embed = new MessageEmbed()
        .setAuthor('No Keywords!', 'https://cdn0.iconfinder.com/data/icons/shift-free/32/Error-512.png')
        .setColor('D72828')
        msg.channel.send(embed)
      }
      const url = googleTTS.getAudioUrl(messageTTS, {
        lang: 'en',
        slow: false,
        host: 'https://translate.google.com',
      });
      const file = fs.createWriteStream("./commands/message.ogg");
      const request = http.get(url, function(response) {
        try {
          let pipedFile = response.pipe(file)
          pipedFile.on('finish', () => {
            msg.channel.send({files: ["./commands/message.ogg"]})
          })
        } catch (error) {
          console.error(error)
      }
      });
    },
};