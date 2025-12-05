import { PolymarketAPI } from './api';
import { CONFIG, Config } from './config';

export interface Position {
  side: string;
  stake: number;
  entry_price: number;
}

export class TradeExecutor {
  private api: PolymarketAPI;
  private positions: Map<string, Position>;
  private config: Config;

  constructor(config: Config = CONFIG) {
    this.api = new PolymarketAPI(config.api_base);
    this.positions = new Map();
    this.config = config;
  }

  async openPosition(
    eventId: string,
    side: string,
    stake: number
  ): Promise<void> {
    await this.api.sendTrade(eventId, side, stake);
    this.positions.set(eventId, {
      side,
      stake,
      entry_price: 0.0, // placeholder
    });
  }

  async closeOnProfit(eventId: string, currentPrice: number): Promise<void> {
    const pos = this.positions.get(eventId);
    if (!pos) {
      return;
    }

    const entry = pos.entry_price;
    const pct = entry > 0 ? ((currentPrice - entry) / entry) * 100 : 0;

    if (pct >= this.config.profit_take_percent) {
      console.log(
        `[PROFIT TAKE] Closing ${eventId} at +${pct.toFixed(2)}%`
      );
      await this.api.sendTrade(eventId, "sell", pos.stake);
      this.positions.delete(eventId);
    }
  }
}

