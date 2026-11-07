import i18n from './i18n.js';

const words = {
  en: { privateTransferPin: 'Private Transfer PIN', setUpTransferPin: 'Set Up Transfer PIN', dashboardTitle: 'Wallet Dashboard' },
  es: { privateTransferPin: 'PIN de transferencia privada', setUpTransferPin: 'Configurar PIN de transferencia', dashboardTitle: 'Panel de la cartera' },
  pt: { privateTransferPin: 'PIN de transferência privada', setUpTransferPin: 'Configurar PIN de transferência', dashboardTitle: 'Painel da carteira' },
  zh: { privateTransferPin: '私人转账密码', setUpTransferPin: '设置转账密码', dashboardTitle: '钱包仪表板' },
  vi: { privateTransferPin: 'Mã PIN chuyển tiền riêng', setUpTransferPin: 'Thiết lập mã PIN chuyển tiền', dashboardTitle: 'Bảng điều khiển ví' }
};

for (const [language, values] of Object.entries(words)) {
  i18n.addResourceBundle(language, 'translation', values, true, true);
}
