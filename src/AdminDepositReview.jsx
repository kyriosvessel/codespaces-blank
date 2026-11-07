import { useEffect, useState } from 'react';
import { supabase } from './supabase';

export default function AdminDepositReview({ session }) {
  const [requests, setRequests] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState('');
  const [notice, setNotice] = useState('');

  async function loadRequests() {
    setLoading(true);

    const { data, error } = await supabase
      .from('deposit_requests')
      .select('id, user_id, amount, currency, payment_method, payment_reference, created_at')
      .eq('status', 'pending')
      .order('created_at', { ascending: false });

    if (error) {
      setNotice('Could not load deposit requests. Check administrator permissions.');
    } else {
      setRequests(data || []);
      setNotice('');
    }

    setLoading(false);
  }

  useEffect(() => {
    let active = true;

    async function checkAdmin() {
      if (!session?.user?.id) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('wallet_admins')
        .select('user_id')
        .eq('user_id', session.user.id)
        .maybeSingle();

      if (!active) return;

      if (!error && data) {
        setIsAdmin(true);
        await loadRequests();
      } else {
        setLoading(false);
      }
    }

    checkAdmin();

    return () => {
      active = false;
    };
  }, [session?.user?.id]);

  async function reviewRequest(request, decision) {
    if (decision === 'approved') {
      const confirmed = window.confirm(
        `Confirm that payment of ${request.amount} ${request.currency} has been received and verified before approving this request.`
      );

      if (!confirmed) return;
    }

    const note = window.prompt(
      decision === 'approved'
        ? 'Optional approval note:'
        : 'Reason for rejecting this request:'
    );

    if (note === null) return;

    setBusyId(request.id);
    setNotice('');

    const { data, error } = await supabase.rpc('review_deposit_request', {
      p_request_id: request.id,
      p_decision: decision,
      p_admin_note: note.trim() || null
    });

    if (error) {
      setNotice(error.message || 'Unable to review this request.');
    } else if (!data?.success) {
      setNotice('The request could not be reviewed.');
    } else {
      setNotice(
        decision === 'approved'
          ? 'Deposit approved and wallet credited successfully.'
          : 'Deposit request rejected.'
      );
      await loadRequests();
    }

    setBusyId('');
  }

  if (!isAdmin) return null;

  return (
    <section style={{
      marginTop: 20,
      padding: 20,
      background: '#fff',
      border: '1px solid #E6E0F0',
      borderRadius: 16
    }}>
      <h3 style={{ marginTop: 0, color: '#512DA8' }}>
        Deposit Approval
      </h3>

      <button
        type="button"
        onClick={loadRequests}
        disabled={loading || !!busyId}
      >
        Refresh Requests
      </button>

      {notice && <p role="status">{notice}</p>}
      {loading && <p>Loading deposit requests...</p>}

      {!loading && requests.length === 0 && (
        <p>No pending deposit requests.</p>
      )}

      {requests.map((request) => (
        <article
          key={request.id}
          style={{
            marginTop: 16,
            padding: 14,
            border: '1px solid #E6E0F0',
            borderRadius: 12,
            overflowWrap: 'anywhere'
          }}
        >
          <strong>
            {request.amount} {request.currency}
          </strong>

          <p>Payment method: {request.payment_method}</p>
          <p>Reference: {request.payment_reference || 'Not provided'}</p>
          <p>Customer ID: {request.user_id}</p>
          <p>Submitted: {new Date(request.created_at).toLocaleString()}</p>

          <button
            type="button"
            disabled={!!busyId}
            onClick={() => reviewRequest(request, 'approved')}
          >
            {busyId === request.id ? 'Processing...' : 'Approve'}
          </button>

          <button
            type="button"
            disabled={!!busyId}
            onClick={() => reviewRequest(request, 'rejected')}
            style={{ marginLeft: 8 }}
          >
            Reject
          </button>
        </article>
      ))}
    </section>
  );
}
