'use strict';

/**
 * Standalone example script for controlling TP-Link smart plugs
 * This demonstrates direct plug control without using the web server
 */

const Hs100Api = require('hs100-api');
const client = new Hs100Api.Client();

// Configuration - Update with your plug's IP address
const PLUG_IP = '192.168.1.133'; // Change this to your plug's IP address

/**
 * Example 1: Control a specific plug by IP address
 */
async function controlSpecificPlug() {
  console.log(`\n=== Controlling plug at ${PLUG_IP} ===`);

  try {
    const plug = client.getPlug({ host: PLUG_IP });

    // Get plug information
    const info = await plug.getInfo();
    console.log('Plug info:', JSON.stringify(info, null, 2));

    // Turn plug on
    console.log('Turning plug ON...');
    await plug.setPowerState(true);
    console.log('Plug is now ON');

    // Wait 2 seconds
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Turn plug off
    console.log('Turning plug OFF...');
    await plug.setPowerState(false);
    console.log('Plug is now OFF');

  } catch (error) {
    console.error('Error controlling plug:', error.message);
  }
}

/**
 * Example 2: Discover all plugs on the network
 */
function discoverPlugs() {
  console.log('\n=== Discovering plugs on network ===');

  client.startDiscovery().on('plug-new', async (plug) => {
    try {
      const info = await plug.getInfo();
      console.log('\nFound plug:', {
        alias: info.sysInfo.alias,
        host: plug.host,
        model: info.sysInfo.model,
        deviceId: info.sysInfo.deviceId
      });
    } catch (error) {
      console.error('Error getting plug info:', error.message);
    }
  });

  // Stop discovery after 10 seconds
  setTimeout(() => {
    client.stopDiscovery();
    console.log('\nDiscovery stopped');
  }, 10000);
}

// Run examples
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage:');
    console.log('  node example.js control    - Control a specific plug');
    console.log('  node example.js discover   - Discover all plugs on network');
    return;
  }

  switch (args[0]) {
    case 'control':
      await controlSpecificPlug();
      break;
    case 'discover':
      discoverPlugs();
      break;
    default:
      console.log('Unknown command:', args[0]);
  }
}

main().catch(console.error);
