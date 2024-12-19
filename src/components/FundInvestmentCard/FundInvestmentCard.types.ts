import { Fund } from '../../api/types';

export interface FundInvestmentCardProps {
  fund: Fund;
  onSubmit: (funds: Fund[]) => void;
  onRemove: (value: Fund) => void;
  onSetAmountToFund: (fund: Fund) => void;
  multiple: boolean;
}
