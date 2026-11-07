import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { supabase } from './supabase';

const markets = {
  CN: { name: 'China', currency: 'CNY', symbol: '¥', brands: ['Tencent Q币', 'JD.com', 'NetEase', 'iQIYI'] },
  TW: { name: 'Taiwan', currency: 'TWD', symbol: 'NT$', brands: ['MyCard', 'Steam', 'Apple'] },
  PH: { name: 'Philippines', currency: 'PHP', symbol: '₱', brands: ['Grab', 'UniPin', 'Steam', 'ZALORA'] },
  BR: { name: 'Brazil', currency: 'BRL', symbol: 'R$', brands: ['Google Play', 'PlayStation', 'Xbox', 'Uber', 'Shopee'] },
  PT: { name: 'Portugal', currency: 'EUR', symbol: '€', brands: ['Google Play', 'Apple', 'Steam', 'Decathlon'] },
  US: { name: 'United States', currency: 'USD', symbol: '$', brands: ['Amazon', 'Apple', 'Walmart', 'Steam', 'Xbox', 'PlayStation'] },
  GB: { name: 'United Kingdom', currency: 'GBP', symbol: '£', brands: ['Amazon UK', 'Apple', 'Uber', 'Deliveroo'] },
  NG: { name: 'Nigeria', currency: 'NGN', symbol: '₦', brands: ['Steam', 'Nintendo'] },
  CA: { name: 'Canada', currency: 'CAD', symbol: 'C$', brands: ['Amazon Canada', 'Apple', 'Uber'] },
  AU: { name: 'Australia', currency: 'AUD', symbol: 'A$', brands: ['Apple', 'Amazon Australia', 'Steam'] },
  DE: { name: 'Germany', currency: 'EUR', symbol: '€', brands: ['Amazon Germany', 'Steam', 'Apple'] },
  FR: { name: 'France', currency: 'EUR', symbol: '€', brands: ['Amazon France', 'Apple', 'Steam'] }
};

export default function GiftCards({ session }) {
  const { t } = useTranslation();
  const [country, setCountry] = useState('US');
  const [brand, setBrand] = useState('Amazon');
  const [amount, setAmount] = useState('');
  const [usdRate, setUsdRate] = useState(null);
  const [rateLoading, setRateLoading] = useState(false);
  const [reference, setReference] = useState('');
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState('');
  const [records, setRecords] = useState([]);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');

  const market = markets[country];

  useEffect(() => {
    let active = true;
    setUsdRate(null);
    setRateLoading(true);

    if (market.currency === 'USD') {
      setUsdRate(1);
      setRateLoading(false);
      return () => { active = false; };
    }

    fetch(`https://open.er-api.com/v6/latest/${market.currency}`)
      .then(response => response.json())
      .then(data => {
        if (active && data.result === 'success') {
          setUsdRate(data.rates?.USD ?? null);
        }
      })
      .catch(() => {
        if (active) setUsdRate(null);
      })
      .finally(() => {
        if (active) setRateLoading(false);
      });

    return () => { active = false; };
  }, [market.currency]);


  useEffect(() => {
    setBrand(markets[country].brands[0]);
  }, [country]);

  useEffect(() => {
    loadRecords();
  }, [session.user.id]);

  useEffect(() => {
    if (!photo) {
      setPreview('');
      return;
    }
    const url = URL.createObjectURL(photo);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [photo]);

  async function loadRecords() {
    const { data, error } = await supabase
      .from('gift_card_redemptions')
      .select('id, country_code, currency_code, brand, denomination, redemption_reference, image_path, status, submitted_at, admin_note')
      .eq('user_id', session.user.id)
      .order('submitted_at', { ascending: false });

    if (!error) setRecords(data || []);
  }

  async function submitCard(event) {
    event.preventDefault();
    if (!photo) {
      setNotice('Please upload a picture of your gift card.');
      return;
    }

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(photo.type)) {
      setNotice('Upload a JPG, PNG or WEBP image.');
      return;
    }

    if (photo.size > 5 * 1024 * 1024) {
      setNotice('Image must be 5 MB or smaller.');
      return;
    }

    setBusy(true);
    setNotice('');

    const filePath = `${session.user.id}/${crypto.randomUUID()}.${photo.name.split('.').pop().toLowerCase()}`;

    const { error: uploadError } = await supabase.storage
      .from('gift-card-images')
      .upload(filePath, photo, { contentType: photo.type, upsert: false });

    if (uploadError) {
      setBusy(false);
      setNotice(uploadError.message);
      return;
    }

    const { error } = await supabase
      .from('gift_card_redemptions')
      .insert({
        user_id: session.user.id,
        country_code: country,
        currency_code: market.currency,
        brand,
        denomination: Number(amount),
        redemption_reference: reference.trim(),
        image_path: filePath
      });

    if (error) {
      await supabase.storage.from('gift-card-images').remove([filePath]);
      setBusy(false);
      setNotice(error.message);
      return;
    }

    setBusy(false);
    setNotice('Gift card submitted for administrator review.');
    setAmount('');
    setReference('');
    setPhoto(null);
    loadRecords();
  }

  async function showImage(path) {
    const { data, error } = await supabase.storage
      .from('gift-card-images')
      .createSignedUrl(path, 60);

    if (error) {
      setNotice('Could not open your private image.');
      return;
    }
    window.open(data.signedUrl, '_blank', 'noopener,noreferrer');
  }

  return (
    <section className="easy-gift-page">
      <h2>{t('giftTitle', '礼品卡')}</h2>
      <p>{t('giftCountryInstruction')}</p>

      <form onSubmit={submitCard}>
        <label>{t('giftCountry', 'giftCountry')}</label>
        <select value={country} onChange={e => setCountry(e.target.value)}>
          {Object.entries(markets).map(([code, item]) => (
            <option key={code} value={code}>{item.name}</option>
          ))}
        </select>

        <h3>{t('giftBrand', 'Available gift card designs')}</h3>
        <div className="easy-gift-gallery">
          {market.brands.map(item => (
            <button
              type="button"
              key={item}
              className={`easy-gift-tile ${brand === item ? 'selected' : ''}`}
              onClick={() => setBrand(item)}
            >
              <span className="easy-gift-tile-art">{t('giftCardLabel')}</span>
              <strong>{item}</strong>
              <small>{market.name}</small>
            </button>
          ))}
        </div>

        <label>{t('giftSelectedCard')}</label>
        <select value={brand} onChange={e => setBrand(e.target.value)}>
          {market.brands.map(item => <option key={item}>{item}</option>)}
        </select>

        <label>{t('giftAmount', 'giftAmount')} ({market.currency})</label>
        <input
          type="number"
          min="1"
          step="0.01"
          required
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder={t('giftAmountPlaceholder', {currency: market.currency})}
        />

        <div className="easy-usd-preview">
          <strong>{t('giftUsdValue', 'Estimated USD value')}</strong>
          <p>
            {rateLoading ? t('giftRateLoading', 'Loading exchange rate...') :
              usdRate !== null && amount && Number(amount) > 0
                ? `USD ${(Number(amount) * usdRate).toFixed(2)}`
                : t('giftEnterAmount', 'Enter an amount to see the USD estimate.')}
          </p>
          {usdRate !== null && <small>Exchange rate: 1 ${market.currency} = USD ${usdRate.toFixed(6)}</small>}
          <small>{t('giftFinalCreditNote', 'Final wallet credit is determined after administrator verification.')}</small>
        </div>


        <label>{t('giftReference', 'Redemption reference')}</label>
        <input
          type="text"
          required
          maxLength="120"
          value={reference}
          onChange={e => setReference(e.target.value)}
          placeholder={t('giftReferencePlaceholder')}
        />

        <label>{t('giftUpload', 'giftUpload')}</label>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          required
          onChange={e => setPhoto(e.target.files?.[0] || null)}
        />

        {preview && (
          <img className="easy-gift-preview" src={preview} alt={t('giftPreviewAlt')} />
        )}

        <p className="easy-gift-notice">{t('giftUploadNotice')}</p>

        <button type="submit" disabled={busy}>
          {busy ? t('giftSubmitting') : t('giftSubmitButton')}
        </button>
      </form>

      {notice && <p role="status">{notice}</p>}

      <div className="gift-history-heading">
<h3>{t('giftMySubmissions')}</h3>
<button type="button" onClick={loadRecords}>{t("giftRefresh", "Refresh Status")}</button>
</div>
      {records.length === 0 && <p>{t('giftNoRecords', 'No gift card submissions yet.')}</p>}

      {records.map(record => (
        <article className="easy-gift-record" key={record.id}>
          <strong>{record.brand} — {record.currency_code} {Number(record.denomination).toFixed(2)}</strong>
          <p>{markets[record.country_code]?.name || record.country_code}</p>
          <p>{t('giftReferenceLabel')}: {record.redemption_reference}</p>
          <p>{t('giftStatusLabel')}: <strong>{t('giftStatus_' + record.status, record.status)}</strong></p>
{record.admin_note && <p><strong>{t('giftAdminNote', "Administrator's note")}:</strong> {record.admin_note}</p>}
          <small>{new Date(record.submitted_at).toLocaleString()}</small>
          {record.image_path && (
            <button type="button" onClick={() => showImage(record.image_path)}>
              {t('giftViewPicture')}
            </button>
          )}
          {record.admin_note && <p>{record.admin_note}</p>}
        </article>
      ))}
    </section>
  );
}
