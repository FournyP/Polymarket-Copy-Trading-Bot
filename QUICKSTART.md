# Quick Start Guide

## Installation

1. **Install Node.js** (if not already installed)
   - Download from [nodejs.org](https://nodejs.org/)
   - Requires Node.js 18 or higher

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Create a `.env` file in the root directory
   - Add your configuration:
     ```env
     POLYMARKET_API=https://api.polymarket.com
     OPENAI_API_KEY=your_openai_api_key_here
     ```

4. **Configure wallets to track**
   - Edit `src/config.ts` and update the `wallets_to_track` array with actual wallet addresses

## Running the Bot

### Development Mode (with hot reload)
```bash
npm run dev
```

### Production Mode
```bash
# Build the TypeScript code
npm run build

# Run the compiled JavaScript
npm start
```

### Watch Mode (auto-rebuild on changes)
```bash
npm run watch
```

## Project Structure

```
src/
├── main.ts           # Main entry point
├── config.ts         # Configuration
├── api.ts            # Polymarket API client
├── polymarket_api.ts # Market data API
├── watcher.ts        # Wallet monitoring
├── interpreter.ts    # Trade normalization
├── sizing.ts         # Position sizing
├── executor.ts       # Trade execution
├── risk.ts           # Risk management
├── strategy.ts       # Trading strategies
└── agent.ts          # AI event analysis
```

## Configuration

Edit `src/config.ts` to customize:

- `wallets_to_track`: Array of wallet addresses to monitor
- `mode`: "fixed" or "proportional" sizing
- `fixed_stake`: Fixed stake amount (for fixed mode)
- `min_stake` / `max_stake`: Position size limits
- `profit_take_percent`: Auto-close at this profit percentage

## Troubleshooting

### TypeScript compilation errors
```bash
# Check for type errors
npx tsc --noEmit
```

### Module not found errors
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Environment variables not loading
- Make sure `.env` file exists in the root directory
- Check that `dotenv` is properly imported in `main.ts`

## Next Steps

1. Complete the Polymarket API integration in `src/api.ts`
2. Add proper error handling and retry logic
3. Implement logging (Winston, Pino, etc.)
4. Add unit tests (Jest, Vitest)
5. Set up database for trade history (optional)

