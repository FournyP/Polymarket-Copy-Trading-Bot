# 🔁 Polymarket Copy Trading Bot (TypeScript)

This is the TypeScript implementation of the Polymarket copy trading bot - an automated trading system designed to replicate the trading strategies of successful Polymarket traders in real-time.

## Overview

This bot monitors selected Polymarket wallets in real time and **automatically mirrors their trades**.  
Perfect for users who want a **simple, fast, and reliable** copy-trading setup with the type safety and modern tooling of TypeScript.

## Features

- **Auto Copy Trading** — automatically replicates trades from target Polymarket traders
- **Risk Controls** — adjustable fetch intervals, retry limits, and timestamp filtering
- **Type Safety** — full TypeScript support with strict type checking
- **Modern Async** — uses async/await and async generators for clean code
- **Simple Configuration** — all settings managed through environment variables

## Prerequisites

- Node.js 18+ (install from [nodejs.org](https://nodejs.org/))
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd polymarket-copy-trading-bot
```

2. Install dependencies:
```bash
npm install
```

3. Copy the example environment file:
```bash
cp .env.example .env
```

4. Edit `.env` and add your configuration:
```env
POLYMARKET_API=https://api.polymarket.com
OPENAI_API_KEY=your_openai_api_key_here
```

## Building

Build the TypeScript code:
```bash
npm run build
```

This will compile TypeScript to JavaScript in the `dist/` directory.

## Running

Run the bot:
```bash
npm start
```

Or run in development mode (with ts-node):
```bash
npm run dev
```

Watch mode (auto-rebuild on changes):
```bash
npm run watch
```

## Configuration

The bot can be configured through environment variables or by modifying `src/config.ts`. Key settings include:

- `wallets_to_track`: Array of wallet addresses to monitor
- `mode`: Sizing mode - "fixed" or "proportional"
- `fixed_stake`: Fixed stake amount (for Fixed mode)
- `min_stake` / `max_stake`: Position size limits
- `profit_take_percent`: Auto-close position at this profit percentage

## Architecture

```
+------------------------------+
|      Wallet Watcher           |
|  Real-time wallet tracking   |
+--------------+---------------+
|
v
+------------------------------+
|     Trade Interpreter         |
| Detect event, direction, $    |
+--------------+---------------+
|
v
+------------------------------+
|     Position Sizing Engine   |
| Scale or fixed allocation    |
+--------------+---------------+
|
v
+------------------------------+
|       Trade Executor         |
| Market/limit execution       |
+--------------+---------------+
|
v
Polymarket API
```

## Project Structure

```
polymarket-copy-trading-bot/
│
├── src/
│   ├── main.ts           # Entry point
│   ├── config.ts         # Configuration management
│   ├── api.ts            # Polymarket API client
│   ├── polymarket_api.ts # Market data API
│   ├── watcher.ts        # Wallet monitoring
│   ├── interpreter.ts    # Trade normalization
│   ├── sizing.ts         # Position sizing
│   ├── executor.ts       # Trade execution
│   ├── risk.ts           # Risk management
│   ├── strategy.ts       # Trading strategies
│   └── agent.ts          # AI event analysis
│
├── dist/                 # Compiled JavaScript (generated)
├── package.json          # Node.js dependencies
├── tsconfig.json         # TypeScript configuration
├── .env.example          # Environment template
└── README_TYPESCRIPT.md  # This file
```

## Dependencies

- **axios**: HTTP client for API requests
- **openai**: OpenAI SDK for event analysis
- **dotenv**: Environment variable management
- **typescript**: TypeScript compiler
- **ts-node**: TypeScript execution for development

## Development

Run tests (if you add them):
```bash
npm test
```

Type check:
```bash
npx tsc --noEmit
```

Lint (if you add ESLint):
```bash
npm run lint
```

Format code (if you add Prettier):
```bash
npm run format
```

## Migration from Python

This TypeScript version maintains the same architecture and functionality as the Python version:
- All modules have been converted to TypeScript equivalents
- Async/await patterns preserved using native JavaScript async
- Type safety enforced at compile time
- Error handling improved with TypeScript's type system
- Modern ES modules for better tree-shaking

## Key Differences from Python

1. **Type System**: Full TypeScript types instead of Python type hints
2. **Async**: Native async/await and async generators instead of asyncio
3. **HTTP**: axios instead of httpx/requests
4. **Data**: Native JavaScript objects instead of pandas DataFrames
5. **Environment**: dotenv package instead of python-dotenv

## Performance

TypeScript/Node.js implementation provides:
- Fast startup time
- Good async performance with Node.js event loop
- Type safety at compile time
- Easy deployment with single executable (using pkg or similar)

## License

MIT License

---

`Copy trades fast. Copy trades directly. No extra logic — just pure mirroring`

