import React, { ChangeEvent, useCallback, useState } from 'react';
import { FundInvestmentCardProps } from './FundInvestmentCard.types';
import { Button, Form } from 'react-bootstrap';

export const FundInvestmentCard: React.FC<FundInvestmentCardProps> = ({
  onSubmit,
  fund,
  onRemove,
  multiple,
  onSetAmountToFund,
}) => {
  const [amount, setAmount] = useState(fund.amount);

  const onSetAmount = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (multiple) {
      setAmount(Number(value));
      return onSetAmountToFund({ ...fund, amount: Number(value) });
    }
    setAmount(Number(value));
  }, []);

  const onSubmitInvestment = useCallback(() => {
    onSubmit([{ ...fund, amount }]);
  }, [fund, amount]);

  const onRemoveFund = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
    onRemove(fund);
  }, []);

  return (
    <div className='fund-investment-card'>
      <span className='layout'>
        {fund.name}
        <span className='input'>
          £
          <Form.Control
            type='text'
            placeholder='Amount...'
            onChange={onSetAmount}
            value={amount || ''}
          />
        </span>
      </span>
      <span className='controls'>
        <a href='#' title='Remove' onClick={onRemoveFund}>
          X
        </a>
        {!multiple && (
          <Button
            variant='primary'
            onClick={onSubmitInvestment}
            className='submit-button'
            disabled={amount === 0}
          >
            Submit
          </Button>
        )}
      </span>
    </div>
  );
};
