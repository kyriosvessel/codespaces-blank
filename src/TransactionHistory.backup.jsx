import { useEffect, useState } from 'react';
import { supabase } from './supabase';
import { useTranslation } from 'react-i18next';
import './customerTransactionTranslations';

export default function TransactionHistory({ session }) {
const { t } = useTranslation();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    let active = true;

    async function loadTransactions() {
      if (!session?.user?.id) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('wallet_transactions')
        .select('id, transaction_type, amount, reason, balance_before, balance_after, created_at, sender_name, sender_account_number, sender_bank_name, transaction_date')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })
        .limit(50);

      if (!active) return;

      if (error) {
        setNotice('Could not load transaction history.');
      } else {
        setTransactions(data || []);
      }

      setLoading(false);
    }

    loadTransactions();

    return () => {
      active = false;
    };
  }, [session?.user?.id]);

  const money = (value) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(Number(value || 0));

  return (
    <section style={{
      marginTop: 18,
      padding: 20,
      background: '#fff',
      border: '1px solid #E6E0F0',
      borderRadius: 16,
    }}>
      <h3 style={{ marginTop: 0, color: '#512DA8' }}>
        交易记录
      </h3>

      {loading && <p>{t('loadingTransactions')}</p>}
      {notice && <p role="status">{notice}</p>}

      {!loading && !notice && transactions.length === 0 && (
        <p>{t('noTransactions')}</p>
      )}

      {transactions.map((transaction) => (
        <article
          key={transaction.id}
          style={{
            padding: '14px 0',
            borderBottom: '1px solid #E6E0F0',
            overflowWrap: 'anywhere',
          }}
        >
          <strong style={{ color: '#211630' }}>
            {transaction.transaction_type === 'credit'
              ? <>✅ {t('received')}</>
              : transaction.transaction_type === 'debit'
              ? t('sent')
              : t('adjustment')}
          </strong>

          <p style={{ margin: '6px 0', fontWeight: 700 }}>
            {money(transaction.amount)}
          </p>

          <p style={{ margin: '5px 0', fontSize: 13 }}>
            {transaction.transaction_type === 'credit' && transaction.reason?.toLowerCase() === 'admin funds sent' ? null : transaction.reason || 'Wallet transaction'}
{transaction.sender_name && <p>{t('senderName')}: {transaction.sender_name}</p>}
{transaction.sender_account_number && <p>{t('senderAccountNumber')}: {transaction.sender_account_number}</p>}
{transaction.sender_bank_name && <p>{t('senderBankName')}: {transaction.sender_bank_name}</p>}

          </p>

          <p style={{ margin: '5px 0', fontSize: 12, color: '#77718B' }}>
            {t('transactionDate')}: {new Date(transaction.transaction_date || transaction.created_at).toLocaleDateString()}
          </p>

          <p style={{ margin: '5px 0', fontSize: 13 }}>
            {t('balanceAfter')}: {money(transaction.balance_after)}
          </p>
        
<p className="easy-transaction-reference">
  {t('transactionReference')}: {transaction.id}
</p>

</article>

      ))}
    </section>
  );
}
