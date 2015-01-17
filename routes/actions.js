var express = require('express');
var router = express.Router();
var Slack = require('slack-client');

//var token = 'xoxb-3428109437-2T1KTl6QaYDSukKXXjMIEw5g'; // iflux
var token = 'xoxb-3441152966-EdUhN0C1zGNYflTiFSzdfTMV'; // novaccess
var autoReconnect = true;
var autoMark = true;

var slack = new Slack(token, autoReconnect, autoMark);

slack.on('open', function () {
  console.log('Welcome to Slack. You are @%s of %s', slack.self.name, slack.team.name);
});

slack.on('error', function (e) {
  console.log("Slack error");
  console.log(e);
});

slack.on('message', function (message) {
  var type = message.type,
    channel = slack.getChannelGroupOrDMByID(message.channel),
    user = slack.getUserByID(message.user),
    time = message.ts,
    text = message.text,
    response = '';
  console.log('Received: %s %s @%s %s "%s"', type, (channel.is_channel ? '#' : '') + channel.name, user.name, time, text);
});


slack.on('star_added', function(event) {
  console.log("You are a STAR: " + event.item.message.text);
});

slack.login();

/* POST actions */
router.post('/', function (req, res) {
  var actions = req.body;

  console.log("Received " + actions.length + " actions on REST API.");
  for (var i = 0; i < actions.length; i++) {
    var action = actions[i];
    console.log("Action " + i + " : " + action.type);
    if (action.type === "sendSlackMessage") {
      var channelName = action.properties.channel;
      var message = action.properties.message;
      var channel = slack.getChannelByName(channelName);
      console.log("Sending " + message + " to " + channelName);
      if (channel !== undefined && message !== undefined && message !== "") {
        channel.send(message);
      }
    }
  }
  res.status(204).send();
});

module.exports = router;