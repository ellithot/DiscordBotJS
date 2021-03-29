module.exports = {
    name: 'keyword remove',
    description: "Removes a keyword",
    parameters: '[keyword] [value]',
    execute(msg, args) {
      msg.channel.send("This should never display")
    },
  };