import { createBrowserClient } from '@supabase/ssr';
import { SupabaseClient } from '@supabase/supabase-js';
import { Fund, InvestedFund } from './types';

let supabase: SupabaseClient;

export const getSupabaseClient = () => {
  if (supabase) {
    return supabase;
  }

  supabase = createBrowserClient(
    'https://vgkkdvtuxgdzvqehmlkg.supabase.co',
    import.meta.env.VITE_REACT_APP_SUPABASE_KEY as string
  );

  return supabase;
};

export const combineFunds = (invested: InvestedFund[], funds: Fund[]) => {
  return funds.map((fund) => {
    const investedData = invested.find((inv) => inv.fund_id === fund.id);

    if (investedData) {
      return { ...fund, amount: investedData.amount };
    }
    return fund;
  });
};
