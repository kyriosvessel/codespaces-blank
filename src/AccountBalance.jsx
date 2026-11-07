import { useEffect, useState } from 'react';
import { supabase } from './supabase';
import { useTranslation } from 'react-i18next';

export default function AccountBalance({ session }) {
  const { t } = useTranslation();
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadBalance() {
      if (!session?.user?.id) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('wallets')
        .select('balance, currency')
        .eq('user_id', session.user.id);

      if (!active) return;

      if (error) {
        setError('Unable to load your balance.');
      } else {
        setWallets(data || []);
      }
      setLoading(false);
    }

    loadBalance();
    return () => { active = false; };
  }, [session?.user?.id]);

  return (
    <section className="kyrios-balance-card">
      <p className="kyrios-balance-label">{t('balance')}</p>
      {loading ? (
        <h2>{t('loading')}</h2>
      ) : error ? (
        <p role="alert">{error}</p>
      ) : wallets.length === 0 ? (
        <p>{t('noWallet')}</p>
      ) : (
        wallets.map((wallet, index) => (
          <div key={wallet.currency + index}>
            <h2 className="kyrios-balance-amount">
              {wallet.currency} {Number(wallet.balance).toLocaleString(
                undefined,
                { minimumFractionDigits: 2, maximumFractionDigits: 2 }
              )}
            </h2>
          </div>
        ))
      )}
      <p className="kyrios-balance-footer">{t('account')}</p>
    </section>
  );
}
