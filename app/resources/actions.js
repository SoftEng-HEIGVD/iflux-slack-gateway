var
	_ = require('underscore'),
	domain = require('domain'),
	d = domain.create(),
	express = require('express'),
	router = express.Router(),
	config = require('../../config/config'),
	Slack = require('slack-client');

d.on('error', function(err) {
	console.log("Unable to process actions.");
	console.log(err);
});

var autoReconnect = true;
var autoMark = true;

var slack = new Slack(config.slack.token, autoReconnect, autoMark);

slack.on('open', function () {
  console.log('Welcome to Slack. You are @%s of %s', slack.self.name, slack.team.name);
});

slack.on('error', function (e) {
  console.log("Slack error");
  console.log(e);
});

// TODO: Better error handling. Crash the app when error occurs.
//slack.on('message', function (message) {
//  var type = message.type,
//    channel = slack.getChannelGroupOrDMByID(message.channel),
//    user = slack.getUserByID(message.user),
//    time = message.ts,
//    text = message.text,
//    response = '';
//  console.log('Received: %s %s @%s %s "%s"', type, (channel.is_channel ? '#' : '') + channel.name, user.name, time, text);
//});
//
//
//slack.on('star_added', function(event) {
//  console.log("You are a STAR: " + event.item.message.text);
//});

slack.login();

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
				console.log("Action: " + action.type);

				if (action.type === "sendSlackMessage") {
					var channelName = action.properties.channel;
					var message = action.properties.message;
					var channel = slack.getChannelByName(channelName);

					console.log("Sending " + message + " to " + channelName);
					if (channel !== undefined && message !== undefined && message !== "") {
						channel.send(message);
					}
				}
			});

			res.status(204).send();
		});
	});