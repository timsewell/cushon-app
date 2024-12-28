import { Button } from 'react-bootstrap';
import { Fund } from '../../api/types';
import { FundInvestmentCard } from '../FundInvestmentCard/FundInvestmentCard';
import { FundInvestmentCardsContainerProps } from './FundInvestmentCardsContainer.types';
import { useCallback, useEffect, useMemo, useState } from 'react';

export const FundInvestmentCardsContainer: React.FC<
  FundInvestmentCardsContainerProps
> = ({ funds, onSubmit, onRemove, multiple }) => {
  const [multipleFunds, setMultipleFunds] = useState<Fund[]>([]);

  const onSubmitFunds = useCallback((funds: Fund[]) => {
    onSubmit(funds);
  }, []);

  const onFundCardRemove = (fund: Fund) => {
    onRemove(fund);
  };

  const onSubmitMultiple = useCallback(() => {
    onSubmit(multipleFunds);
  }, [multipleFunds]);

  const onSetAmount = (fund: Fund) => {
    const newSet = multipleFunds.map((fundInState) => {
      if (fundInState.id === fund.id) {
        return { ...fundInState, amount: fund.amount || undefined };
      }
      return fundInState;
    });

    setMultipleFunds(newSet);
  };

  useEffect(() => {
    if (!funds) {
      return;
    }
    setMultipleFunds(funds);
  }, [funds]);

  const total = useMemo(
    () =>
      multipleFunds.reduce((num, fund) => {
        return num + (fund?.amount || 0);
      }, 0),
    [multipleFunds]
  );

  const combinedMultiple = multiple && funds.length > 1;

  return (
    <>
      {multipleFunds.map((fund) => {
        return (
          <FundInvestmentCard
            fund={fund}
            onSubmit={onSubmitFunds}
            onRemove={onFundCardRemove}
            multiple={combinedMultiple}
            onSetAmountToFund={onSetAmount}
            key={fund.id}
          />
        );
      })}
      {combinedMultiple && (
        <div className='multiple-submit-container'>
          {total > 0 && (
            <div>Total: {(Math.round(total * 100) / 100).toFixed(2)}</div>
          )}
          <Button
            variant='primary'
            onClick={() => onSubmitMultiple()}
            className='submit-button-multi'
          >
            Submit
          </Button>
        </div>
      )}
    </>
  );
};
