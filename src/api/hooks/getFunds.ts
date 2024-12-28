import { useSupabase } from './supabase';
import { SupabaseClient } from '@supabase/supabase-js';
import { useQuery } from '@tanstack/react-query';

export const getFunds = (supabase: SupabaseClient) => {
  return supabase
    .from('funds')
    .select()
    .then((result) => result.data);
};

export const useGetFunds = () => {
  const supabase = useSupabase();
  const queryKey = ['funds'];

  const queryFn = async () => {
    return getFunds(supabase);
  };

  return useQuery({ queryKey, queryFn });
};
