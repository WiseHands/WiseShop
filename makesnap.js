var system = require('system');
var args = system.args;
var page = require('webpage').create();
page.settings.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.111 Safari/537.36';

var cur_url = "http://" + args[1] + "/#!/" + args[2];
system.stderr.write(cur_url);
if (args.length < 2) {
	system.stderr.write('Try to pass some arguments when invoking this script!');
	phantom.exit();
} else {
	args.forEach(function(arg, i) {
		system.stderr.write(i + ': ' + arg);
	});
}

var snapshot = function(my_page) {
    system.stderr.write("SNAPSHOT!\n");
        var content = page.content;
	    system.stdout.write(content);
	        phantom.exit();
		};

		system.stderr.write("opening pages...");

		page.open(cur_url, function (status) {

		    if (status !== 'success') {
				system.stderr.write('Unable to access network');
				phantom.exit();
			} else {
				system.stderr.write("done opening page.");
				setTimeout(function() {
					snapshot();
					phantom.exit();
				}, 5000);
			}
});