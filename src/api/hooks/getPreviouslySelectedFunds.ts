import { User } from '../types';

export const useGetPreviouslySelectedFunds = (
  user: User,
  multiple: boolean
) => {
  const getSavedFunds = () => {
    const key = multiple ? 'multiple' + user.id : String(user.id);

    const item = localStorage.getItem(key);

    if (item) {
      return Array.from(JSON.parse(item));
    }
    return [];
  };

  return getSavedFunds;
};
