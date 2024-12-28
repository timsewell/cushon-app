import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { FundSelectorProps } from './FundSelector.types';
import { Fund, InvestedFund } from '../../api/types';

export const applyInvestments = (
  investedFunds: InvestedFund[],
  funds: Fund[]
) => {
  return funds.map((fund) => {
    const invested = investedFunds.find(({ fund_id }) => fund_id === fund.id);

    if (invested) {
      return { ...fund, amount: invested.amount };
    }
    return fund;
  });
};

export const FundSelector: React.FC<FundSelectorProps> = ({
  selectedFunds,
  investedFunds,
  onSelect,
  multiple,
}) => {
  return (
    <ListGroup className='fund-selector'>
      {investedFunds &&
        (investedFunds as Fund[]).map((fund: Fund) => {
          return (
            <ListGroupItem
              active={selectedFunds.includes(fund.id)}
              action
              onClick={() => onSelect([fund], multiple)}
              key={fund.id}
            >
              {fund.name}
            </ListGroupItem>
          );
        })}
    </ListGroup>
  );
};
