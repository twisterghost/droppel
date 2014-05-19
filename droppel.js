var fs = require('fs');
var path = require('path');
var argv = require('minimist')(process.argv.slice(2));
var mkdirp = require('mkdirp');
var config = require('./config.json');

var file = argv._[0] || argv.unlink
var storageDir = path.join(config[config.service].replace('~', process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE), config.directory);

if (argv.config) {
	if (argv.drive) {
		config.drive = argv.drive;
	}

	if (argv.dropbox) {
		config.dropbox = argv.dropbox;
	}

	if (argv.directory) {
		config.directory = argv.directory;
	}

	if (argv.service) {
		if (argv.service != 'drive' && argv.service != 'dropbox') {
			console.error('The service must be "drive" or "dropbox".')
		} else {
			config.service = argv.service;
		}


	}

	fs.writeFileSync('./config.json', JSON.stringify(config, null, 2));
	process.exit(0);
}

if (!file && !argv.unlink) {
	console.log("csync");
	console.log("Persist any file in any place\n")
	console.log("Usage: ethereal [--unlink --config] file\n\n");
	console.log("Options:")
	console.log("--unlink                 Stop persisting the given file");
	console.log("--config                 Set a config option\n\n");
	console.log("Config Options:");
	console.log("--drive PATH             Set the path for Google Drive on this machine");
	console.log("--dropbox PATH           Set the path for Dropbox on this machine");
	console.log("--directory PATH         Set where files are persisted within the given service");
	console.log("--service drive|dropbox  Set which service to use");

	process.exit(1);
}

// Ensure the persisting directory exists.
if (!fs.existsSync(storageDir)) {
	console.log('Creating storage directory...');
	mkdirp.sync(storageDir);
}

persistFile = path.join(storageDir, file);

// If --unlink is found, delete the files instead.
if (argv.unlink) {
	if (fs.existsSync(file)) {
		console.log('Unlinking ' + file + '...');
		fs.unlinkSync(file);
	}

	if (fs.existsSync(persistFile)) {
		console.log('Unlinking ' + persistFile + '...');
		fs.unlinkSync(persistFile);
	}

	process.exit(0);
}

if (fs.existsSync(file)) {
	console.log('Persisting ' + file + '...');
	fs.renameSync(file, persistFile);
	fs.symlinkSync(persistFile, file);
} else if (fs.existsSync(persistFile)) {
	console.log('Persisting ' + file + '...');
	fs.symlinkSync(persistFile, file);
} else {
	console.error('File not found: ' + file);
	process.exit(1);
}
