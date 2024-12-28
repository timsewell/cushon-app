export interface Fund {
  name: string;
  id: number;
  description: string;
  amount?: number;
  selected?: boolean;
}

export interface User {
  name: string;
  id: number;
  selectedFunds: {
    fund: Fund;
    investment?: number;
  }[];
}

export interface InvestedFund {
  id: number;
  amount: number;
  fund_id: number;
}
