keyword = require('./keywords/mainkeyword')

module.exports = {
    name: 'keyword',
    description: "Adds a keyword",
    parameters: 'add [keyword] [value]',
    execute(msg, args) {
      switch (msg.content.split(/ +/)[2].toLowerCase()) {
        case "add":
          keyword.AddWord(msg);
          break
        case "remove":
          keyword.RemoveWord(msg)
          break
        case "list":
          keyword.ListWord(msg, args)
          break
        default:
          msg.channel.send('stop trying to break my code')
      }
    },
  };