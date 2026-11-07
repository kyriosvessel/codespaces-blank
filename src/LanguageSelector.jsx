import { useTranslation } from 'react-i18next';

export default function LanguageSelector() {
  const { i18n } = useTranslation();

  const changeLanguage = (e) => {
    const language = e.target.value;
    localStorage.setItem('easy-language', language);
  localStorage.setItem("easy-language-source", "manual");
    i18n.changeLanguage(language);
    document.documentElement.lang = language;
  };

  return (
    <select
      value={i18n.resolvedLanguage || i18n.language}
      onChange={changeLanguage}
      aria-label="Select language"
      style={{
        position: 'fixed',
        top: 12,
        right: 12,
        zIndex: 10000,
        padding: 10,
        borderRadius: 8,
        background: '#fff',
        color: '#222',
        border: '1px solid #ccc'
      }}
    >
      <option value="en">English</option>
      <option value="zh">中文</option>
      <option value="es">Español</option>
      <option value="pt">Português</option>
      <option value="vi">Tiếng Việt</option>
    </select>
  );
}
