import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const languages = {
  en: { translation: {
    welcome: 'Welcome to Easy $ Funding',
    balance: 'TOTAL WALLET BALANCE',
    transactions: 'Transaction History',
    loading: 'Loading balance...',
    noWallet: 'No wallet found',
    account: 'Your Easy $ Funding account',
    received: 'Money Received',
    sent: 'Money Sent',
    adjustment: 'Wallet Adjustment',
    balanceAfter: 'Balance after',
    loadingTransactions: 'Loading transactions...',
    noTransactions: 'No transactions yet',
    makeDeposit: 'Make a Deposit',
    depositAmount: 'Deposit amount',
    paymentMethod: 'Payment method',
    paymentReference: 'Enter your payment reference',
    submitDeposit: 'Submit deposit request',
    transferFunds: 'Transfer Funds',
    recipientWallet: 'Recipient Wallet ID',
    enterRecipient: 'Enter recipient Wallet ID',
    amountLabel: 'Amount',
    privateTransferPin: 'Private 6-digit Transfer PIN',
    enterPin: 'Enter your PIN',
    transferSecurely: 'Transfer Securely',
    setupTransferPin: 'Set Up Transfer PIN',
    cancelPinSetup: 'Cancel PIN Setup',
    createNewPin: 'Create a new 6-digit PIN',
    chooseSixDigits: 'Choose 6 digits',
    depositHistory: 'Deposit History',
    loadingDepositHistory: 'Loading deposit history...',
    noDepositRequests: 'You have no deposit requests yet.',
    amountLabelHistory: 'Amount:',
    methodLabel: 'Method:',
    statusLabel: 'Status:',
    createAccountTitle: 'Create your account',
    welcomeBack: 'Welcome back',
    loginInstruction: 'Sign in with your registered email and password.',
    emailAddress: 'Email address',
    password: 'Password',
    confirmPassword: 'Confirm password',
    createAccount: 'Create Account', signIn: 'Sign In',
    alreadyRegistered: 'Already registered?',
    noAccount: "Don't have an account?",
    pleaseWait: 'Please wait...',
    walletDashboard: 'Wallet dashboard',
    accountConnected: 'Your account is connected.'
  }},
  zh: { translation: {
    welcome: '欢迎使用 Easy $ Funding',
    balance: '钱包总余额',
    transactions: '交易记录',
    loading: '正在加载余额...',
    noWallet: '未找到钱包',
    account: '您的 Easy $ Funding 账户',
    received: '收到款项',
    sent: '已转出款项',
    adjustment: '钱包调整',
    balanceAfter: '交易后余额',
    loadingTransactions: '正在加载交易...',
    noTransactions: '暂无交易记录',
    makeDeposit: '申请存款',
    depositAmount: '存款金额',
    paymentMethod: '付款方式',
    paymentReference: '输入付款参考编号',
    submitDeposit: '提交存款申请',
    transferFunds: '转账',
    recipientWallet: '收款人钱包 ID',
    enterRecipient: '输入收款人钱包 ID',
    amountLabel: '金额',
    privateTransferPin: '私人六位数转账 PIN',
    enterPin: '输入您的 PIN',
    transferSecurely: '安全转账',
    setupTransferPin: '设置转账 PIN',
    cancelPinSetup: '取消 PIN 设置',
    createNewPin: '创建新的六位数 PIN',
    chooseSixDigits: '选择六位数字',
    depositHistory: '存款记录',
    loadingDepositHistory: '正在加载存款记录...',
    noDepositRequests: '您还没有存款申请。',
    amountLabelHistory: '金额：',
    methodLabel: '方式：',
    statusLabel: '状态：',
    createAccountTitle: '创建您的账户',
    welcomeBack: '欢迎回来',
    loginInstruction: '使用您注册的电子邮件和密码登录。',
    emailAddress: '电子邮件地址',
    password: '密码',
    confirmPassword: '确认密码',
    createAccount: '创建账户', signIn: '登录',
    alreadyRegistered: '已经注册？',
    noAccount: '还没有账户？',
    pleaseWait: '请稍候...',
    walletDashboard: '钱包仪表板',
    accountConnected: '您的账户已连接。'
  }},
  es: { translation: {
    welcome: 'Bienvenido a Easy $ Funding',
    balance: 'SALDO TOTAL DE LA CARTERA',
    transactions: 'Historial de transacciones',
    loading: 'Cargando saldo...',
    noWallet: 'No se encontró ninguna cartera',
    account: 'Tu cuenta de Easy $ Funding',
    received: 'Dinero recibido',
    sent: 'Dinero enviado',
    adjustment: 'Ajuste de cartera',
    balanceAfter: 'Saldo después',
    loadingTransactions: 'Cargando transacciones...',
    noTransactions: 'Aún no hay transacciones',
    makeDeposit: 'Realizar un depósito',
    depositAmount: 'Importe del depósito',
    paymentMethod: 'Método de pago',
    paymentReference: 'Introduce la referencia de pago',
    submitDeposit: 'Enviar solicitud de depósito',
    transferFunds: 'Transferir fondos',
    recipientWallet: 'ID de cartera del destinatario',
    enterRecipient: 'Introduce el ID de cartera',
    amountLabel: 'Importe',
    privateTransferPin: 'PIN privado de transferencia de 6 dígitos',
    enterPin: 'Introduce tu PIN',
    transferSecurely: 'Transferir de forma segura',
    setupTransferPin: 'Configurar PIN',
    cancelPinSetup: 'Cancelar configuración',
    createNewPin: 'Crear un nuevo PIN de 6 dígitos',
    chooseSixDigits: 'Elige 6 dígitos',
    depositHistory: 'Historial de depósitos',
    loadingDepositHistory: 'Cargando historial de depósitos...',
    noDepositRequests: 'Aún no tienes solicitudes de depósito.',
    amountLabelHistory: 'Importe:',
    methodLabel: 'Método:',
    statusLabel: 'Estado:',
    createAccountTitle: 'Crea tu cuenta',
    welcomeBack: 'Bienvenido de nuevo',
    loginInstruction: 'Inicia sesión con tu correo electrónico y contraseña registrados.',
    emailAddress: 'Correo electrónico',
    password: 'Contraseña',
    confirmPassword: 'Confirmar contraseña',
    createAccount: 'Crear cuenta', signIn: 'Iniciar sesión',
    alreadyRegistered: '¿Ya estás registrado?',
    noAccount: '¿No tienes una cuenta?',
    pleaseWait: 'Espera...',
    walletDashboard: 'Panel de cartera',
    accountConnected: 'Tu cuenta está conectada.'
  }},
  pt: { translation: {
    welcome: 'Bem-vindo ao Easy $ Funding',
    balance: 'SALDO TOTAL DA CARTEIRA',
    transactions: 'Histórico de transações',
    loading: 'Carregando saldo...',
    noWallet: 'Nenhuma carteira encontrada',
    account: 'Sua conta Easy $ Funding',
    received: 'Dinheiro recebido',
    sent: 'Dinheiro enviado',
    adjustment: 'Ajuste da carteira',
    balanceAfter: 'Saldo após',
    loadingTransactions: 'Carregando transações...',
    noTransactions: 'Nenhuma transação ainda',
    makeDeposit: 'Fazer um depósito',
    depositAmount: 'Valor do depósito',
    paymentMethod: 'Método de pagamento',
    paymentReference: 'Digite a referência do pagamento',
    submitDeposit: 'Enviar pedido de depósito',
    transferFunds: 'Transferir fundos',
    recipientWallet: 'ID da carteira do destinatário',
    enterRecipient: 'Digite o ID da carteira',
    amountLabel: 'Valor',
    privateTransferPin: 'PIN privado de transferência de 6 dígitos',
    enterPin: 'Digite seu PIN',
    transferSecurely: 'Transferir com segurança',
    setupTransferPin: 'Configurar PIN',
    cancelPinSetup: 'Cancelar configuração',
    createNewPin: 'Criar um novo PIN de 6 dígitos',
    chooseSixDigits: 'Escolha 6 dígitos',
    depositHistory: 'Histórico de depósitos',
    loadingDepositHistory: 'Carregando histórico de depósitos...',
    noDepositRequests: 'Você ainda não tem pedidos de depósito.',
    amountLabelHistory: 'Valor:',
    methodLabel: 'Método:',
    statusLabel: 'Estado:',
    createAccountTitle: 'Crie sua conta',
    welcomeBack: 'Bem-vindo de volta',
    loginInstruction: 'Entre com seu e-mail e senha cadastrados.',
    emailAddress: 'Endereço de e-mail',
    password: 'Senha',
    confirmPassword: 'Confirmar senha',
    createAccount: 'Criar conta', signIn: 'Entrar',
    alreadyRegistered: 'Já está registrado?',
    noAccount: 'Não tem uma conta?',
    pleaseWait: 'Aguarde...',
    walletDashboard: 'Painel da carteira',
    accountConnected: 'Sua conta está conectada.'
  }},
  vi: { translation: {
    welcome: 'Chào mừng đến Easy $ Funding',
    balance: 'TỔNG SỐ DƯ VÍ',
    transactions: 'Lịch sử giao dịch',
    loading: 'Đang tải số dư...',
    noWallet: 'Không tìm thấy ví',
    account: 'Tài khoản Easy $ Funding của bạn',
    received: 'Tiền nhận được',
    sent: 'Tiền đã gửi',
    adjustment: 'Điều chỉnh ví',
    balanceAfter: 'Số dư sau giao dịch',
    loadingTransactions: 'Đang tải giao dịch...',
    noTransactions: 'Chưa có giao dịch nào',
    makeDeposit: 'Nạp tiền',
    depositAmount: 'Số tiền nạp',
    paymentMethod: 'Phương thức thanh toán',
    paymentReference: 'Nhập mã tham chiếu thanh toán',
    submitDeposit: 'Gửi yêu cầu nạp tiền',
    transferFunds: 'Chuyển tiền',
    recipientWallet: 'ID ví người nhận',
    enterRecipient: 'Nhập ID ví người nhận',
    amountLabel: 'Số tiền',
    privateTransferPin: 'Mã PIN chuyển tiền riêng gồm 6 chữ số',
    enterPin: 'Nhập mã PIN',
    transferSecurely: 'Chuyển tiền an toàn',
    setupTransferPin: 'Thiết lập mã PIN',
    cancelPinSetup: 'Hủy thiết lập',
    createNewPin: 'Tạo mã PIN mới gồm 6 chữ số',
    chooseSixDigits: 'Chọn 6 chữ số',
    depositHistory: 'Lịch sử nạp tiền',
    loadingDepositHistory: 'Đang tải lịch sử nạp tiền...',
    noDepositRequests: 'Bạn chưa có yêu cầu nạp tiền nào.',
    amountLabelHistory: 'Số tiền:',
    methodLabel: 'Phương thức:',
    statusLabel: 'Trạng thái:',
    createAccountTitle: 'Tạo tài khoản',
    welcomeBack: 'Chào mừng trở lại',
    loginInstruction: 'Đăng nhập bằng email và mật khẩu đã đăng ký.',
    emailAddress: 'Địa chỉ email',
    password: 'Mật khẩu',
    confirmPassword: 'Xác nhận mật khẩu',
    createAccount: 'Tạo tài khoản', signIn: 'Đăng nhập',
    alreadyRegistered: 'Đã đăng ký?',
    noAccount: 'Chưa có tài khoản?',
    pleaseWait: 'Vui lòng đợi...',
    walletDashboard: 'Bảng điều khiển ví',
    accountConnected: 'Tài khoản của bạn đã được kết nối.'
  }}
};

i18n.use(initReactI18next).init({
  resources: languages,
  lng: localStorage.getItem('easy-language') || 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});



export async function detectLanguage() {
  const saved = localStorage.getItem("easy-language");
  const source = localStorage.getItem("easy-language-source");

  if (saved && source !== "auto") return;

  async function getIPCountry() {
    try {
      const r = await fetch("https://ipapi.co/json/");
      if (!r.ok) return null;
      const d = await r.json();
      return d.country_code || d.country || null;
    } catch {
      return null;
    }
  }

  function getGPSCountry() {
    return new Promise(resolve => {
      if (!navigator.geolocation) return resolve(null);

      navigator.geolocation.getCurrentPosition(async position => {
        try {
          const { latitude, longitude } = position.coords;
          const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
          const r = await fetch(url);
          if (!r.ok) return resolve(null);
          const d = await r.json();
          resolve(d.countryCode || null);
        } catch {
          resolve(null);
        }
      }, () => resolve(null), {
        enableHighAccuracy: false,
        timeout: 8000,
        maximumAge: 0
      });
    });
  }

  const [ipCountry, gpsCountry] = await Promise.all([
    getIPCountry(),
    getGPSCountry()
  ]);

  const country = (
    ipCountry && gpsCountry && ipCountry !== gpsCountry
      ? ipCountry
      : gpsCountry || ipCountry || ""
  ).toUpperCase();

  const spanish = [
    "ES","MX","AR","CO","CL","PE","VE","EC","BO","PY",
    "UY","CR","PA","GT","HN","SV","NI","CU","DO"
  ];

  const portuguese = ["PT","BR","AO","MZ","CV","GW","ST","TL"];

  let language = "en";

  if (["CN","TW","HK","MO","SG"].includes(country)) language = "zh";
  else if (spanish.includes(country)) language = "es";
  else if (portuguese.includes(country)) language = "pt";
  else if (country === "VN") language = "vi";

  if (!country && saved) return;

  await i18n.changeLanguage(language);
  localStorage.setItem("easy-language", language);
  localStorage.setItem("easy-language-source", "auto");
  if (country) localStorage.setItem("easy-login-country", country);
}

detectLanguage();
export default i18n;
