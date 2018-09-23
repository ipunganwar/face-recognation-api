const express = require("express");
const router = express.Router();
const { setData } = require('../state/index')
const generateAudio = require('../helpers/generateAudio')
const path = require('path');

router.get("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});

router.post("/submit", (req, res) => {
  generateAudio(req.body.data.face, (audioUrl) => {
    req.body.data.face.audioUrl = audioUrl
    setData(req.body)
  })
  // setData(req.body)
  res.send({ response: "I am posting" }).status(200);
})

router.get("/audiofile/:filename", (req, res) => {
  let filename = req.params.filename
  if(filename == 'default') {
    var pathfile = __dirname + '/../assets/default.mp3'
    res.download(pathfile)
  } else {
    var pathfile = __dirname + '/../public/temp/' + filename
    res.download(pathfile)
  }
})

module.exports = router;
