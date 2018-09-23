const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const cors = require('cors');
const api = require('./routes/index');
const port = process.env.PORT || 8100;
const { setData, getScreensaver, getData } = require('./state/index');
const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
app.use(bodyParser.json({ extended: true, limit: '5mb' }));
app.use('/api', api);

const io = require('socket.io')(server, {
	pingInterval: 5000,
	pingTimeout: 5000,
	cookie: false
});

io.on('connection', client => {
	console.log(clc.yellow('User Connected'));

	client.on('disconnect', () => {
		console.log(clc.red('User Disconnected'));
	});

	client.on('subscribeToTimer', interval => {
		setInterval(() => {
			client.emit('timer', new Date()),
				client.emit('dataScreensaver', getScreensaver());
		}, interval);
	}),
		client.on('getDataApi', timer => {
			setInterval(() => {
				client.emit('dataCustomers', getData());
			}, timer);
		});
});

var clc = require('cli-color');

server.listen(port, function() {
	console.log(clc.green('================================'));
	console.log(clc.green('SERVER RUNNING ON PORT ' + port));
	console.log(clc.green('================================'));
});

let min = 1000 * 60;
server.timeout = 5 * min;
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
	if (error.syscall !== 'listen') {
		throw error;
	}
	var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privilages');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(bind + ' already in use');
			process.exit(1);
			break;
		default:
			throw error;
	}
}

function onListening() {
	let addr = server.address();
	let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
	console.log('Listening on ' + bind);
}
