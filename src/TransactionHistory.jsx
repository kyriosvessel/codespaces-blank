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
        .select(`
          id,
          transaction_type,
          amount,
          reason,
          balance_before,
          balance_after,
          created_at,
          sender_name,
          sender_account_number,
          sender_bank_name,
          transaction_date
        `)
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
      currency: 'USD'
    }).format(Number(value || 0));

  const dateFormat = (date) => {
    if (!date) return '—';

    const parsed = new Date(date);

    return Number.isNaN(parsed.getTime())
      ? '—'
      : parsed.toLocaleDateString('en-US', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        });
  };

  return (
    <section style={{
      marginTop: 22,
      padding: 18,
      background: '#FFFFFF',
      border: '1px solid #E9EAF2',
      borderRadius: 18,
      boxShadow: '0 4px 18px rgba(30,30,60,0.04)',
      color: '#20243A',
      fontFamily: 'Inter, Arial, sans-serif'
    }}>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
      }}>
        <div>
          <h3 style={{
            margin: 0,
            fontSize: 19,
            fontWeight: 800,
            letterSpacing: '-0.5px',
            color: '#21163F'
          }}>
            交易记录
          </h3>

          <p style={{
            margin: '5px 0 0',
            fontSize: 12,
            color: '#85899C'
          }}>
            最近的钱包活动
          </p>
        </div>

        <div style={{
          background: '#F1EDFF',
          color: '#6841C6',
          padding: '7px 11px',
          borderRadius: 20,
          fontSize: 11,
          fontWeight: 700
        }}>
          {transactions.length} RECORDS
        </div>
      </div>

      {loading && (
        <p style={{ color: '#777', fontSize: 13 }}>
          {t('loadingTransactions')}
        </p>
      )}

      {notice && (
        <p role="status" style={{ color: '#D32F2F', fontSize: 13 }}>
          {notice}
        </p>
      )}

      {!loading && !notice && transactions.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '35px 10px',
          color: '#85899C'
        }}>
          <div style={{ fontSize: 32, marginBottom: 10 }}>↗</div>
          <p style={{ fontWeight: 700 }}>
            {t('noTransactions')}
          </p>
        </div>
      )}

      {transactions.map((transaction) => {
        const received = transaction.transaction_type === 'credit';
        const sent = transaction.transaction_type === 'debit';

        const reason =
          received &&
          transaction.reason?.toLowerCase() === 'admin funds sent'
            ? ''
            : transaction.reason || 'Wallet transaction';

        const accent = received ? '#168653' : sent ? '#D94B55' : '#7651C8';

        return (
          <article
            key={transaction.id}
            style={{
              padding: '16px 0',
              borderTop: '1px solid #F0F0F5',
              overflowWrap: 'anywhere'
            }}
          >

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: 10
            }}>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 11
              }}>
                <div style={{
                  width: 40,
                  height: 40,
                  flexShrink: 0,
                  borderRadius: 13,
                  background: received ? '#E9F8F0' : sent ? '#FFF0F0' : '#F1EDFF',
                  color: accent,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 21,
                  fontWeight: 800
                }}>
                  {received ? '↓' : sent ? '↑' : '↔'}
                </div>

                <div>
                  <div style={{
                    fontSize: 14,
                    fontWeight: 800,
                    color: '#25213A'
                  }}>
                    {received ? t('received') : sent ? t('sent') : t('adjustment')}
                  </div>

                  <div style={{
                    marginTop: 4,
                    fontSize: 11,
                    color: '#9295A5'
                  }}>
                    {dateFormat(transaction.transaction_date || transaction.created_at)}
                  </div>
                </div>
              </div>

              <div style={{
                textAlign: 'right',
                flexShrink: 0
              }}>
                <div style={{
                  fontSize: 17,
                  fontWeight: 800,
                  color: accent,
                  letterSpacing: '-0.5px'
                }}>
                  {received ? '+' : sent ? '−' : ''}
                  {money(transaction.amount)}
                </div>

                <div style={{
                  fontSize: 10,
                  fontWeight: 800,
                  color: accent,
                  marginTop: 5,
                  letterSpacing: '0.6px'
                }}>
                  {received ? t("received") : sent ? t("sent") : t("adjustment")}
                </div>
              </div>
            </div>

            {reason && (
              <p style={{
                margin: '13px 0',
                fontSize: 12,
                color: '#666B7D',
                lineHeight: 1.5
              }}>
                {reason}
              </p>
            )}

            {(transaction.sender_name ||
              transaction.sender_account_number ||
              transaction.sender_bank_name) && (

              <div style={{
                marginTop: 13,
                padding: 13,
                background: '#F8F7FC',
                border: '1px solid #EEECF5',
                borderRadius: 12
              }}>

                <div style={{
                  fontSize: 10,
                  fontWeight: 800,
                  color: '#7554BB',
                  letterSpacing: '0.8px',
                  marginBottom: 10
                }}>
                  SENDER INFORMATION
                </div>

                {[
                  [t("senderName"), transaction.sender_name],
                  [t("senderBankName"), transaction.sender_bank_name],
                  [t("senderAccountNumber"), transaction.sender_account_number]
                ].filter(([, value]) => value).map(([label, value]) => (

                  <div key={label} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 12,
                    padding: '7px 0',
                    borderBottom: '1px solid #ECEAF2'
                  }}>
                    <span style={{
                      fontSize: 11,
                      color: '#85899A'
                    }}>
                      {label}
                    </span>

                    <span style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: '#29243D',
                      textAlign: 'right'
                    }}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 8,
              marginTop: 13
            }}>
              <span style={{
                fontSize: 11,
                color: '#85899A'
              }}>
                {t('balanceAfter')}
              </span>

              <strong style={{
                fontSize: 12,
                color: '#30264A'
              }}>
                {money(transaction.balance_after)}
              </strong>
            </div>

            <div style={{
              marginTop: 12,
              padding: '9px 11px',
              background: '#FAFAFC',
              borderRadius: 8,
              fontSize: 10,
              color: '#85899A',
              overflowWrap: 'anywhere'
            }}>
              <span style={{ fontWeight: 700 }}>
                {t('transactionReference')}:
              </span>{' '}
              {transaction.id}
            </div>

          </article>
        );
      })}

    </section>
  );
}
