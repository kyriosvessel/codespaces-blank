import { useEffect, useState } from 'react';
import { supabase } from './supabase';

import AdminContactEmail from './AdminContactEmail';
export default function AdminPanel({ session, onAdminStatusChange }) {
  const [status, setStatus] = useState('Checking administrator access...');
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => { onAdminStatusChange?.(isAdmin); }, [isAdmin, onAdminStatusChange]);
  const [wallets, setWallets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [edits, setEdits] = useState({});
  const [busy, setBusy] = useState(false);
const [recipientSearch, setRecipientSearch] = useState("");
const [sendForm, setSendForm] = useState({user_id:'',amount:'',sender_name:'',sender_account_number:'',sender_bank_name: '',transaction_date:new Date().toISOString().slice(0,10),description:''});


  async function loadData() {
    setStatus('Loading wallet information...');

    const { data: walletData, error: walletError } = await supabase
      .from('wallets')
      .select('user_id, balance, currency, created_at')
      .order('created_at', { ascending: false });

    if (walletError) {
      setStatus('Could not load wallets: ' + walletError.message);
      return;
    }

    const { data: transactionData, error: transactionError } =
      await supabase
        .from('wallet_transactions')
        .select('id, user_id, transaction_type, amount, reason, balance_before, balance_after, created_at')
        .order('created_at', { ascending: false })
        .limit(20);

    const {data: userEmails, error: emailError} = await supabase.rpc('admin_list_wallet_users');
if (emailError) console.error('Email lookup failed:', emailError);
const emailMap = Object.fromEntries((userEmails || []).map(u => [u.user_id, u.email]));
setWallets((walletData || []).map(w => ({...w, email: emailMap[w.user_id] || 'Email unavailable'})));
setTransactions(transactionData || []);
    setStatus(
      transactionError
        ? 'Wallets loaded. Transaction history unavailable: ' + transactionError.message
        : 'Administrator access verified.'
    );
  }

  useEffect(() => {
    let active = true;

    async function verify() {
      if (!session?.user?.id) {
        setStatus('Please sign in again.');
        return;
      }

      const { data, error } = await supabase
        .from('wallet_admins')
        .select('user_id')
        .eq('user_id', session.user.id)
        .maybeSingle();

      if (!active) return;

      if (error) {
        setStatus('Administrator verification failed: ' + error.message);
        return;
      }

      if (!data) {
        setStatus('');
        return;
      }

      setIsAdmin(true);

      const { data: walletData, error: walletError } = await supabase
        .from('wallets')
        .select('user_id, balance, currency, created_at')
        .order('created_at', { ascending: false });

      if (!active) return;

      if (walletError) {
        setStatus('Admin verified, but wallets could not load: ' + walletError.message);
        return;
      }

      const { data: transactionData, error: transactionError } =
        await supabase
          .from('wallet_transactions')
          .select('id, user_id, transaction_type, amount, reason, balance_before, balance_after, created_at')
          .order('created_at', { ascending: false })
          .limit(20);

      if (!active) return;

      const {data: verifyEmails} = await supabase.rpc('admin_list_wallet_users');
const verifyEmailMap = Object.fromEntries((verifyEmails || []).map(u => [u.user_id, u.email]));
setWallets((walletData || []).map(w => ({...w, email: verifyEmailMap[w.user_id] || 'Email unavailable'})));
      setTransactions(transactionData || []);
      setStatus(
        transactionError
          ? 'Admin verified. Transaction history unavailable: ' + transactionError.message
          : 'Administrator access verified.'
      );
    }

    verify();
    
  return () => { active = false; };
  }, [session?.user?.id]);

  async function adjustBalance(wallet) {
    const edit = edits[wallet.user_id] || {};

    if (edit.balance === undefined || edit.balance.trim() === '') {
      setStatus('Enter the new balance first.');
      return;
    }

    if (!edit.reason || edit.reason.trim().length < 3) {
      setStatus('Enter a reason of at least 3 characters.');
      return;
    }

    const newBalance = Number(edit.balance);

    if (!Number.isFinite(newBalance) || newBalance < 0) {
      setStatus('Enter a valid balance of zero or greater.');
      return;
    }

    if (!window.confirm(
      `Change this wallet balance from ${wallet.balance} to ${newBalance}?`
    )) return;

    setBusy(true);
    setStatus('Saving balance adjustment...');

    const { data, error } = await supabase.rpc('admin_adjust_wallet', {
      p_user_id: wallet.user_id,
      p_new_balance: newBalance,
      p_reason: edit.reason.trim()
    });

    setBusy(false);

    if (error) {
      setStatus('Balance adjustment failed: ' + error.message);
      return;
    }

    setStatus('Balance updated and adjustment recorded.');
    setEdits(previous => {
      const next = { ...previous };
      delete next[wallet.user_id];
      return next;
    });

    await loadData();
  }

  
async function sendFunds() {
  const f = sendForm;

  if (!f.user_id || !f.amount || Number(f.amount) <= 0 ||
      !f.sender_name.trim() || !f.sender_account_number.trim() || !f.sender_bank_name.trim() ||
      !f.transaction_date) {
    setStatus('Complete all required fields with a valid amount.');
    return;
  }

  if (!window.confirm('Confirm this transfer?')) return;

  setBusy(true);
  setStatus('Processing transfer...');

  try {
    const { data, error } = await supabase.rpc('admin_send_funds', {
      p_user_id: f.user_id,
      p_amount: Number(f.amount),
      p_sender_name: f.sender_name.trim(),
      p_sender_account_number: f.sender_account_number.trim(),
p_sender_bank_name: f.sender_bank_name.trim(),
      p_transaction_date: f.transaction_date,
      p_description: f.description.trim() || 'Admin funds sent',
      p_request_id: crypto.randomUUID()
    });

    if (error) throw error;

    setSendForm({...f, amount: '', description: ''});
    await loadData();
    setStatus('转账 successful! Reference: ' + data);
  } catch (error) {
    setStatus('转账 failed: ' + error.message);
  } finally {
    setBusy(false);
  }
}


const box = {
    padding: 12,
    marginTop: 10,
    border: '1px solid #ddd',
    borderRadius: 8,
    overflowWrap: 'anywhere'
  };

  return (
    <section style={{ marginTop: 24, padding: 18, background: '#fff', borderRadius: 14 }}>
      <h2></h2>
      <p role="status" style={{ overflowWrap: 'anywhere' }}>{status}</p>

      

      {isAdmin && (
        <>
          <AdminContactEmail isAdmin={isAdmin} />
<h3>Wallet Management</h3>
          <p>Review wallet balances. Every adjustment requires a reason and is recorded.</p>

          {wallets.length === 0 && <p>No wallets found, or none are visible to this account.</p>}

          {wallets.map(wallet => (
            <div key={wallet.user_id} style={box}>
              <p><strong>User ID:</strong> {wallet.user_id}</p>
              <p><strong>Current balance:</strong> {wallet.balance} {wallet.currency || ''}</p>

              <label style={{ display: 'block', marginTop: 10 }}>
                New balance
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={edits[wallet.user_id]?.balance ?? ''}
                  onChange={e => setEdits(old => ({
                    ...old,
                    [wallet.user_id]: {
                      ...old[wallet.user_id],
                      balance: e.target.value
                    }
                  }))}
                  style={{ display: 'block', width: '100%', boxSizing: 'border-box', padding: 10, marginTop: 5 }}
                />
              </label>

              <label style={{ display: 'block', marginTop: 10 }}>
                Reason for adjustment
                <input
                  type="text"
                  value={edits[wallet.user_id]?.reason ?? ''}
                  onChange={e => setEdits(old => ({
                    ...old,
                    [wallet.user_id]: {
                      ...old[wallet.user_id],
                      reason: e.target.value
                    }
                  }))}
                  placeholder="Explain why the balance is changing"
                  style={{ display: 'block', width: '100%', boxSizing: 'border-box', padding: 10, marginTop: 5 }}
                />
              </label>

              <button
                type="button"
                disabled={busy}
                onClick={() => adjustBalance(wallet)}
                style={{ marginTop: 10, padding: 10, cursor: 'pointer' }}
              >
                {busy ? 'Please wait...' : 'Save Balance Adjustment'}
              </button>
            </div>
          ))}

          
<h3>Send Funds to User</h3>

{sendForm.user_id ? (
  <div style={{padding:12,background:"#222",color:"#fff",borderRadius:8}}>
    Recipient: {wallets.find(w=>w.user_id===sendForm.user_id)?.email || sendForm.user_id}
    <button type="button" onClick={()=>setSendForm({...sendForm,user_id:""})} style={{marginLeft:12}}>Change</button>
  </div>
) : (
  <div>
    <input
      type="text"
      placeholder="Search recipient by email"
      value={recipientSearch}
      onChange={e=>setRecipientSearch(e.target.value)}
      style={{width:"100%",boxSizing:"border-box",padding:12,background:"#fff",color:"#111"}}
    />
    <div style={{maxHeight:180,overflowY:"auto",background:"#222",borderRadius:8}}>
      {wallets.filter(w=>(w.email||w.user_id).toLowerCase().includes(recipientSearch.toLowerCase())).map(w=>(
        <button type="button" key={w.user_id}
          onClick={()=>{setSendForm({...sendForm,user_id:w.user_id});setRecipientSearch("");}}
          style={{display:"block",width:"100%",padding:12,textAlign:"left",background:"#222",color:"#fff",border:"0",borderBottom:"1px solid #555"}}>
          {w.email || w.user_id}
        </button>
      ))}
    </div>
  </div>
)}

{['amount','sender_name','sender_account_number', 'sender_bank_name','transaction_date','description'].map(k=><label key={k} style={{display:'block',marginTop:8}}>{({amount:'Amount (USD)',sender_name:'Sender name',sender_account_number:'Sender account number',sender_bank_name: 'Sender bank name',transaction_date:'Transaction date',description:'Description'})[k]}<input type={k==='transaction_date'?'date':k==='amount'?'number':'text'} step={k==='amount'?'0.01':undefined} value={sendForm[k]} onChange={e=>setSendForm({...sendForm,[k]:e.target.value})} style={{display:'block',width:'100%',boxSizing:'border-box',padding:10}} /></label>)}
<button type="button" disabled={busy} onClick={sendFunds} style={{marginTop:10,padding:12}}>{busy?'Please wait...':'Send Funds'}</button>
<h3 style={{ marginTop: 28 }}>Recent Transactions</h3>

          {transactions.map(tx => (
            <div key={tx.id} style={box}>
              <p><strong>Type:</strong> {tx.transaction_type}</p>
              <p><strong>User ID:</strong> {tx.user_id}</p>
              <p><strong>Amount:</strong> {tx.amount}</p>
              <p><strong>Reason:</strong> {tx.reason || '—'}</p>
              <p><strong>Balance before:</strong> {tx.balance_before ?? '—'}</p>
              <p><strong>Balance after:</strong> {tx.balance_after ?? '—'}</p>
              <p><strong>Date:</strong>{tx.created_at ? new Date(tx.created_at).toLocaleString() : '—'}</p>
            </div>
          ))}
        </>
      )}
    </section>
  );
}
