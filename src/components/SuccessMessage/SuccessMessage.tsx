import { Button } from 'react-bootstrap';
import { SuccessMessageProps } from './SuccessMessage.types';

export const SuccessMessage: React.FC<SuccessMessageProps> = ({
  multiple,
  onClick,
}) => {
  const fund = multiple ? 'funds have' : 'fund has';

  return (
    <div className='success-message'>
      <h3>Success!</h3>
      Your selected {fund} been saved.
      <div className='button-container'>
        <Button className='submit-button' onClick={onClick}>
          OK
        </Button>
      </div>
    </div>
  );
};
