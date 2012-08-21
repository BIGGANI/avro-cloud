var AvroClassic = require(__dirname + '/avroclassic');
var avroclassic = new AvroClassic();
var DBSearch = require(__dirname + '/dbsearch');
var db = new DBSearch();
var microtime = require('microtime');

// This is where we accept tasks given to us from the parent process.
process.on('message', function (message) {
    // Do some CPU intensive calculations with the number passed.
    var stime = microtime.now();
	var result = {};
	result['bn'] = db.search(message);;
	result['bn'].push(avroclassic.parse(message));
	result['taken'] = microtime.now() - stime;

    // Send the result back to the parent process when done.
    process.send(result);
});

/* Send ready signal so parent knows we're ready to accept tasks. This should
 * always be the last line of your worker process script. */
process.send('READY');