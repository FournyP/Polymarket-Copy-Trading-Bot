import { CONFIG, Config, SizingMode } from './config';

export class PositionSizer {
  private config: Config;

  constructor(config: Config = CONFIG) {
    this.config = config;
  }

  scale(traderStake: number): number {
    const mode = this.config.mode;

    if (mode === "fixed") {
      return this.config.fixed_stake;
    }

    if (mode === "proportional") {
      // Fake example for demonstration
      return traderStake * 0.5;
    }

    return this.config.fixed_stake;
  }

  applyLimits(stake: number): number {
    return Math.max(
      this.config.min_stake,
      Math.min(this.config.max_stake, stake)
    );
  }
}

