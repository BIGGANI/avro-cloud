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

var AvroClassic = require('./lib/avroclassic');
var avroclassic = new AvroClassic();

http.createServer(function(requset, response){
	var input = url.parse(decodeURI(requset.url), true).query.input;
	if (input){
		response.writeHead(200, {'Content-Type': 'text/html'});
		response.end(avroclassic.parse(input));	
	} else {
		response.writeHead(401);
		response.end();
	}
}).listen(8080);