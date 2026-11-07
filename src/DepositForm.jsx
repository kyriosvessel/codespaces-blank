import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from './supabase';

export default function DepositForm({ session }) {
  const { t } = useTranslation();


  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('bank_transfer');
  const [reference, setReference] = useState('');
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState('');
  const [requests, setRequests] = useState([]);

  async function loadRequests() {
    const { data, error } = await supabase
      .from('deposit_requests')
      .select('id, amount, currency, payment_method, payment_reference, status, created_at')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false });

    if (error) {
      setNotice(error.message);
      return;
    }

    setRequests(data || []);
  }

  async function submitDeposit(event) {
    event.preventDefault();
    setNotice('');

    const value = Number(amount);

    if (!Number.isFinite(value) || value <= 0) {
      setNotice('Enter a valid deposit amount greater than zero.');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from('deposit_requests')
        .insert({
          user_id: session.user.id,
          amount: value,
          currency: 'USD',
          payment_method: paymentMethod,
          payment_reference: reference.trim() || null
        });

      if (error) throw error;

      setNotice('depositSubmittedNotice');
      setAmount('');
      setReference('');
      await loadRequests();
    } catch (error) {
      setNotice(error.message || 'Could not submit your deposit request.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section style={{
      marginTop: 18,
      background: '#fff',
      padding: 22,
      borderRadius: 18,
      color: '#21163D'
    }}>
      <h2>{t('makeDeposit')}</h2>
      <p>{t('depositInstruction')}</p>

      <form onSubmit={submitDeposit}>
        <label style={{ display: 'block', marginBottom: 14 }}>
          {t('depositAmount')} (USD $)
          <input
            type="number"
            min="1"
            step="0.01"
            required
            value={amount}
            onChange={event => setAmount(event.target.value)}
            style={{
              display: 'block',
              width: '100%',
              boxSizing: 'border-box',
              padding: 12,
              marginTop: 7,
              border: '1px solid #E6E0F0',
              borderRadius: 10
            }}
          />
        </label>

        <label style={{ display: 'block', marginBottom: 14 }}>
          {t('paymentMethod')}
          <select
            value={paymentMethod}
            onChange={event => setPaymentMethod(event.target.value)}
            style={{
              display: 'block',
              width: '100%',
              padding: 12,
              marginTop: 7,
              border: '1px solid #E6E0F0',
              borderRadius: 10,
              background: '#fff',
              color: '#21163D'
            }}
          >
            <option value="bank_transfer">{t('bank转账')}</option>
            <option value="card">{t('cardPayment')}</option>
            <option value="other">{t('otherPayment')}</option>
          </select>
        </label>

        <label style={{ display: 'block', marginBottom: 16 }}>
          {t('paymentReferenceOptional')}
          <input
            type="text"
            maxLength={120}
            value={reference}
            onChange={event => setReference(event.target.value)}
            placeholder="{t('paymentReference')}"
            style={{
              display: 'block',
              width: '100%',
              boxSizing: 'border-box',
              padding: 12,
              marginTop: 7,
              border: '1px solid #E6E0F0',
              borderRadius: 10
            }}
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: 14,
            border: 0,
            borderRadius: 10,
            background: '#512DA8',
            color: '#fff',
            fontWeight: 700
          }}
        >
          {loading ? t('submitting') : t('submitDepositRequest')}
        </button>
      </form>

      {notice && (
        <p role="status" style={{
          marginTop: 15,
          padding: 12,
          background: '#F0EBFF',
          borderRadius: 9,
          overflowWrap: 'anywhere'
        }}>
          {notice}
        </p>
      )}

      <button
        type="button"
        onClick={loadRequests}
        style={{
          marginTop: 18,
          padding: 10,
          borderRadius: 9,
          border: '1px solid #E6E0F0',
          background: '#fff'
        }}
      >
        {t('viewMyDepositRequests')}
      </button>

      {requests.map(request => (
        <div key={request.id} style={{
          marginTop: 12,
          padding: 12,
          border: '1px solid #E6E0F0',
          borderRadius: 10,
          overflowWrap: 'anywhere'
        }}>
          <strong>{request.currency} {Number(request.amount).toFixed(2)}</strong>
          <p>{t('statusLabel')}: {t('status_' + request.status, request.status)}</p>
          <p>Method: {request.payment_method.replace('_', ' ')}</p>
          <small>{new Date(request.created_at).toLocaleString()}</small>
        </div>
      ))}
    </section>
  );
}
