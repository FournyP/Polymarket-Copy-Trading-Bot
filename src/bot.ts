import { Config } from './config';
import { TradeExecutor } from './executor';
import { TradeInterpreter } from './interpreter';
import { RiskManager } from './risk';
import { PositionSizer } from './sizing';
import { WalletWatcher } from './watcher';

export async function startBot(config: Config, verbose: boolean = false): Promise<void> {
  const executor = new TradeExecutor(config);
  const sizer = new PositionSizer(config);
  const interpreter = new TradeInterpreter();
  const riskManager = new RiskManager();
  const watcher = new WalletWatcher(config.wallets_to_track);

  if (verbose) {
    console.log('🔍 Verbose mode enabled\n');
  }

  console.log('✅ Bot started successfully!');
  console.log('📡 Monitoring wallets for trades...\n');

  try {
    for await (const tradeEvent of watcher.stream()) {
      if (verbose) {
        console.log(`📨 Trade detected from ${tradeEvent.wallet}`);
      }

      const normalized = interpreter.normalize(tradeEvent);

      // Calculate position size
      let stake = sizer.scale(normalized.stake);
      stake = sizer.applyLimits(stake);

      // Risk check
      if (riskManager.allow(stake, 10000.0)) {
        try {
          console.log(`💰 Executing trade: ${normalized.side.toUpperCase()} $${stake.toFixed(2)} on event ${normalized.event_id}`);
          await executor.openPosition(
            normalized.event_id,
            normalized.side,
            stake
          );
          if (verbose) {
            console.log('✅ Trade executed successfully\n');
          }
        } catch (error) {
          console.error('❌ Error executing trade:', error);
        }
      } else {
        console.log(`⚠️  Trade rejected by risk manager: stake=$${stake.toFixed(2)}`);
      }
    }
  } catch (error) {
    console.error('❌ Fatal error in main loop:', error);
    throw error;
  }
}

