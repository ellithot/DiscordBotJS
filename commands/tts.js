const http = require('https');
const fs = require('fs');
const { MessageEmbed } = require('discord.js');
const googleTTS = require('google-tts-api');

module.exports = {
    name: 'tts',
    description: 'Reads aloud a message in text-to-speech',
    parameters: '[optional:language] [message]',
    execute(msg, args) {

      if (args[2].startsWith('language:')) {
        var firstMessage = 3
        var wholeLang = args[2];
        var splitLang = wholeLang.split(':')
        if (splitLang[1] != '') setLang = splitLang[1]
        else setLang = 'en'
      } else {
        var firstMessage = 2
        var setLang = 'en';
      }

      if (args[firstMessage] != undefined) {
        var valueList = []
        for (i=0;i<args.length-firstMessage;i++) {
            valueList.push(args[i+firstMessage])
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
        lang: setLang,
        slow: false,
        host: 'https://translate.google.com',
      });

      try {
        tempVar = url
      } catch {
        const url = googleTTS.getAudioUrl(messageTTS, {
          lang: 'en',
          slow: false,
          host: 'https://translate.google.com',
        });
      }

      const file = fs.createWriteStream("./commands/message.ogg");
      const request = http.get(url, function(response) {

        try {
          let pipedFile = response.pipe(file)

          pipedFile.on('finish', () => {
            if (msg.member.voice.channel) {
              testFunction = async function() {
                const connection = await msg.member.voice.channel.join();
                var dispatcher = connection.play('./commands/message.ogg')
              }
              testFunction()
            } else {
              msg.reply('You need to join a voice channel first!');
              return
            }
          })
        } catch (error) {
          console.error(error)
      }
      });
    },
};