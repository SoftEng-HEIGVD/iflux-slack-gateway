var
	express = require('express'),
  router = express.Router();

module.exports = function (app) {
  app.use('/', router);
};

/* GET home page. */
router.route('/')
	.get(function(req, res) {
		res.render('index', { title: 'Express' });
	});
