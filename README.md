# TP-Link Smart Plug HTTP Controller

A simple HTTP server that provides REST API endpoints to control TP-Link HS100 smart plugs. Perfect for creating desktop shortcuts to control your lamps and other devices!

## Features

- 🔌 Control TP-Link HS100 smart plugs via simple HTTP GET requests
- 📊 Get real-time plug status and information
- 🖱️ Create desktop shortcuts for one-click lamp control
- 🚀 Lightweight Express.js server
- ✨ Clean JSON API responses with proper error handling

## Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

### Start the Server

```bash
npm start
```

The server will start on port 3000 (configurable via `PORT` environment variable).

### API Endpoints

**Toggle Plug (Recommended):**
```
GET http://localhost:3000/toggle?host=192.168.1.133
```
Automatically turns the plug on if it's off, or off if it's on. Perfect for desktop shortcuts!

**Turn Plug ON:**
```
GET http://localhost:3000/on?host=192.168.1.133
```

**Turn Plug OFF:**
```
GET http://localhost:3000/off?host=192.168.1.133
```

**Get Plug Status:**
```
GET http://localhost:3000/status?host=192.168.1.133
```

Replace `192.168.1.133` with your smart plug's IP address.

### Example Response

Toggle success:
```json
{
  "success": true,
  "host": "192.168.1.133",
  "previousState": "off",
  "newState": "on",
  "message": "Plug toggled on successfully"
}
```

On/Off success:
```json
{
  "success": true,
  "host": "192.168.1.133",
  "state": "on",
  "message": "Plug turned on successfully"
}
```

Error:
```json
{
  "error": "Failed to control plug",
  "details": "Connection timeout",
  "host": "192.168.1.133"
}
```

## Creating Desktop Shortcuts

To control your lamp with a desktop icon:

**Option 1: Toggle (Recommended)**

Single shortcut that automatically turns your lamp on or off:

1. Right-click on your desktop and select "New > Shortcut"
2. For the location, use:
   ```
   "C:\Program Files\Mozilla Firefox\firefox.exe" "http://localhost:3000/toggle?host=192.168.1.133"
   ```
   (Replace with your browser path and plug IP)
3. Name it "Toggle Lamp"
4. Set a custom icon to make it look nice!

**Option 2: Separate On/Off**

Create two shortcuts for explicit control using `/on` and `/off` endpoints.

## Standalone Usage

For direct plug control without the web server, use the example script:

```bash
# Control a specific plug
node example.js control

# Discover all plugs on your network
node example.js discover
```

Edit `example.js` to change the hardcoded IP address.

## Finding Your Plug's IP Address

1. Run the discovery script:
   ```bash
   node example.js discover
   ```
2. Check your router's DHCP client list
3. Use the TP-Link Kasa app to view device information

## Dependencies

- [express](https://expressjs.com/) - Web framework
- [hs100-api](https://github.com/plasticrake/hs100-api) - TP-Link smart plug API

## License

MIT

## Tips

- Consider setting a static IP for your smart plugs in your router's DHCP settings to prevent the IP from changing
- The server needs to be running for the desktop shortcuts to work
- You can run this server on startup by adding it to your system's startup programs
