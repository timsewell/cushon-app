import { Fund, User } from '../types';

export const useSaveSubmittedFunds = (user: User) => {
  // IRL this would be an API call.
  const saveFunds = (funds: Fund[], multiple: boolean) => {
    const key = multiple ? 'multiple' + user.id : String(user.id);

    localStorage.setItem(
      key,
      JSON.stringify(funds.filter(({ amount }) => amount && amount > 0))
    );
  };

  return { saveFunds };
};
