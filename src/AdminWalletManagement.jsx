import { useEffect, useState } from 'react';
import { supabase } from './supabase';

export default function AdminWalletManagement({ session }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkedAdmin, setCheckedAdmin] = useState(false);
  const [walletId, setWalletId] = useState('');
  const [wallet, setWallet] = useState(null);
  const [balance, setBalance] = useState('');
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    async function checkAdmin() {
      if (!session?.user?.id) {
        if (active) setCheckedAdmin(true);
        return;
      }
      const { data, error } = await supabase
        .from('wallet_admins')
        .select('user_id')
        .eq('user_id', session.user.id)
        .maybeSingle();
      if (active) {
        setIsAdmin(!error && !!data);
        setCheckedAdmin(true);
      }
    }
    checkAdmin();
    return () => { active = false; };
  }, [session?.user?.id]);

  if (!checkedAdmin || !isAdmin) return null;

  async function findWallet(e) {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setWallet(null);

    const { data: admin, error: adminError } = await supabase
      .from('wallet_admins')
      .select('user_id')
      .eq('user_id', session.user.id)
      .maybeSingle();

    if (adminError || !admin) {
      setMessage('Administrator access required.');
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('wallets')
      .select('wallet_id, user_id, balance, currency')
      .ilike('wallet_id', walletId.trim())
      .maybeSingle();

    if (error || !data) {
      setMessage('Wallet not found. Check the Wallet ID.');
    } else {
      setWallet(data);
      setBalance(String(data.balance));
    }

    setLoading(false);
  }

  async function adjustBalance(e) {
    e.preventDefault();

    if (!wallet) return;
    if (balance.trim() === '' || !Number.isFinite(Number(balance)) || Number(balance) < 0) {
      setMessage('Enter a valid balance of zero or more.');
      return;
    }
    if (reason.trim().length < 3) {
      setMessage('Enter a reason of at least 3 characters.');
      return;
    }
    if (!window.confirm('Confirm this wallet balance adjustment?')) return;

    setLoading(true);
    setMessage('');

    const { data, error } = await supabase.rpc('admin_adjust_wallet', {
      p_user_id: wallet.user_id,
      p_new_balance: Number(balance),
      p_reason: reason.trim()
    });

    if (error) {
      setMessage(error.message);
    } else if (data?.success) {
      setWallet({ ...wallet, balance: Number(balance) });
      setReason('');
      setMessage('Wallet balance adjusted and transaction recorded.');
    } else {
      setMessage('The adjustment could not be confirmed.');
    }

    setLoading(false);
  }

  return (
    <section className="wallet-card">
      <h2>Administrator Wallet Management</h2>
      <form onSubmit={findWallet}>
        <label htmlFor="admin-wallet-id">Customer Wallet ID</label>
        <input
          id="admin-wallet-id"
          value={walletId}
          onChange={(e) => setWalletId(e.target.value)}
          placeholder="Enter KYRIOS Wallet ID"
          required
        />
        <button type="submit" disabled={loading}>
          Find Wallet
        </button>
      </form>

      {wallet && (
        <form onSubmit={adjustBalance} className="admin-wallet-adjustment">
          <p><strong>Wallet:</strong> {wallet.wallet_id}</p>
          <p><strong>Current balance:</strong> {wallet.currency} {Number(wallet.balance).toFixed(2)}</p>

          <label htmlFor="admin-new-balance">New balance ({wallet.currency})</label>
          <input
            id="admin-new-balance"
            type="number"
            min="0"
            step="0.01"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            required
          />

          <label htmlFor="admin-adjustment-reason">Reason for adjustment</label>
          <input
            id="admin-adjustment-reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            minLength="3"
            placeholder="Explain why an adjustment is needed"
            required
          />

          <button type="submit" disabled={loading}>
            Confirm Balance Adjustment
          </button>
        </form>
      )}

      {message && <p role="status">{message}</p>}
    </section>
  );
}
