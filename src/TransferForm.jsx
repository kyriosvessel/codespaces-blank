import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from './supabase';

export default function 转账Form({ session }) {
  const { t } = useTranslation();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [pin, setPin] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [showPinSetup, setShowPinSetup] = useState(false);

  async function createPin(e) {
    e.preventDefault();
    setMessage('');
    if (!/^\d{6}$/.test(newPin)) {
      setMessage('pinMustBeSixDigits');
      return;
    }
    setBusy(true);
    const { error } = await supabase.rpc('set_transfer_pin', {
      p_pin: newPin
    });
    setBusy(false);
    setMessage(error ? error.message : 'pinCreatedNotice');
    if (!error) {
      setNewPin('');
      setShowPinSetup(false);
    }
  }

  async function transfer(e) {
    e.preventDefault();
    setMessage('');
    if (!session?.user?.id) {
      setMessage('Please sign in first.');
      return;
    }
    if (!/^\d{6}$/.test(pin)) {
      setMessage('enterSixDigitPin');
      return;
    }
    if (!recipient.trim() || !Number.isFinite(Number(amount)) || Number(amount) <= 0) {
      setMessage('invalidRecipientAmount');
      return;
    }
    setBusy(true);
    const { data, error } = await supabase.rpc('transfer_wallet_funds_with_pin', {
      p_recipient_wallet_id: recipient.trim(),
      p_amount: Number(amount),
      p_pin: pin
    });
    setBusy(false);
    if (error) {
      setMessage(error.message);
      return;
    }
    if (data?.success) {
      setMessage('转账 completed successfully.');
      setRecipient('');
      setAmount('');
      setPin('');
    } else {
      setMessage(data?.message || 'transferFailedNotice');
    }
  }

  return (
    <section className="wallet-card">
      <h2>{t('transferFunds')}</h2>
      <form onSubmit={transfer}>
        <label>{t('recipientWallet')}</label>
        <input value={recipient} onChange={e => setRecipient(e.target.value)}
          placeholder={t('enterRecipient')} required />
        <label>{t('amountUsd')}</label>
        <input type="number" min="0.01" step="0.01" value={amount}
          onChange={e => setAmount(e.target.value)} placeholder="0.00" required />
      <label>{t('privateTransferPin')}</label>
        <input type="password" inputMode="numeric" autoComplete="off"
          maxLength={6} pattern="[0-9]{6}" value={pin}
          onChange={e => setPin(e.target.value)} placeholder={t('enterPin')} required />
        <button type="submit" disabled={busy}>
          {busy ? t('pleaseWait') : t('transferSecurely')}
        </button>
      </form>

      <button type="button" onClick={() => setShowPinSetup(v => !v)}>
      {showPinSetup ? t('cancelPinSetup') : t('setUpTransferPin')}
      </button>

      {showPinSetup && (
        <form onSubmit={createPin}>
      <label>{t('privateTransferPin')}</label>
          <input type="password" inputMode="numeric" autoComplete="new-password"
            maxLength={6} pattern="[0-9]{6}" value={newPin}
            onChange={e => setNewPin(e.target.value)} placeholder={t('chooseSixDigits')} required />
          <button type="submit" disabled={busy}>
            {busy ? t('pleaseWait') : t('createPin')}
          </button>
        </form>
      )}
      {message && <p role="status">{message}</p>}
    </section>
  );
}
