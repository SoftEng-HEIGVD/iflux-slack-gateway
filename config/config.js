var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
		dotenv = require('dotenv'),
    env = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV != 'docker') {
	dotenv.load();
}

var config = {
  development: {
    root: rootPath,
		baseUrl: process.env.IFLUX_SERVER_URL || 'http://www.iflux.io',
		siteUrl: process.env.IFLUX_SITE_URL || 'http://www.iflux.io',
    app: {
      name: 'iFLUX-Slack-Gateway',
	    actionType: process.env.SLACK_ACTION_TYPE
    },
    port: process.env.PORT || 3001,
		slack: {
			enabled: true,
			storageEnabled: true,
			storagePath: '/tmp'
		}
  },

  test: {
    root: rootPath,
		baseUrl: process.env.IFLUX_SERVER_URL || 'http://www.iflux.io',
		siteUrl: process.env.IFLUX_SITE_URL || 'http://www.iflux.io',
    app: {
      name: 'iFLUX-Slack-Gateway',
	    actionType: process.env.SLACK_ACTION_TYPE
    },
    port: process.env.PORT || 3001,
		slack: {
			enabled: false,
			storageEnabled: false,
			storagePath: ""
		}
  },

  production: {
    root: rootPath,
		baseUrl: process.env.IFLUX_SERVER_URL || 'http://www.iflux.io',
		siteUrl: process.env.IFLUX_SITE_URL || 'http://www.iflux.io',
    app: {
      name: 'iFLUX-Slack-Gateway',
	    actionType: process.env.SLACK_ACTION_TYPE
    },
    port: process.env.PORT || 3001,
		slack: {
			enabled: process.env.COMMON_SLACK_ENABLE,
			storageEnabled: false,
			storagePath: ""
		}
  },

	docker: {
		root: rootPath,
		baseUrl: process.env.IFLUX_SERVER_URL || 'http://www.iflux.io',
		siteUrl: process.env.IFLUX_SITE_URL || 'http://www.iflux.io',
		app: {
			name: 'iFLUX-Slack-Gateway',
			actionType: process.env.SLACK_ACTION_TYPE
		},
		port: 3000,
		slack: {
			enabled: process.env.COMMON_SLACK_ENABLE,
			storageEnabled: true,
			storagePath: "/data/slack"
		}
	}
};

module.exports = config[env];
