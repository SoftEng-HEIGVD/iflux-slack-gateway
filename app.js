var express = require('express'),
  config = require('./config/config'),
	slackConfigService = require('./app/services/slackConfigService');

var app = express();

require('./config/express')(app, config);

slackConfigService.load();

app.listen(config.port);

