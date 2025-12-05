// Global configuration for the Polymarket Copy Trading Bot

export type SizingMode = "fixed" | "proportional";

export interface Config {
  wallets_to_track: string[];
  mode: SizingMode;
  fixed_stake: number;
  min_stake: number;
  max_stake: number;
  profit_take_percent: number;
  api_base: string;
}

export const CONFIG: Config = {
  wallets_to_track: [
    "0x1234567890abcdef...",
    "0xabcdefabcdef12345..."
  ],
  mode: "fixed",
  fixed_stake: 25,
  min_stake: 5,
  max_stake: 300,
  profit_take_percent: 20, // auto-close at +X% profit
  api_base: "https://api.polymarket.com",
};

export function loadConfig(): Config {
  // Try to load from config.json file (managed by CLI)
  // For now, return default
  return { ...CONFIG };
}

