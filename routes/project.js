var express = require('express');
var router = express.Router();
var project = require("../controllers/Project");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('project', { title: 'Project page' });
});

router.post('/InsertProject', project.insert);

module.exports = router;