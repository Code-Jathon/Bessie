var express = require('express');
var http = require('http');
var path = require('path');

var appServer = express();
appServer.use(express.static(path.join(__dirname, '')));

appServer.get('*', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

http.createServer(appServer).listen(3007, function() {
    console.log('El servidor de express está escuchando en el puerto 3007');
});