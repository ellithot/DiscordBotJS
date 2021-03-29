const googleTTS = require('google-tts-api'); // CommonJS

// get audio URL
const url = googleTTS.getAudioUrl('Hello World', {
  lang: 'en',
  slow: false,
  host: 'https://translate.google.com',
});

const http = require('https');
const fs = require('fs');

const file = fs.createWriteStream("message.mp3");
const request = http.get(url, function(response) {
  response.pipe(file);
});