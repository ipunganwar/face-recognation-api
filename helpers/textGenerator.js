function textToSpeechGenerator(name) {
  name = name.split(' ')[0]
  let text = `Hi, ${name} welcome to pins office`
  return text
}

function tempFileNameGenerator() {
  let namaFile = randomIdGenerator()
  namaFile += Date.now().toString()
  return namaFile
}

function randomIdGenerator() {
  var text = "";
  var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 8; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text
}

module.exports = {
  textToSpeechGenerator,
  tempFileNameGenerator,
  randomIdGenerator
};
