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
      name: 'iFLUX-Slack-Gateway'
    },
    port: process.env.PORT || 3001,
		slack: {
			storageEnabled: true,
			storagePath: '/tmp'
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
			storageEnabled: false,
			storagePath: ""
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
			storageEnabled: false,
			storagePath: ""
		}
  },

	docker: {
		root: rootPath,
		baseUrl: process.env.IFLUX_SERVER_URL || 'http://www.iflux.io',
		siteUrl: process.env.IFLUX_SITE_URL || 'http://www.iflux.io',
		app: {
			name: 'iFLUX-Slack-Gateway'
		},
		port: 3000,
		slack: {
			storageEnabled: true,
			storagePath: "/data/slack"
		}
	}
};

module.exports = config[env];
