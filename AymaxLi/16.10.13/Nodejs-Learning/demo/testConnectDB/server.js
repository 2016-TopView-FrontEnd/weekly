// var http = require('http')

// http.createServer(function (request, response) {
// 	response.writeHead(200, {'Content-Type': 'text/plain'});
// 	response.end('haha\n');
// }).listen(27017);

var mongodb = require('mongodb');

var server = new mongodb.Server('127.0.0.1', 27017, {auto_reconnect: true});
console.log('MongoDB Server running at http://127.0.0.1: 27017/');

module.exports = server;