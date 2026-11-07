import './i18n.js';
import "./customerDashboardTranslations.js";
import "./customerExtraTranslations.js";
import "./customerFinalTranslations.js";
import "./customerTransactionTranslations.js";
import "./customerTranslations.js";
import "./extraTranslations.js";
import "./globalTranslations.js";
import "./pinTranslations.js";

window.addEventListener("error", (e) => { document.body.innerHTML = '<pre style="padding:20px;color:#b00020;white-space:pre-wrap">APP ERROR: ' + (e.message || e.error) + '</pre>'; });
window.addEventListener("unhandledrejection", (e) => { document.body.innerHTML = '<pre style="padding:20px;color:#b00020;white-space:pre-wrap">PROMISE ERROR: ' + e.reason + '</pre>'; });

import './App.css';
import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import LanguageSelector from './LanguageSelector.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
      <LanguageSelector />
      <App />

      <a
        href="mailto:kerimu22@gmail.com"
        style={{
          position: 'fixed',
          bottom: '12px',
          left: '5%',
          width: '90%',
          padding: '14px',
          boxSizing: 'border-box',
          textAlign: 'center',
          background: '#123b70',
          color: '#fff',
          borderRadius: '12px',
          fontWeight: 'bold',
          textDecoration: 'none',
          zIndex: 9999
        }}
      >
        {({en:'联系管理员',zh:'联系管理员',es:'CONTACTAR AL ADMINISTRADOR',pt:'CONTATAR O ADMINISTRADOR',vi:'LIÊN HỆ QUẢN TRỊ VIÊN'})[localStorage.getItem('easy-language') || 'en'] || '联系管理员'}
      </a>
    </>
  </StrictMode>
);
