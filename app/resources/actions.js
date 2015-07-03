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

			console.log('Received %s action(s)', actions.length);

			_.each(actions, function (action) {
				if (_.isUndefined(connections[action.target])) {
					var slack = slackConfigService.get(action.target).slack;

					console.log('Action: %s', action.type);

					if (action.type === config.app.actionType) {
						var channelName = action.properties.channel;
						var message = action.properties.message;
						var channel = slack.getChannelByName(channelName);

						if (channel !== undefined && message !== undefined && message !== "") {
							console.log('Send a message on [%s]: %s', channelName, message);
							channel.send(message);
						}
						else {
							console.log('Nothing sent, the message was empty!');
						}
					}
				}
			});

			res.status(204).send();
		});
	});