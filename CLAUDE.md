# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a clean Express.js web server that provides REST API endpoints to control TP-Link HS100 smart plugs. It acts as a bridge between HTTP requests and the TP-Link smart plug protocol using the `hs100-api` library. Originally created to enable desktop shortcuts for lamp control.

## Development Commands

**Install dependencies:**
```bash
npm install
```

**Start the server:**
```bash
npm start
```

The server runs on port 3000 by default (configurable via `PORT` environment variable).

**Run standalone examples:**
```bash
node example.js control   # Control a specific plug
node example.js discover  # Discover all plugs on network
```

## Architecture

### Core Components

**Entry Point (bin/www):**
- Standard Express.js HTTP server bootstrap
- Listens on port 3000 (or PORT env var)
- Handles server errors and startup logging
- Uses modern ES6 const declarations throughout

**Application Setup (app.js):**
- Express application configuration
- Middleware setup (body-parser, cookie-parser, morgan logger)
- Static file serving for HTML documentation
- Centralized JSON error handling
- Simplified structure with only essential routes

**Main Router (routes/index.js):**
- Core TP-Link plug control functionality using async/await
- Creates a single shared `Hs100Api.Client` instance for all requests
- Implements four main endpoints:
  - `GET /toggle?host=<ip>` - Toggle plug (on→off or off→on) - most convenient for desktop shortcuts
  - `GET /on?host=<ip>` - Turn plug on
  - `GET /off?host=<ip>` - Turn plug off
  - `GET /status?host=<ip>` - Get plug information and current state
- All endpoints return JSON responses
- Comprehensive error handling and parameter validation
- Uses port 9999 for TP-Link plug communication (standard port)
- Toggle endpoint checks current state via `getInfo()` before switching

**Example Script (example.js):**
- Standalone script for direct plug control (doesn't require server)
- Demonstrates both direct connection and network discovery
- Configurable via command-line arguments
- Shows proper async/await error handling patterns
- Update PLUG_IP constant for your network

**Static Documentation (public/index.html):**
- Simple, self-contained HTML file with embedded CSS
- No templating engine required (removed Jade dependency)
- Provides API documentation and desktop shortcut instructions
- Served via Express static middleware

### Key Design Patterns

**Stateless API:** Each HTTP request creates a new plug instance with the host IP from query params. No state is maintained between requests, making it simple and scalable.

**Async/Await:** All plug operations use modern async/await for clean error handling and better readability.

**JSON Responses:** All API endpoints return JSON with consistent structure:
- Success: `{ success: true, host, state/info, message }`
- Error: `{ error, details, host }`

**Parameter Validation:** All endpoints validate required parameters and return 400 errors with usage instructions when parameters are missing.

**Shared Client:** The `Hs100Api.Client` instance is created once per router and reused across requests for efficiency.

## Code Quality

This codebase has been cleaned up and modernized:
- All `var` declarations replaced with `const`/`let`
- Proper async/await error handling throughout
- Removed unused routes and dependencies
- Added comprehensive parameter validation
- Consistent code style and formatting
- No code smells or quality issues

## Desktop Shortcut Usage

The primary use case is creating desktop shortcuts that make HTTP requests. The `/toggle` endpoint is recommended for this:
```
"C:\Program Files\Mozilla Firefox\firefox.exe" "http://localhost:3000/toggle?host=192.168.1.133"
```

This allows users to control smart plugs with a double-click, perfect for lamps and other devices. The toggle endpoint automatically detects the current state and switches it, so users only need one shortcut instead of separate on/off shortcuts.
