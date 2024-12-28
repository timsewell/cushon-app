import { Fund } from '../../api/types';

export interface FundInvestmentCardsContainerProps {
  funds: Fund[];
  onSubmit: (funds: Fund[]) => void;
  onRemove: (fund: Fund) => void;
  multiple: boolean;
}
