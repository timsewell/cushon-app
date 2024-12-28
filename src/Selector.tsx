import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useGetPreviouslySelectedFunds } from './api/hooks/getPreviouslySelectedFunds';
import { useSaveSubmittedFunds } from './api/hooks/saveSubmittedFunds';
import { mockUser } from './api/mocks';
import { Fund, InvestedFund } from './api/types';
import { FundDescription } from './components/FundDescription/FundDescription';
import {
  FundInvestmentCardsContainer,
  FundSelector,
  Header,
  SubmittedModal,
  SuccessMessage,
} from './components';
import { useManageFunds } from './components/hooks/manageFunds';
import { Button } from 'react-bootstrap';
import { useGetFunds } from './api/hooks/getFunds';
import { combineFunds } from './api/utils';

export const Selector: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [searchParams] = useSearchParams();
  const multiple = !!searchParams.get('multiple');
  const navigate = useNavigate();
  const mutation = useSaveSubmittedFunds();

  const { data: investedFunds = [] } = useGetPreviouslySelectedFunds(
    mockUser,
    multiple
  );
  const { data: fundsFromAPI = [] } = useGetFunds();

  const fundsData: Fund[] = useMemo(
    () => combineFunds(investedFunds as InvestedFund[], fundsFromAPI as Fund[]),
    [fundsFromAPI, investedFunds]
  );

  const {
    submitted,
    selectedFunds,
    onRemoveFund,
    onFundSelectedorSubmitted,
    setSelectedFunds,
    setSubmitted,
  } = useManageFunds(fundsData);

  const onCancel = useCallback(() => {
    setShowModal(false);
    setSubmitted([]);
    setSelectedFunds([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSave = (funds: Fund[]) => {
    let fundsToSave = funds;

    const fundIds = funds.map(({ id }) => id);

    if (funds.length === 0) {
      return;
    }

    if (multiple) {
      const alreadySaved = (fundsData ?? []).filter(
        ({ amount, id }) => amount && amount > 0 && !fundIds.includes(id)
      );
      fundsToSave = [...funds, ...alreadySaved].filter(
        ({ amount }) => amount && amount > 0
      );
    }
    mutation.mutate({ funds: fundsToSave, user: mockUser, multiple: multiple });
    setSelectedFunds([]);
    setSubmitted([]);
    setShowSuccess(true);
  };

  useEffect(() => {
    if (!submitted.length || submitted.length !== selectedFunds.length) {
      return;
    }
    setShowModal(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitted]);

  return (
    <>
      <Header user={mockUser} />
      {submitted.length > 0 && (
        <SubmittedModal
          onCancel={onCancel}
          show={showModal}
          onSubmit={onSave}
          funds={submitted}
        />
      )}
      <div>
        <FundDescription
          fund={selectedFunds[selectedFunds.length - 1]}
          multiple={multiple}
        />
        {showSuccess && (
          <SuccessMessage
            multiple={multiple}
            onClick={() => setShowSuccess(false)}
          />
        )}
        {(investedFunds ?? []).length > 0 && !showSuccess && (
          <div className='invested-funds'>
            <div>You have already selected:</div>
            <ul>
              {(fundsData as Fund[])
                .map((investedFund) => {
                  if (investedFund.amount) {
                    return (
                      <li key={investedFund.id}>
                        {investedFund.name} - £{investedFund.amount}
                      </li>
                    );
                    return null;
                  }
                })
                .filter(Boolean)}
            </ul>
          </div>
        )}
        <FundSelector
          multiple={multiple}
          investedFunds={fundsData}
          onSelect={onFundSelectedorSubmitted}
          selectedFunds={selectedFunds.map(({ id }) => id)}
        />
        {selectedFunds.length > 0 && (
          <FundInvestmentCardsContainer
            multiple={multiple}
            onRemove={onRemoveFund}
            onSubmit={(funds) =>
              onFundSelectedorSubmitted(funds, multiple, true)
            }
            funds={selectedFunds}
          />
        )}
        <Button className='back-button' onClick={() => navigate('/')}>
          Back
        </Button>
      </div>
    </>
  );
};
