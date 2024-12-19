import { Fund, User } from '../types';

export const useSaveSubmittedFunds = (user: User) => {
  const saveFunds = (funds: Fund[]) => {
    const key = funds.length > 1 ? 'multiple' + user.id : String(user.id);

    localStorage.setItem(key, JSON.stringify(funds));
  };

  return { saveFunds };
};
