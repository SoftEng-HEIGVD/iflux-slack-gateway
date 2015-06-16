var
	_ = require('underscore'),
	fs = require('fs'),
	config = require('../../config/config'),
	Slack = require('slack-client');

var slackConfig = {};

function initSlack(config) {
	var slack = new Slack(config.conf.token, false, true);

	slack.on('open', function () {
		console.log('Welcome to Slack. You are @%s of %s', slack.self.name, slack.team.name);
	});

	slack.on('error', function (e) {
		console.log("Slack error");
		console.log(e);
	});

	slack.login();

	config.slack = slack;
}

function initSlacks(slackConfig) {
	_.each(slackConfig, function(config) {
		initSlack(config);
	});
}

module.exports = {
	load: function() {
		if (config.slack.storageEnabled) {
			fs.readFile(config.slack.storagePath + '/instances.json', function(err, data) {
				if (err) {
					console.log(err);
				}
				else {
					slackConfig = JSON.parse(data);
					initSlacks(slackConfig);
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
		slackConfig[instanceId] = { conf: config };
		initSlack(slackConfig[instanceId]);
		this.save();
	},

	get: function(instanceId) {
		return slackConfig[instanceId];
	}
};