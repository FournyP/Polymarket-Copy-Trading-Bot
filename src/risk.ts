/**
 * Simple rule-based risk filters
 */
export class RiskManager {
  allow(stake: number, liquidity: number = 10000): boolean {
    if (stake < 5) {
      return false;
    }
    if (stake > 500) {
      return false;
    }
    if (liquidity < 1000) {
      return false;
    }
    return true;
  }
}

