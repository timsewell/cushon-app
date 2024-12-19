import { Button } from 'react-bootstrap';
import { Fund } from '../../api/types';
import { FundInvestmentCard } from '../FundInvestmentCard/FundInvestmentCard';
import { FundInvestmentCardsContainerProps } from './FundInvestmentCardsContainer.types';
import { useEffect, useState } from 'react';

export const FundInvestmentCardsContainer: React.FC<
  FundInvestmentCardsContainerProps
> = ({ funds, onSubmit, onRemove }) => {
  const [multipleFunds, setMultipleFunds] = useState<Fund[]>([]);
  const [enableButton, setEnableButton] = useState(false);

  const onSubmitFunds = (funds: Fund[]) => {
    onSubmit(funds);
  };

  const onFundCardRemove = (fund: Fund) => {
    onRemove(fund);
  };

  const onSubmitMultiple = () => {
    onSubmit(multipleFunds);
  };

  const onSetAmount = (fund: Fund) => {
    const newSet = [...multipleFunds].map((fundInState) => {
      if (fundInState.id === fund.id) {
        return { ...fundInState, amount: fund.amount || undefined };
      }
      return fundInState;
    });

    setEnableButton(newSet.every(({ amount }) => amount && amount > 0));
    setMultipleFunds(newSet);
  };

  useEffect(() => {
    if (!funds) {
      return;
    }
    setMultipleFunds(funds);
  }, [funds]);

  return (
    <>
      {multipleFunds.map((fund) => {
        return (
          <FundInvestmentCard
            fund={fund}
            onSubmit={onSubmitFunds}
            onRemove={onFundCardRemove}
            multiple={funds.length > 1}
            onSetAmountToFund={onSetAmount}
            key={fund.id}
          />
        );
      })}
      {funds.length > 1 && (
        <div className='multiple-submit-container'>
          <Button
            variant='primary'
            onClick={() => onSubmitMultiple()}
            className='submit-button-multi'
            disabled={!enableButton}
          >
            Submit
          </Button>
        </div>
      )}
    </>
  );
};
