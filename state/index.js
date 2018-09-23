const fs = require('fs');
let data = [];
let foldername = '';
let path = require('path');

function setData(item) {
	let date = new Date();

	setTimeout(function() {
		data = [];
		foldername = '';
	}, 10000);
	data = [{ ...item.data.face}];
}

function getData() {
	console.log(data)
	return data;
}

function getScreensaver() {
	// let screensaver = fs.readdirSync("/Users/eriirawan/Documents/figurative/pins/pins-api/public/images/");
	let screensaver = fs.readdirSync('./public/images/screensaver/');
	return screensaver;
}

module.exports = { setData, getData, getScreensaver };
