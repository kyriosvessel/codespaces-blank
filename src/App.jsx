import ExternalTransferForm from "./ExternalTransferForm.jsx";
import GiftCards from './GiftCards.jsx';
import AdminGiftCardReview from './AdminGiftCardReview.jsx';
import TransferForm from "./TransferForm.jsx";
import './customerDashboardTranslations.js';
import './customerFinalTranslations';
import './customerTranslations';
import './customerExtraTranslations';
import { useTranslation } from 'react-i18next';
import { detectLanguage } from './i18n';
import { useEffect, useState } from 'react';
import {
  Wallet, Eye, EyeOff, ArrowRight, ShieldCheck, LogOut
} from 'lucide-react';
import { supabase } from './supabase';
import AdminPanel from './AdminPanel';
import AdminWalletManagement from './AdminWalletManagement';
import AdminDepositReview from './AdminDepositReview';
import DepositForm from './DepositForm';
import DepositHistory from './DepositHistory';
import WalletId from './WalletId';
import TransactionHistory from './TransactionHistory';

import AccountBalance from './AccountBalance';
import AdminPinReset from './AdminPinReset';
const purple = '#512DA8';
const dark = '#21163D';
const muted = '#77718B';
const border = '#E6E0F0';

function PasswordInput({ label, value, onChange, showPassword, setShowPassword, inputStyle, muted }) {
  return (
    <label style={{ display: 'block', marginBottom: 17 }}>
      <span style={{
        display: 'block', marginBottom: 8,
        fontSize: 13, fontWeight: 700
      }}>{label}</span>
      <div style={{ position: 'relative' }}>
        <input
          required
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          autoComplete="new-password"
          minLength={8}
          style={{ ...inputStyle, paddingRight: 48 }}
        />
        <button
          type="button"
          aria-label="Show or hide password"
          onClick={() => setShowPassword(!showPassword)}
          style={{
            position: 'absolute', right: 12, top: 12,
            border: 0, background: 'transparent', color: muted
          }}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
    </label>
  );
}

export default function App() {
  const { t } = useTranslation();
  const [page, setPage] = useState('welcome');
  const [isAdmin, setIsAdmin] = useState(false);
  const [session, setSession] = useState(null);
  const [suspiciousLogin, setSuspiciousLogin] = useState(null);

  useEffect(() => {
    if (!session?.user?.id) {
      setSuspiciousLogin(null);
      return;
    }

    let active = true;

    async function loadSuspiciousLogin() {
      const { data, error } = await supabase
        .from("login_history")
        .select("id, country_code, country_name, created_at")
        .eq("user_id", session.user.id)
        .eq("is_suspicious", true)
        .is("acknowledged_at", null)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (active && !error) setSuspiciousLogin(data);
    }

    loadSuspiciousLogin();
    return () => { active = false; };
  }, [session?.user?.id]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState('');
  const [loading, setLoading] = useState(false);
  const [incomingCreditNotice, setIncomingCreditNotice] = useState(null);

  useEffect(() => {
    let active = true;

    supabase.auth.getSession().then(({ data, error }) => {
      if (!active) return;
      if (error) setNotice(error.message);
      setSession(data?.session ?? null);
    });

    const { data } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
      }
    );

    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, []);


  useEffect(() => {
    if (!session?.user?.id) return;

    let active = true;
    let initialized = false;
    let lastSeenId = null;

    async function checkIncomingCredits() {
      const { data, error } = await supabase
        .from('wallet_transactions')
        .select('id, amount, sender_name, created_at')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })
        .limit(1);

      if (!active || error) return;

      const latest = data?.[0] ?? null;

      if (!initialized) {
        initialized = true;
        lastSeenId = latest?.id ?? null;
        return;
      }

      if (latest && latest.id !== lastSeenId) {
        lastSeenId = latest.id;
        setIncomingCreditNotice(latest);
      }
    }

    checkIncomingCredits();
    const timer = setInterval(checkIncomingCredits, 10000);

    return () => {
      active = false;
      clearInterval(timer);
    };
  }, [session?.user?.id]);

  const inputStyle = {
    width: '100%',
    boxSizing: 'border-box',
    padding: 14,
    border: `1px solid ${border}`,
    borderRadius: 11,
    background: '#fff',
    color: '#222',
    fontSize: 15,
    outlineColor: purple
  };

  const buttonStyle = {
    width: '100%',
    padding: 15,
    border: 0,
    borderRadius: 12,
    background: purple,
    color: '#fff',
    fontWeight: 700,
    fontSize: 15,
    cursor: 'pointer',
    opacity: loading ? 0.7 : 1
  };

  function Brand() {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 14,
          background: purple, color: '#fff',
          display: 'grid', placeItems: 'center'
        }}>
          <Wallet size={24} />
        </div>
        <div>
          <div style={{ fontSize: 21, fontWeight: 800, letterSpacing: 1 }}>
            EASY $ FUNDING
          </div>
          <div style={{ fontSize: 10, color: muted, letterSpacing: 2 }}>
            {t('digitalFunding')}
          </div>
        </div>
      </div>
    );
  }

  function changePage(nextPage) {
    setNotice('');
    setPassword('');
    setConfirmPassword('');
    setPage(nextPage);
  }

  async function register(event) {
    event.preventDefault();
    setNotice('');

    if (password.length < 8) {
      setNotice('Your password must contain at least 8 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setNotice('Your passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: { full_name: name.trim() },
          emailRedirectTo: window.location.origin
        }
      });

      if (error) throw error;

      if (data.session) {
        setNotice('Your account has been created successfully.');
      } else {
        setNotice(
          'Registration received. Check your email for a verification link before signing in.'
        );
      }
    } catch (error) {
      setNotice(error.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function login(event) {
    event.preventDefault();
    setNotice('');
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password
      });

      if (error) throw error;

const { data: locationData, error: locationError } =
  await supabase.functions.invoke("track-login-location");

if (locationError) {
  console.warn("Login location tracking failed:", locationError);
} else if (locationData?.country_code) {
  localStorage.setItem("easy-login-country", locationData.country_code);
  await detectLanguage(locationData.country_code);
}
      setNotice('');
    } catch (error) {
      setNotice(error.message || 'Sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    setLoading(true);

    const { error } = await supabase.auth.signOut();

    setLoading(false);

    if (error) {
      setNotice(error.message);
    } else {
      setNotice('');
      setPassword('');
      setPage('welcome');
    }
  }

  if (session) {
    const userName =
      session.user.user_metadata?.full_name ||
      session.user.email?.split('@')[0] ||
      'User';

    return (
      <main style={{
        minHeight: '100vh', background: '#F6F3FC',
        padding: 22, boxSizing: 'border-box',
        fontFamily: 'Arial, sans-serif', color: dark
      }}>
        <div style={{ maxWidth: 650, margin: 'auto' }}>
          <header style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', gap: 12
          }}>
            <Brand />
            <button onClick={logout} disabled={loading} style={{
              padding: 12, borderRadius: 12,
              border: `1px solid ${border}`, background: '#fff'
            }}>
              <LogOut size={20} />
            </button>
          </header>

          {incomingCreditNotice && (
            <div style={{
              marginTop: 15, padding: 16, borderRadius: 12,
              background: '#E4F8EC', border: '1px solid #38A169',
              color: '#14532D'
            }}>
              <strong>New money received!</strong>
              <p style={{ margin: '7px 0' }}>
                You received ${Number(incomingCreditNotice.amount).toFixed(2)}
                {incomingCreditNotice.sender_name
                  ? ` from ${incomingCreditNotice.sender_name}` : ''}.
              </p>
              <button onClick={() => {
                setIncomingCreditNotice(null);
                setPage('transactions');
              }} style={{
                padding: '9px 14px', border: 0, borderRadius: 8,
                background: '#166534', color: '#fff', fontWeight: 'bold'
              }}>
                View Transaction
              </button>
              <button onClick={() => setIncomingCreditNotice(null)} style={{
                marginLeft: 10, padding: '9px 12px',
                border: '1px solid #166534', borderRadius: 8,
                background: 'transparent', color: '#14532D'
              }}>
                Close
              </button>
            </div>
          )}

          <section style={{
            marginTop: 35, background: '#fff',
            padding: 25, borderRadius: 20
          }}>
            <ShieldCheck size={34} color={purple} />
            <h1 className="kyrios-brand-title" className="kyrios-user-greeting">{t('welcomeUser', { name: userName })}</h1>
            <p style={{ color: muted, lineHeight: 1.7 }}>
  {t('accountConnected')} {t('servicesNotice')}
</p>
            <p style={{
              background: '#F0EBFF', padding: 14,
              borderRadius: 10, overflowWrap: 'anywhere'
            }}>
              <div className="easy-account-number">
  <strong>{t('accountNumber')}</strong>
  <div>{session.user.id}</div>
  <button type="button" onClick={() => navigator.clipboard.writeText(session.user.id).then(() => alert("Account number copied!")).catch(() => alert("Unable to copy account number."))}>
    {t('copyAccountNumber')}
  </button>
</div>
            </p>
          </section>

          <section style={{
            marginTop: 18, background: '#fff',
            padding: 22, borderRadius: 18
          }}>
            {suspiciousLogin && (
  <div style={{
    background: "#fff0e6",
    border: "1px solid #e58b45",
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    color: "#7a3510"
  }}>
    <strong>⚠ Suspicious Login</strong>
    <p>
      A login was detected from a new location:
      {" "}{suspiciousLogin.country_code}
    </p>
    <p>
      {new Date(suspiciousLogin.created_at).toLocaleString()}
    </p>
    <button
      onClick={async () => {
        const { error } = await supabase
          .from("login_history")
          .update({ acknowledged_at: new Date().toISOString() })
          .eq("id", suspiciousLogin.id);
        if (!error) setSuspiciousLogin(null);
      }}
    >
      Acknowledge
    </button>
  </div>
)}
<div className="easy-dashboard-banner">
  <div>
    <span className="easy-dashboard-brand">EASY $ FUNDING</span>
      <h2>{t('dashboardTitle')}</h2>
    <p>{t('accountConnected')}</p>
  </div>
  <div className="easy-security-badge">
    <ShieldCheck size={28} />
    <span>{t('secureWallet')}</span>
  </div>
</div>

{(!['wallet','send','funds','transactions','admin'].includes(page)) && (
  <AccountBalance session={session} />
)}

<nav className="easy-page-navigation">
  <button onClick={() => setPage('home')}>{t('dashboard')}</button>
  <button onClick={() => setPage('wallet')}>{t('myWallet')}</button>
  <button onClick={() => setPage('send')}>{t('sendMoney')}</button>
  <button onClick={() => setPage('funds')}>{t('addFunds')}</button>
  <button onClick={() => setPage('transactions')}>{t('transactions')}</button>
  <button onClick={() => setPage('giftcards')}>{t('giftCards')}</button>
  {isAdmin && <button onClick={() => setPage('admin')}>{t('administration')}</button>}
</nav>



{page === 'wallet' && <>
  <AccountBalance session={session} />
  <WalletId session={session} />
</>}

      {page === 'send' && <><TransferForm session={session} /><ExternalTransferForm session={session} /></>}

{page === 'funds' && <>
  <DepositForm session={session} />
  <DepositHistory session={session} />
</>}

{page === 'transactions' && <TransactionHistory session={session} />}
{page === 'giftcards' && <GiftCards session={session} />}

{!isAdmin && <div style={{display:'none'}}><AdminPanel session={session} onAdminStatusChange={setIsAdmin} /></div>}
{page === 'admin' && <>
  <AdminPanel session={session} onAdminStatusChange={setIsAdmin} />
  <AdminWalletManagement session={session} />
  <AdminPinReset session={session} />
  <AdminDepositReview session={session} />
  <AdminGiftCardReview session={session} />
</>}

            <p style={{ color: muted, lineHeight: 1.7 }}>
              {t('accountConnected')} {t('servicesNotice')}
            </p>
          </section>
        </div>
      </main>
    );
  }

  const registering = page === 'register';
  const signingIn = page === 'login';

  return (
    <main style={{
      minHeight: '100vh', background: '#F6F3FC',
      padding: '30px 22px', boxSizing: 'border-box',
      fontFamily: 'Arial, sans-serif', color: dark
    }}>
      <div style={{ maxWidth: 460, margin: 'auto' }}>
        <Brand />

        {page === 'welcome' ? (
          <>
            <section style={{
              marginTop: 45, borderRadius: 25, padding: 28,
              background: 'linear-gradient(145deg,#392078,#7954D8)',
              color: '#fff'
            }}>
              <div style={{
                width: 62, height: 62, borderRadius: 18,
                background: '#ffffff25', display: 'grid',
                placeItems: 'center'
              }}>
                <Wallet size={32} />
              </div>
              <h1 style={{ fontSize: 36, lineHeight: 1.2 }}>
                {t('welcomeHeadline')}
              </h1>
              <p style={{ color: '#EEE7FF', lineHeight: 1.7 }}>
                {t('welcomeIntro')}
              </p>
              <button
                onClick={() => changePage('register')}
                style={{ ...buttonStyle, background: '#fff', color: purple }}
              >
                {t('createAccountButton')} <ArrowRight size={17} />
              </button>
              <button
                onClick={() => changePage('login')}
                style={{
                  ...buttonStyle, marginTop: 12,
                  background: '#ffffff20',
                  border: '1px solid #ffffff70'
                }}
              >{t('signInButton')}</button>
            </section>

            <div style={{
              display: 'flex', gap: 13, alignItems: 'center',
              padding: 18, marginTop: 20, background: '#fff',
              borderRadius: 16, border: `1px solid ${border}`
            }}>
              <ShieldCheck size={27} color={purple} />
              <div>
                <strong>{t('accountSecurity')}</strong>
                <p style={{
                  color: muted, fontSize: 12, lineHeight: 1.5
                }}>
                  {t('protectAccount')}
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            <div style={{ marginTop: 38, marginBottom: 25 }}>
              <h1 style={{ fontSize: 29 }}>
                {registering ? t('createAccountTitle') : t('welcomeBack')}
              </h1>
              <p style={{ color: muted, fontSize: 14, lineHeight: 1.6 }}>
                {registering
                  ? t('enterDetails')
                  : t('loginInstruction')}
              </p>
            </div>

            <form onSubmit={registering ? register : login}>
              {registering && (
                <label style={{ display: 'block', marginBottom: 17 }}>
                  <span style={{
                    display: 'block', marginBottom: 8,
                    fontSize: 13, fontWeight: 700
                  }}>Full name</span>
                  <input
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    autoComplete="name"
                    style={inputStyle}
                  />
                </label>
              )}

              <label style={{ display: 'block', marginBottom: 17 }}>
                <span style={{
                  display: 'block', marginBottom: 8,
                  fontSize: 13, fontWeight: 700
                }}>{t('emailAddress')}</span>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  autoComplete="email"
                  style={inputStyle}
                />
              </label>

              <PasswordInput
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                inputStyle={inputStyle}
                muted={muted}
                label={t('password')}
                value={password}
                onChange={e => setPassword(e.target.value)}
              />

              {registering && (
                <PasswordInput
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  inputStyle={inputStyle}
                  muted={muted}
                  label="Confirm password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                />
              )}

              {notice && (
                <div role="status" style={{
                  background: '#F0EBFF', padding: 13,
                  borderRadius: 10, marginBottom: 17,
                  fontSize: 13, lineHeight: 1.6, overflowWrap: 'anywhere'
                }}>
                  {notice}
                </div>
              )}

              <button type="submit" disabled={loading} style={buttonStyle}>
                {loading
                  ? t('pleaseWait')
                  : registering ? t('createAccount') : t('signIn')}
              </button>
            </form>

            <p style={{
              textAlign: 'center', color: muted,
              fontSize: 14, marginTop: 24
            }}>
              {registering ? t('alreadyRegistered') : t('noAccount')}{' '}
              <button
                onClick={() => changePage(registering ? 'login' : 'register')}
                style={{
                  border: 0, background: 'transparent',
                  color: purple, fontWeight: 800
                }}
              >
                {registering ? 'Sign in' : 'Create account'}
              </button>
            </p>
          </>
        )}

        <button
          onClick={() => changePage('welcome')}
          style={{
            display: 'block', margin: '25px auto',
            border: 0, background: 'transparent', color: muted
          }}
        >
          {t('backTo欢迎')}
        </button>
      </div>
    </main>
  );
}
