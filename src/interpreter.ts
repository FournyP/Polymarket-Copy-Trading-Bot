import { TradeEvent } from './watcher';

export interface NormalizedTrade {
  wallet: string;
  event_id: string;
  side: string;
  stake: number;
}

export class TradeInterpreter {
  normalize(trade: TradeEvent): NormalizedTrade {
    return {
      wallet: trade.wallet,
      event_id: trade.event,
      side: trade.side,
      stake: parseFloat(trade.stake.toString()),
    };
  }
}

