var express = require('express');
var router = express.Router();
var profile = require('./profile');

router.use('/profile', profile);

module.exports = router;
