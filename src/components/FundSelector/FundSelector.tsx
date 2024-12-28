import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { FundSelectorProps } from './FundSelector.types';
import { Fund } from '../../api/types';

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
