import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { supabase } from './supabase';

export default function WalletId({ session }) {
  const { t } = useTranslation();
  const [walletId, setWalletId] = useState('');
  const [notice, setNotice] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadWalletId() {
      if (!session?.user?.id) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('wallets')
        .select('wallet_id')
        .eq('user_id', session.user.id)
        .maybeSingle();

      if (!active) return;

      if (error) {
        setNotice('walletIdLoadFailed');
      } else if (data?.wallet_id) {
        setWalletId(data.wallet_id);
      } else {
        setNotice('No wallet was found for this account.');
      }

      setLoading(false);
    }

    loadWalletId();

    return () => {
      active = false;
    };
  }, [session?.user?.id]);

  async function copyWalletId() {
    try {
      await navigator.clipboard.writeText(walletId);
      setNotice('walletIdCopied');
    } catch {
      setNotice('walletIdManualCopy' + walletId);
    }
  }

  return (
    <section style={{
      marginTop: 18,
      padding: 20,
      background: '#fff',
      border: '1px solid #E6E0F0',
      borderRadius: 16,
    }}>
      <h3 style={{ marginTop: 0, color: '#512DA8' }}>
        {t('myWalletId')}
      </h3>

      {loading ? (
        <p>{t('loadingWalletId')}</p>
      ) : walletId ? (
        <>
          <p style={{
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: 1,
            overflowWrap: 'anywhere',
            color: '#211630',
          }}>
            {walletId}
          </p>

          <button
            type="button"
            onClick={copyWalletId}
            style={{
              padding: '11px 16px',
              background: '#512DA8',
              color: '#fff',
              border: 0,
              borderRadius: 9,
              fontWeight: 700,
            }}
          >
            {t('copyWalletId')}
          </button>

          <p>{t('shareWalletId')}</p>
        </>
      ) : null}

      {notice && (
        <p role="status" style={{ overflowWrap: 'anywhere' }}>
          {notice}
        </p>
      )}
    </section>
  );
}
