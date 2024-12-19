import React, { ChangeEvent, useState } from 'react';
import { FundInvestmentCardProps } from './FundInvestmentCard.types';
import { Button, Form } from 'react-bootstrap';

export const FundInvestmentCard: React.FC<FundInvestmentCardProps> = ({
  onSubmit,
  fund,
  onRemove,
  multiple,
  onSetAmountToFund,
}) => {
  const [amount, setAmount] = useState(0);

  const onSetAmount = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (multiple) {
      return onSetAmountToFund({ ...fund, amount: Number(value) });
    }
    setAmount(Number(value));
  };

  const onSubmitInvestment = () => {
    onSubmit([{ ...fund, amount }]);
  };

  const onRemoveFund = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
    onRemove(fund);
  };

  return (
    <div className='fund-investment-card'>
      <span className='layout'>
        {fund.name}
        <span className='input'>
          £
          <Form.Control
            type='number'
            placeholder='Amount...'
            onChange={onSetAmount}
            value={fund.amount}
          />
        </span>
      </span>
      <span className='controls'>
        {multiple && (
          <a href='#' title='Remove' onClick={onRemoveFund}>
            X
          </a>
        )}
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
