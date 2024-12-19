import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useGetPreviouslySelectedFunds } from './api/hooks/getPreviouslySelectedFunds';
import { useSaveSubmittedFunds } from './api/hooks/saveSubmittedFunds';
import { mockUser } from './api/mocks';
import { Fund } from './api/types';
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

export const Selector: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [searchParams] = useSearchParams();
  const multiple = searchParams.get('multiple');
  const { saveFunds } = useSaveSubmittedFunds(mockUser);
  const getSavedFunds = useGetPreviouslySelectedFunds(mockUser, !!multiple);
  const navigate = useNavigate();

  const investedFunds: Fund[] = getSavedFunds();

  const {
    submitted,
    selectedFunds,
    onFundSelectedorSubmitted,
    setSelectedFunds,
    setSubmitted,
  } = useManageFunds();

  const onCancel = useCallback(() => {
    setShowModal(false);
    setSubmitted([]);
    setSelectedFunds([]);
  }, []);

  const onSave = useCallback(
    (funds: Fund[]) => {
      let fundsToSave = funds;

      if (funds.length === 0) {
        return;
      }
      if (multiple) {
        const fundIds = funds.map(({ id }) => id);
        const alreadySaved = investedFunds.filter(
          ({ id }) => !fundIds.includes(id)
        );
        fundsToSave = [...funds, ...alreadySaved];
      }
      saveFunds([...fundsToSave], !!multiple);
      setSelectedFunds([]);
      setSubmitted([]);
      setShowSuccess(true);
    },
    [investedFunds]
  );

  const onRemoveFund = useCallback(
    (fund: Fund) => {
      setSelectedFunds(selectedFunds.filter(({ id }) => id !== fund.id));
    },
    [selectedFunds]
  );

  useEffect(() => {
    if (!submitted.length || submitted.length !== selectedFunds.length) {
      return;
    }
    setShowModal(true);
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
          multiple={!!multiple}
        />
        {showSuccess && (
          <SuccessMessage
            multiple={!!multiple}
            onClick={() => setShowSuccess(false)}
          />
        )}
        {investedFunds.length > 0 && !showSuccess && (
          <div className='invested-funds'>
            <div>You have already selected:</div>
            <ul>
              {(investedFunds as Fund[]).map((investedFund) => {
                return (
                  <li key={investedFund.id}>
                    {investedFund.name} - £{investedFund.amount}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        <FundSelector
          multiple={!!multiple}
          investedFunds={investedFunds as Fund[]}
          onSelect={onFundSelectedorSubmitted}
          selectedFunds={selectedFunds.map(({ id }) => id)}
        />
        {selectedFunds.length > 0 && (
          <FundInvestmentCardsContainer
            onRemove={onRemoveFund}
            onSubmit={(funds) =>
              onFundSelectedorSubmitted(funds, !!multiple, true)
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
