import { useState } from 'react';
import { Fund } from '../../api/types';

export const useManageFunds = () => {
  const [selectedFunds, setSelectedFunds] = useState<Fund[]>([]);
  const [submitted, setSubmitted] = useState<Fund[]>([]);

  const onFundSelectedorSubmitted = (
    funds: Fund[],
    multiple: boolean,
    submit?: boolean
  ) => {
    const setState = submit ? setSubmitted : setSelectedFunds;
    const current = submit ? submitted : selectedFunds;
    const fundIds = funds.map(({ id }) => id);

    if (!multiple) {
      return setState([funds[0]]);
    }
    if (submit) {
      return setState([...current, ...funds]);
    }
    if (
      current.filter((selectedFund) => fundIds.includes(selectedFund.id)).length
    ) {
      return setState([
        ...current.filter((selectedFund) => !fundIds.includes(selectedFund.id)),
        ...funds,
      ]);
    }
    setState([...current, ...funds]);
  };

  return {
    selectedFunds,
    submitted,
    onFundSelectedorSubmitted,
    setSelectedFunds,
    setSubmitted,
  };
};
