var fullList = []

test1 = {
    Ping: require('./commands/ping'),
    Avatar: require('./commands/avatar'),
    Help: require('./commands/help'),
    KeywordAdd: require('./commands/keyword'),
    KeywordRemove: require('./commands/keywords/remove'),
    KeywordList: require('./commands/keywords/list'),
    TTS: require('./commands/tts')
};

module.exports.test1 = test1;
listOfCommands = Object.entries(test1);
for (i=0;i<listOfCommands.length;i++) {
    fullList.push(Object.entries(listOfCommands[i][1])[0][1]);
    fullList.push(Object.entries(listOfCommands[i][1])[1][1]);
    fullList.push(Object.entries(listOfCommands[i][1])[2][1])
};
module.exports.fullList = fullList