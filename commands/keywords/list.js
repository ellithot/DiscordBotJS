module.exports = {
    name: 'keyword list',
    description: "Lists all keywords",
    parameters: '[page]',
    execute(msg, args) {
      msg.channel.send("This should never display")
    },
  };