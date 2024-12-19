export interface Fund {
  name: string;
  id: number;
  description: string;
  amount?: number;
}

export interface User {
  name: string;
  id: number;
  selectedFunds: {
    fund: Fund;
    investment?: number;
  }[];
}
