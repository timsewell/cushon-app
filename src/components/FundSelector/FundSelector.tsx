import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { mockFunds } from '../../api/mocks';
import { FundSelectorProps } from './FundSelector.types';
import { Fund } from '../../api/types';
import { useEffect, useState } from 'react';
import { isArray } from 'lodash';

export const applyInvestments = (investedFunds: Fund[], funds: Fund[]) => {
  return funds.map((fund) => {
    const invested = investedFunds.find(({ id }) => id === fund.id);

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
  const [funds, setFunds] = useState<Fund[]>(mockFunds);

  useEffect(() => {
    if (investedFunds && isArray(investedFunds)) {
      setFunds(applyInvestments(investedFunds, mockFunds));
    }
  }, [investedFunds]);
  return (
    <ListGroup className='fund-selector'>
      {funds.map((fund: Fund) => {
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
