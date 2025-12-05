import axios, { AxiosInstance } from 'axios';

export interface Trade {
  event_id?: string;
  outcome?: string;
  amount?: number;
  [key: string]: any;
}

export class PolymarketAPI {
  private baseUrl: string;
  private client: AxiosInstance;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || "https://api.polymarket.com";
    this.client = axios.create({
      baseURL: this.baseUrl,
      timeout: 10000,
    });
  }

  async getWalletTrades(wallet: string): Promise<Trade[]> {
    try {
      const response = await this.client.get(`/wallet/${wallet}/activity`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching trades for wallet ${wallet}:`, error);
      throw error;
    }
  }

  async sendTrade(eventId: string, side: string, amount: number): Promise<void> {
    // Placeholder for real API trading
    console.log(`[EXECUTE] ${side.toUpperCase()} ${amount} on event ${eventId}`);
  }
}

