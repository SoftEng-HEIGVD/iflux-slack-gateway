var
	fs = require('fs'),
	config = require('../../config/config');


var slackConfig = {};

module.exports = {
	load: function() {
		if (config.slack.storageEnabled) {
			fs.readFile(config.slack.storagePath + '/instances.json', function(err, data) {
				if (err) {
					console.log(err);
				}
				else {
					slackConfig = JSON.parse(data);
				}
			});
		}
	},

	save: function() {
		if (config.slack.storageEnabled) {
			fs.writeFile(config.slack.storagePath + '/instances.json', JSON.stringify(slackConfig), function (err) {
				if (err) {
					console.log(err);
				}
			});
		}
	},

	upsert: function(instanceId, config) {
		slackConfig[instanceId] = config;
		this.save();
	},

	get: function(instanceId) {
		return slackConfig[instanceId];
	}
};