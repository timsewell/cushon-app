import { Fund } from '../../api/types';

export interface FundSelectorProps {
  onSelect: (value: Fund[], multiple: boolean) => void;
  selectedFunds: number[];
  investedFunds?: Fund[];
  multiple: boolean;
}
