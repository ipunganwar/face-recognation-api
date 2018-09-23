const tempPath = './public/temp';
const fs = require('fs');

function deleteTempFile() {
	fs.readdirSync(tempPath).forEach(file => {
		let idAndDate = splitIdAndDate(file.replace('.mp3', ''));
		if (isYesterday(idAndDate[1])) {
			fs.unlink('./public/temp/' + file, err => {
				if (err) throw err;
			});
		}
	});
}

function isYesterday(tanggal) {
	let a = parseInt(tanggal);
	let b = a + 24 * 60 * 60 * 1000;
	let now = Date.now();
	if (b >= now) {
		return false;
	} else {
		return true;
	}
}

function splitIdAndDate(namaFile) {
	let id = '';
	let date = '';
	for (var i = 0; i < namaFile.length; i++) {
		if (i < 8) {
			id += namaFile[i];
		} else {
			date += namaFile[i];
		}
	}
	return [id, date];
}

function convertUTCDateToLocalDate(date) {
	var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

	var offset = date.getTimezoneOffset() / 60;
	var hours = date.getHours();

	newDate.setHours(hours - offset);

	return newDate;
}

module.exports = deleteTempFile;
