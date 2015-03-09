var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
		dotenv = require('dotenv'),
    env = process.env.NODE_ENV || 'development';

dotenv.load();

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'iFLUX-Slack-Gateway'
    },
    port: process.env.PORT || 3000,
		slack: {
			token: process.env.SLACK_BOT_TOKEN
		}
  },

  test: {
    root: rootPath,
    app: {
      name: 'iFLUX-Slack-Gateway'
    },
    port: process.env.PORT || 3000,
		slack: {
			token: process.env.SLACK_BOT_TOKEN
		}
  },

  production: {
    root: rootPath,
    app: {
      name: 'iFLUX-Slack-Gateway'
    },
    port: process.env.PORT || 3000,
		slack: {
			token: process.env.SLACK_BOT_TOKEN
		}
  },

	docker: {
		root: rootPath,
		app: {
			name: 'iFLUX-Slack-Gateway'
		},
		port: process.env.PORT || 3000,
		slack: {
			token: process.env.SLACK_BOT_TOKEN
		}
	}
};

module.exports = config[env];
