'use strict';
const Hs100Api = require('hs100-api');
const express = require('express');
const path = require('path');
const router = express.Router();
const client = new Hs100Api.Client();

// GET home page with API documentation
router.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Turn plug ON
router.get('/on', async function (req, res) {
	const host = req.query.host;

	if (!host) {
		return res.status(400).json({
			error: 'Missing required parameter: host',
			usage: '/on?host=192.168.1.X'
		});
	}

	try {
		const plug = client.getPlug({ host: host, port: 9999 });
		await plug.setPowerState(true);
		res.json({
			success: true,
			host: host,
			state: 'on',
			message: 'Plug turned on successfully'
		});
	} catch (error) {
		res.status(500).json({
			error: 'Failed to control plug',
			details: error.message,
			host: host
		});
	}
});

// Turn plug OFF
router.get('/off', async function (req, res) {
	const host = req.query.host;

	if (!host) {
		return res.status(400).json({
			error: 'Missing required parameter: host',
			usage: '/off?host=192.168.1.X'
		});
	}

	try {
		const plug = client.getPlug({ host: host, port: 9999 });
		await plug.setPowerState(false);
		res.json({
			success: true,
			host: host,
			state: 'off',
			message: 'Plug turned off successfully'
		});
	} catch (error) {
		res.status(500).json({
			error: 'Failed to control plug',
			details: error.message,
			host: host
		});
	}
});

// Get plug info and current state
router.get('/status', async function (req, res) {
	const host = req.query.host;

	if (!host) {
		return res.status(400).json({
			error: 'Missing required parameter: host',
			usage: '/status?host=192.168.1.X'
		});
	}

	try {
		const plug = client.getPlug({ host: host, port: 9999 });
		const info = await plug.getInfo();
		res.json({
			success: true,
			host: host,
			info: info
		});
	} catch (error) {
		res.status(500).json({
			error: 'Failed to get plug info',
			details: error.message,
			host: host
		});
	}
});

// Toggle plug power state
router.get('/toggle', async function (req, res) {
	const host = req.query.host;

	if (!host) {
		return res.status(400).json({
			error: 'Missing required parameter: host',
			usage: '/toggle?host=192.168.1.X'
		});
	}

	try {
		const plug = client.getPlug({ host: host, port: 9999 });

		// Get current power state
		const info = await plug.getInfo();
		const currentState = info.sysInfo.relay_state === 1;
		const newState = !currentState;

		// Toggle to opposite state
		await plug.setPowerState(newState);

		res.json({
			success: true,
			host: host,
			previousState: currentState ? 'on' : 'off',
			newState: newState ? 'on' : 'off',
			message: `Plug toggled ${newState ? 'on' : 'off'} successfully`
		});
	} catch (error) {
		res.status(500).json({
			error: 'Failed to toggle plug',
			details: error.message,
			host: host
		});
	}
});

module.exports = router;
