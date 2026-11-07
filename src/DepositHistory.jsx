import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from './supabase';

export default function DepositHistory({ session }) {
const { t } = useTranslation();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadHistory() {
      if (!session?.user?.id) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('deposit_requests')
        .select('id, amount, currency, payment_method, status, created_at')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (error) {
        setError('Unable to load deposit history.');
      } else {
        setRequests(data || []);
      }

      setLoading(false);
    }

    loadHistory();
  }, [session]);

  return (
    <section className="wallet-card">
      <h2>{t('depositHistory')}</h2>

      {loading && <p>{t('loadingDepositHistory')}</p>}
      {error && <p>{error}</p>}

      {!loading && !error && requests.length === 0 && (
        <p>{t('noDepositRequests')}</p>
      )}

      {requests.map((request) => (
        <div key={request.id} className="transaction-item">
          <p><strong>{t('amountLabelHistory')}</strong> {request.currency} {Number(request.amount).toFixed(2)}</p>
          <p><strong>{t('methodLabel')}</strong> {request.payment_method}</p>
          <p>
            <strong>{t('statusLabel')}</strong>{' '}
            <span className={`deposit-status status-${t('status_' + request.status, request.status)}`}>
              {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
            </span>
          </p>
          <small>{new Date(request.created_at).toLocaleString()}</small>
          <hr />
        </div>
      ))}
    </section>
  );
}
