'use strict';
const Hs100Api = require('hs100-api');

var express = require('express');
var router = express.Router();
var client = new Hs100Api.Client();

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', {title: 'Express'});
});

router.get('/on', function (req, res, next) {
	var plug = { host: req.query.host, port: 9999 };
	var plug = client.getPlug(plug);
	plug.setPowerState(true);;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
	res.render('blank')
});

router.get('/off', function (req, res, next) {
	var plug = {  host: req.query.host, port: 9999 };
	var plug = client.getPlug(plug);
	plug.setPowerState(false);;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
	res.render('blank')
});




module.exports = router;
