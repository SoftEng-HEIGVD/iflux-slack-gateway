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
					var slack = slackConfigService.get(action.instanceId).slack;

					console.log("Action: " + action.typeId);

					if (action.typeId === config.app.actionType) {
						var channelName = action.payload.channel;
						var message = action.payload.message;
						var channel = slack.getChannelByName(channelName);

						console.log("Sending " + message + " to " + channelName);
						if (channel !== undefined && message !== undefined && message !== "") {
							channel.send(message);
						}
					}
				}
			});

			res.status(204).send();
		});
	});