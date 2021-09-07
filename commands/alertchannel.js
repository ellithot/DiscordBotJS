module.exports = {
    name: 'ping',
    description: 'Ping!',
    parameters: ' ',
    execute(msg, args) {
      msg.channel.send('Ping!');
    },
  };