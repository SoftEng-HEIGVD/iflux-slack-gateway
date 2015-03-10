var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
		dotenv = require('dotenv'),
    env = process.env.NODE_ENV || 'development';

dotenv.load();

var config = {
  development: {
    root: rootPath,
		baseUrl: process.env.IFLUX_SERVER_URL || 'http://www.iflux.io',
		siteUrl: process.env.IFLUX_SITE_URL || 'http://www.iflux.io',
    app: {
      name: 'iFLUX-Slack-Gateway'
    },
    port: process.env.PORT || 3001,
		slack: {
			token: process.env.SLACK_BOT_TOKEN
		}
  },

  test: {
    root: rootPath,
		baseUrl: process.env.IFLUX_SERVER_URL || 'http://www.iflux.io',
		siteUrl: process.env.IFLUX_SITE_URL || 'http://www.iflux.io',
    app: {
      name: 'iFLUX-Slack-Gateway'
    },
    port: process.env.PORT || 3001,
		slack: {
			token: process.env.SLACK_BOT_TOKEN
		}
  },

  production: {
    root: rootPath,
		baseUrl: process.env.IFLUX_SERVER_URL || 'http://www.iflux.io',
		siteUrl: process.env.IFLUX_SITE_URL || 'http://www.iflux.io',
    app: {
      name: 'iFLUX-Slack-Gateway'
    },
    port: process.env.PORT || 3001,
		slack: {
			token: process.env.SLACK_BOT_TOKEN
		}
  },

	docker: {
		root: rootPath,
		baseUrl: process.env.IFLUX_SERVER_URL || 'http://www.iflux.io',
		siteUrl: process.env.IFLUX_SITE_URL || 'http://www.iflux.io',
		app: {
			name: 'iFLUX-Slack-Gateway'
		},
		port: process.env.PORT || 3001,
		slack: {
			token: process.env.SLACK_BOT_TOKEN
		}
	}
};

module.exports = config[env];
