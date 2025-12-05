import { PolymarketAPI, Trade } from './api';

export interface TradeEvent {
  wallet: string;
  event: string;
  side: string;
  stake: number;
}

export class WalletWatcher {
  private api: PolymarketAPI;
  private wallets: string[];

  constructor(wallets: string[]) {
    this.api = new PolymarketAPI();
    this.wallets = wallets;
  }

  async* stream(): AsyncGenerator<TradeEvent, void, unknown> {
    while (true) {
      for (const wallet of this.wallets) {
        try {
          const trades = await this.api.getWalletTrades(wallet);
          for (const trade of trades) {
            yield {
              wallet,
              event: trade.event_id || "",
              side: trade.outcome || "",
              stake: trade.amount || 0,
            };
          }
        } catch (error) {
          console.error(`Error fetching trades for wallet ${wallet}:`, error);
        }
      }
      await new Promise((resolve) => setTimeout(resolve, 1000)); // simple polling
    }
  }
}

