import { useEffect, useState } from 'react';
import { supabase } from './supabase';

export default function AdminPinReset({ session }) {
  const [walletId, setWalletId] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    let active = true;

    async function checkAdmin() {
      if (!session?.user?.id) {
        if (active) setChecked(true);
        return;
      }

      const { data, error } = await supabase
        .from('wallet_admins')
        .select('user_id')
        .eq('user_id', session.user.id)
        .maybeSingle();

      if (active) {
        setIsAdmin(!error && !!data);
        setChecked(true);
      }
    }

    checkAdmin();
    return () => { active = false; };
  }, [session?.user?.id]);

  if (!checked || !isAdmin) return null;

  async function resetPin(e) {
    e.preventDefault();
    setMessage('');

    if (!session?.user?.id) {
      setMessage('Please sign in with your administrator account.');
      return;
    }

    const confirmed = window.confirm(
      'Authorize a 转账 PIN reset for the account matching this Wallet ID?'
    );
    if (!confirmed) return;

    setBusy(true);
    try {
      const { data: admin, error: adminError } = await supabase
        .from('wallet_admins')
        .select('user_id')
        .eq('user_id', session.user.id)
        .maybeSingle();

      if (adminError || !admin) {
        setMessage('Administrator access required.');
        return;
      }

      const { data: wallet, error: walletError } = await supabase
        .from('wallets')
        .select('user_id, wallet_id')
        .ilike('wallet_id', walletId.trim())
        .maybeSingle();

      if (walletError || !wallet) {
        setMessage('Wallet ID not found. Please check it and try again.');
        return;
      }

      if (wallet.user_id === session.user.id) {
        setMessage('You cannot reset your own PIN using this tool.');
        return;
      }

      const { data, error } = await supabase.rpc('admin_reset_transfer_pin', {
        p_user_id: wallet.user_id
      });

      if (error) {
        setMessage(error.message);
      } else if (data?.success) {
        setMessage('PIN reset authorized. The user can now create a new PIN.');
        setWalletId('');
      } else {
        setMessage(data?.message || 'The PIN reset could not be completed.');
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="wallet-card">
      <h2>Administrator: 转账 PIN Reset</h2>
      <p>Enter a customer's Wallet ID to authorize a PIN reset.</p>
      <form onSubmit={resetPin}>
        <label>Customer Wallet ID</label>
        <input
          value={walletId}
          onChange={e => setWalletId(e.target.value)}
          placeholder="Enter customer Wallet ID"
          required
        />
        <button type="submit" disabled={busy}>
          {busy ? 'Please wait...' : 'Authorize PIN Reset'}
        </button>
      </form>
      {message && <p role="status">{message}</p>}
    </section>
  );
}
