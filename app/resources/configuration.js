var
	_ = require('underscore'),
	express = require('express'),
	router = express.Router(),
	config = require('../../config/config'),
	slackConfig = require('../services/slackConfigService');

module.exports = function (app) {
  app.use('/configure', router);
};

router.route('/')
	.post(function (req, res) {
		if (req.body.actionTargetId) {
			slackConfig.upsert(req.body.actionTargetId, req.body.properties);
		}

		return res.status(204).end();
	});