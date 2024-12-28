import { useState } from 'react';
import { Fund } from '../../api/types';

export const useManageFunds = (allFunds: Fund[]) => {
  const [selectedFunds, setSelectedFunds] = useState<Fund[]>([]);
  const [submitted, setSubmitted] = useState<Fund[]>([]);

  const onFundSelectedorSubmitted = (
    funds: Fund[],
    multiple: boolean,
    submit?: boolean
  ) => {
    const fundIds = funds.map(({ id }) => id);

    if (submit) {
      return onSubmitFund(funds, multiple, fundIds);
    }
    return onSelectFund(multiple, fundIds);
  };

  const onSelectFund = (multiple: boolean, fundIds: number[]) => {
    if (!multiple) {
      const fund = allFunds.find(({ id }) => fundIds.includes(id));
      if (fund) {
        setSelectedFunds([fund]);
      }
    } else {
      setSelectedFunds([
        ...selectedFunds,
        ...allFunds.filter(({ id }) => fundIds.includes(id)),
      ]);
    }
  };

  const onRemoveFund = (fund: Fund) => {
    setSelectedFunds(selectedFunds.filter(({ id }) => id !== fund.id));
  };

  const onSubmitFund = (
    funds: Fund[],
    multiple: boolean,
    fundIds: number[]
  ) => {
    if (!multiple) {
      return setSubmitted([funds[0]]);
    }
    if (submitted.filter(({ id }) => fundIds.includes(id))) {
      return setSubmitted([
        ...submitted.filter(({ id }) => !fundIds.includes(id)),
        ...funds,
      ]);
    }
    return setSubmitted([...submitted, ...funds]);
  };

  return {
    selectedFunds,
    submitted,
    onFundSelectedorSubmitted,
    setSelectedFunds,
    onRemoveFund,
    setSubmitted,
  };
};
