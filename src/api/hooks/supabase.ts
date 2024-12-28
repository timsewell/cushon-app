import { useMemo } from 'react';
import { getSupabaseClient } from '../utils';

export const useSupabase = () => {
  return useMemo(() => getSupabaseClient(), []);
};
