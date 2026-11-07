import { useEffect, useState } from 'react';
import { supabase } from './supabase';

export default function AdminContactEmail({ isAdmin }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadEmail() {
      const { data, error } = await supabase
        .from('app_settings')
        .select('administrator_email')
        .eq('id', 'global')
        .single();

      if (error) {
        setStatus('Could not load contact email: ' + error.message);
      } else {
        setEmail(data.administrator_email);
      }

      setLoading(false);
    }

    loadEmail();
  }, []);

  async function saveEmail() {
    const cleanEmail = email.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setStatus('Enter a valid email address.');
      return;
    }

    setSaving(true);
    setStatus('');

    const { error } = await supabase
      .from('app_settings')
      .update({
        administrator_email: cleanEmail,
        updated_at: new Date().toISOString()
      })
      .eq('id', 'global');

    setSaving(false);
    setStatus(error ? 'Save failed: ' + error.message : 'Contact email updated successfully.');
  }

  if (loading) return <p>Loading contact email...</p>;

  return (
    <section style={{ marginTop: 20, padding: 16, border: '1px solid #ddd', borderRadius: 12 }}>
      <h3>Contact Admin Email</h3>

      {isAdmin ? (
        <>
          <label>
            Administrator email
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ display: 'block', width: '100%', boxSizing: 'border-box', padding: 12, marginTop: 8 }}
            />
          </label>

          <button
            type="button"
            onClick={saveEmail}
            disabled={saving}
            style={{ marginTop: 12, padding: 12 }}
          >
            {saving ? 'Saving...' : 'Save Contact Email'}
          </button>
        </>
      ) : (
        <p>{email}</p>
      )}

      {status && <p role="status">{status}</p>}
    </section>
  );
}
