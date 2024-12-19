import { Fund } from '../../api/types';

export interface SubmittedModalProps {
  funds: Fund[];
  onCancel: () => void;
  onSubmit: (funds: Fund[]) => void;
  show: boolean;
}
