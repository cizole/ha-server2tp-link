'use strict';

const Hs100Api = require('hs100-api');
const client = new Hs100Api.Client();
const plug = client.getPlug({host: '192.168.1.133'});
plug.getInfo().then(console.log);
plug.setPowerState(true);

// Look for plugs, log to console, and turn them on
client.startDiscovery().on('plug-new', (plug) => {
  plug.getInfo().then(console.log);
  plug.setPowerState(true);
})