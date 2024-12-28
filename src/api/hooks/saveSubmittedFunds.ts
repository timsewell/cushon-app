import { SupabaseClient } from '@supabase/supabase-js';
import { Fund, User } from '../types';
import { useSupabase } from './supabase';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const saveUsersFunds = async (
  client: SupabaseClient,
  options: {
    funds: Fund[];
    userId: number;
    multiple: boolean;
  }
) => {
  const deleted = await client
    .from('invested_funds')
    .delete()
    .eq('user_id', options.userId);

  if (deleted) {
    return client.from('invested_funds').insert(
      options.funds.map((fund) => ({
        fund_id: fund.id,
        user_id: options.userId,
        amount: fund.amount,
        multiple: options.multiple,
      }))
    );
  }
};

export const useSaveSubmittedFunds = () => {
  const client = useSupabase();
  const queryClient = useQueryClient();

  const mutationFn = async (params: {
    funds: Fund[];
    user: User;
    multiple: boolean;
  }) => {
    return saveUsersFunds(client, {
      funds: params.funds,
      userId: params.user.id,
      multiple: params.multiple,
    })
      .then((result) => result?.data)
      .finally(() => queryClient.refetchQueries());
  };

  return useMutation({ mutationFn });
};
