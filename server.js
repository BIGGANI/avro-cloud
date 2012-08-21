/*
    =============================================================================
    *****************************************************************************
    The contents of this file are subject to the Mozilla Public License
    Version 1.1 (the "License"); you may not use this file except in
    compliance with the License. You may obtain a copy of the License at
    http://www.mozilla.org/MPL/

    Software distributed under the License is distributed on an "AS IS"
    basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See the
    License for the specific language governing rights and limitations
    under the License.

    The Original Code is avro-cloud

    The Initial Developer of the Original Code is
    Mehdi Hasan Khan <mhasan@omicronlab.com>

    Copyright (C) OmicronLab (http://www.omicronlab.com). All Rights Reserved.


    Contributor(s): 

    *****************************************************************************
    =============================================================================
*/

var http = require('http');
var url = require('url');
var fs = require('fs');
var sio = require('socket.io');

var WorkQueue = require('mule').WorkQueue;
var nWorkers = 1;
var workQueue = new WorkQueue('./lib/worker.js', nWorkers);

var server = http.createServer(function(requset, response){
	var input = url.parse(decodeURI(requset.url), true).query.input;
	response.writeHead(200, {'Content-Type': 'text/html'});
	response.end(fs.readFileSync('./index.html'));	
});

server.listen(8080, function(){
	console.log('Server listening at http://localhost:8080/');
});

// Attach the socket.io server
var io = sio.listen(server);
io.set('log level', 1); // warn level logging

// Define a message handler
io.sockets.on('connection', function (socket) {
  socket.on('message', function (msg) {    
	workQueue.enqueue(msg, function (result) {
		socket.json.send(result);
	});
  });
});