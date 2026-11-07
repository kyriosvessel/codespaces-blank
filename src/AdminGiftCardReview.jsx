import { useEffect, useState } from 'react';
import { supabase } from './supabase';

export default function AdminGiftCardReview({ session }) {
  const [records, setRecords] = useState([]);
  const [notes, setNotes] = useState({});
  const [payments, setPayments] = useState({});
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState('');

  async function loadRecords() {
    const { data, error } = await supabase
      .from('gift_card_redemptions')
      .select('*')
      .order('submitted_at', { ascending: false });

    if (error) setNotice(error.message);
    else setRecords(data || []);
  }

  useEffect(() => {
    loadRecords();
  }, []);

  function paymentField(id, field, value) {
    setPayments(prev => ({
      ...prev,
      [id]: { ...prev[id], [field]: value }
    }));
  }

  async function openImage(path) {
    const { data, error } = await supabase.storage
      .from('gift-card-images')
      .createSignedUrl(path, 60);

    if (error) {
      setNotice(error.message);
      return;
    }
    window.open(data.signedUrl, '_blank');
  }

  async function review(record, status) {
    const note = String(notes[record.id] || '').trim();
    const payment = payments[record.id] || {};

    if (status === 'rejected' && !note) {
      setNotice('Enter a reason before rejecting this gift card.');
      return;
    }

    if (status === 'approved') {
      if (!payment.method || !payment.from?.trim() ||
          !payment.amount || Number(payment.amount) <= 0 ||
          !payment.reference?.trim()) {
        setNotice('Enter payment method, sender, amount and reference before approval.');
        return;
      }
    }

    setBusy(record.id);
    setNotice('');

    const updateData = {
      status,
      admin_note: note || null,
      reviewed_at: new Date().toISOString(),
      reviewed_by: session.user.id
    };

    if (status === 'approved') {
      Object.assign(updateData, {
        payment_method: payment.method,
        payment_from: payment.from.trim(),
        payment_amount: Number(payment.amount),
        payment_reference: payment.reference.trim(),
        payment_confirmed_at: new Date().toISOString()
      });
    }

    const { error } = await supabase
      .from('gift_card_redemptions')
      .update(updateData)
      .eq('id', record.id)
      .eq('status', 'pending');

    setBusy('');

    if (error) {
      setNotice(error.message);
      return;
    }

    setNotice('Gift card review saved.');
    await loadRecords();
  }

  return (
    <section className="easy-admin-gifts">
      <h2>Gift Card Submissions</h2>
      {notice && <p role="status">{notice}</p>}
      <button type="button" onClick={loadRecords}>Refresh Submissions</button>

      {records.length === 0 && <p>No gift card submissions yet.</p>}

      {records.map(record => (
        <article key={record.id} className="easy-gift-record">
          <h3>{record.brand}</h3>
          <p>Country: {record.country_code}</p>
          <p>Value: {record.currency_code} {Number(record.denomination).toFixed(2)}</p>
          <p>Card reference: {record.redemption_reference}</p>
          <p>Customer account: {record.user_id}</p>
          <p>Status: <strong>{record.status}</strong></p>
          <p>Submitted: {new Date(record.submitted_at).toLocaleString()}</p>

          {record.image_path && (
            <button type="button" onClick={() => openImage(record.image_path)}>
              View Gift Card Picture
            </button>
          )}

          {record.status === 'pending' && (
            <>
              <h4>Payment Verification</h4>

              <select
                value={payments[record.id]?.method || ''}
                onChange={e => paymentField(record.id, 'method', e.target.value)}
              >
                <option value="">Select payment method</option>
                <option value="Bank 转账">Bank 转账</option>
                <option value="Mobile Money">Mobile Money</option>
                <option value="Other">Other</option>
              </select>

              <input
                placeholder="Payment sender / source"
                value={payments[record.id]?.from || ''}
                onChange={e => paymentField(record.id, 'from', e.target.value)}
              />

              <input
                type="number"
                min="0.01"
                step="0.01"
                placeholder="Amount received"
                value={payments[record.id]?.amount || ''}
                onChange={e => paymentField(record.id, 'amount', e.target.value)}
              />

              <input
                placeholder="Payment reference"
                value={payments[record.id]?.reference || ''}
                onChange={e => paymentField(record.id, 'reference', e.target.value)}
              />

              <textarea
                placeholder="Admin note or rejection reason"
                value={notes[record.id] || ''}
                onChange={e => setNotes(prev => ({
                  ...prev, [record.id]: e.target.value
                }))}
              />

              <div className="easy-review-actions">
                <button
                  type="button"
                  disabled={busy === record.id}
                  onClick={() => review(record, 'approved')}
                >
                  Approve
                </button>
                <button
                  type="button"
                  disabled={busy === record.id}
                  onClick={() => review(record, 'rejected')}
                >
                  Reject
                </button>
              </div>
            </>
          )}

          {record.payment_method && <p>Payment method: {record.payment_method}</p>}
          {record.payment_from && <p>Payment from: {record.payment_from}</p>}
          {record.payment_amount && <p>Payment received: {record.payment_amount}</p>}
          {record.payment_reference && <p>Payment reference: {record.payment_reference}</p>}
          {record.admin_note && <p>Admin note: {record.admin_note}</p>}
        </article>
      ))}
    </section>
  );
}
