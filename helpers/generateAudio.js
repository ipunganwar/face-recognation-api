const fs = require('fs')
const textToSpeech = require('@google-cloud/text-to-speech')
const { textToSpeechGenerator, tempFileNameGenerator, randomIdGenerator } = require('./textGenerator')
const deleteTempFile = require('./deleteTempFile')

function generateAudio(obj, cb) {
  console.log(obj)
  const client = new textToSpeech.TextToSpeechClient(
    {
      projectId: 'hale-silicon-211516',
      keyFilename: 'key.json'
    }
  )
  const text = textToSpeechGenerator(obj.name)
  const request = {
    input: {text: text},
    voice: {languageCode: 'en-US', name:'en-US-Wavenet-E', ssmlGender: 'FEMALE'},
    audioConfig: {audioEncoding: 'MP3'},
  }
  let fileName = tempFileNameGenerator()
  client.synthesizeSpeech(request, (err, response) => {
    if (err) {
      console.error('ERROR:', err);
      cb('default')
      return;
    }

    fs.writeFile('./public/temp/' + fileName + '.mp3', response.audioContent, 'binary', err => {
      if (err) {
        console.error('ERROR:', err);
        cb('default')
        return;
      }
      cb(fileName + '.mp3')
    })
  })
  deleteTempFile()
}

module.exports = generateAudio;
