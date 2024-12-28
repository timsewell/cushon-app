import { SupabaseClient } from '@supabase/supabase-js';
import { User } from '../types';
import { useSupabase } from './supabase';
import { useQuery } from '@tanstack/react-query';

const getInvestedFunds = (
  supabase: SupabaseClient,
  userId: number,
  multiple: boolean
) => {
  return supabase
    .from('invested_funds')
    .select()
    .eq('user_id', userId)
    .eq('multiple', multiple);
};

export const useGetPreviouslySelectedFunds = (
  user: User,
  multiple: boolean
) => {
  const supabase = useSupabase();
  const queryKey = ['investedFunds'];

  const queryFn = async () => {
    return getInvestedFunds(supabase, user.id, multiple).then(
      (result) => result.data
    );
  };

  return useQuery({ queryKey, queryFn });
};
