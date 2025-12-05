# CLI Usage Guide

The Polymarket Copy Trading Bot comes with a user-friendly command-line interface (CLI) for easy configuration and management.

## Quick Start

1. **Initialize the bot** (first time only):
   ```bash
   npm run cli init
   ```

2. **Add wallets to track**:
   ```bash
   npm run cli wallets add 0x1234567890abcdef...
   ```

3. **Configure settings**:
   ```bash
   npm run cli config --mode fixed --stake 25
   ```

4. **Start the bot**:
   ```bash
   npm run cli start
   ```

## Commands

### `init`
Initialize bot configuration (creates `config.json` file).

```bash
npm run cli init
```

### `start`
Start the copy trading bot.

```bash
npm run cli start
npm run cli start --verbose  # Enable verbose logging
```

**Options:**
- `-v, --verbose` - Enable verbose logging

### `config`
Configure bot settings.

```bash
# View current configuration
npm run cli config

# Set sizing mode
npm run cli config --mode fixed
npm run cli config --mode proportional

# Set fixed stake amount
npm run cli config --stake 50

# Set stake limits
npm run cli config --min-stake 10 --max-stake 500

# Set profit take percentage
npm run cli config --profit 25
```

**Options:**
- `-m, --mode <mode>` - Sizing mode: `fixed` or `proportional`
- `-s, --stake <amount>` - Fixed stake amount
- `--min-stake <amount>` - Minimum stake amount
- `--max-stake <amount>` - Maximum stake amount
- `-p, --profit <percent>` - Profit take percentage

### `wallets`
Manage wallets to track.

#### List wallets
```bash
npm run cli wallets list
npm run cli wallets ls  # Alias
```

#### Add wallet
```bash
npm run cli wallets add 0x1234567890abcdef...
```

#### Remove wallet
```bash
npm run cli wallets remove 0x1234567890abcdef...
npm run cli wallets rm 0x1234567890abcdef...  # Alias
```

### `status`
Show bot status and current configuration.

```bash
npm run cli status
```

## Examples

### Complete Setup Example

```bash
# 1. Initialize
npm run cli init

# 2. Add wallets
npm run cli wallets add 0xABC123...
npm run cli wallets add 0xDEF456...

# 3. Configure
npm run cli config --mode fixed --stake 25 --profit 20

# 4. Check status
npm run cli status

# 5. Start bot
npm run cli start
```

### Change Configuration

```bash
# Switch to proportional mode
npm run cli config --mode proportional

# Update stake limits
npm run cli config --min-stake 10 --max-stake 200

# Change profit target
npm run cli config --profit 30
```

### Manage Wallets

```bash
# List all tracked wallets
npm run cli wallets list

# Add a new wallet
npm run cli wallets add 0xNEW789...

# Remove a wallet
npm run cli wallets remove 0xOLD123...
```

## Configuration File

The bot saves configuration to `config.json` in the project root. You can also edit this file directly:

```json
{
  "wallets_to_track": [
    "0x1234567890abcdef...",
    "0xabcdefabcdef12345..."
  ],
  "mode": "fixed",
  "fixed_stake": 25,
  "min_stake": 5,
  "max_stake": 300,
  "profit_take_percent": 20,
  "api_base": "https://api.polymarket.com"
}
```

## Tips

- Use `--help` with any command to see detailed options:
  ```bash
  npm run cli start --help
  npm run cli config --help
  ```

- The `config.json` file is automatically created when you run `init` or modify settings
- Configuration is persistent across bot restarts
- Always check `status` before starting to verify your configuration

