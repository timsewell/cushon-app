import { Modal, Button } from 'react-bootstrap';
import { SubmittedModalProps } from './SubmittedModal.types';

export const SubmittedModal: React.FC<SubmittedModalProps> = ({
  funds,
  onCancel,
  onSubmit,
  show,
}) => {
  const onSubmitFunds = () => {
    onSubmit(funds);
  };

  const description =
    funds.length === 1
      ? `You have selected ${funds[0].name} for an investment of £
  ${funds[0].amount}. Is this correct?`
      : 'You have opted to invest in the funds as follows:';
  return (
    <Modal show={show} className='submission-modal'>
      <Modal.Header>
        <Modal.Title>Fund Investment Selected</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {description}
        {funds.length > 1 && (
          <ul>
            {funds.map((fund) => {
              return (
                <li>
                  {fund.name} - £{fund.amount}
                </li>
              );
            })}
          </ul>
        )}
      </Modal.Body>
      <Modal.Footer className='footer'>
        <Button className='submit-button' onClick={onSubmitFunds}>
          Submit
        </Button>
        <Button className='cancel-button' onClick={onCancel}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
