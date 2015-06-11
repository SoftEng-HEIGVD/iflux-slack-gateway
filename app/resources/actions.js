var
	_ = require('underscore'),
	domain = require('domain'),
	d = domain.create(),
	express = require('express'),
	router = express.Router(),
	config = require('../../config/config'),
	Slack = require('slack-client'),
	slackConfigService = require('../services/slackConfigService');

d.on('error', function(err) {
	console.log("Unable to process actions.");
	console.log(err);
});

var connections = {};

module.exports = function (app) {
  app.use('/actions', router);
};

router.route('/')
	/* POST actions */
	.post(function (req, res) {
		d.run(function() {
			var actions = req.body;

			console.log("Received " + actions.length + " actions on REST API.");

			_.each(actions, function (action) {
				if (_.isUndefined(connections[action.instanceId])) {
					var slackConfig = slackConfigService.get(action.instanceId);

					var slack = new Slack(slackConfig.token, false, true);

					slack.on('open', function () {
					  console.log('Welcome to Slack. You are @%s of %s', slack.self.name, slack.team.name);
					});

					slack.on('error', function (e) {
					  console.log("Slack error");
					  console.log(e);
					});

					connections[action.instanceId] = slack;
				}

				console.log("Action: " + action.type);

				if (action.type === "sendSlackMessage") {
					slack.login();

					var channelName = action.payload.channel;
					var message = action.payload.message;
					var channel = connections[action.instanceId].getChannelByName(channelName);

					console.log("Sending " + message + " to " + channelName);
					if (channel !== undefined && message !== undefined && message !== "") {
						channel.send(message);
					}
				}
			});

			res.status(204).send();
		});
	});