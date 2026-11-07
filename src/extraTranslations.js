import i18n from './i18n.js';

const extra = {
  en: {
    enterAmount: 'Enter amount',
    enterBankName: 'Enter bank name',
    enterAccountName: 'Enter account name',
    enterAccountNumber: 'Enter account number',
    enterBankAddress: 'Enter bank address',
    enterWalletAddress: 'Enter wallet address',
    enterNetwork: 'Enter network',
    enterGiftCode: 'Enter gift card code',
    enterCardValue: 'Enter card value',
    physicalDigital: 'Physical or digital',
    optionalReference: 'Optional reference',
    giftBrandExample: 'e.g. Amazon, Apple'
  },
  es: {
    enterAmount: 'Introduce el importe',
    enterBankName: 'Introduce el nombre del banco',
    enterAccountName: 'Introduce el nombre de la cuenta',
    enterAccountNumber: 'Introduce el número de cuenta',
    enterBankAddress: 'Introduce la dirección del banco',
    enterWalletAddress: 'Introduce la dirección de la cartera',
    enterNetwork: 'Introduce la red',
    enterGiftCode: 'Introduce el código de la tarjeta regalo',
    enterCardValue: 'Introduce el valor de la tarjeta',
    physicalDigital: 'Física o digital',
    optionalReference: 'Referencia opcional',
    giftBrandExample: 'Por ejemplo: Amazon, Apple'
  },
  pt: {
    enterAmount: 'Introduza o valor',
    enterBankName: 'Introduza o nome do banco',
    enterAccountName: 'Introduza o nome da conta',
    enterAccountNumber: 'Introduza o número da conta',
    enterBankAddress: 'Introduza o endereço do banco',
    enterWalletAddress: 'Introduza o endereço da carteira',
    enterNetwork: 'Introduza a rede',
    enterGiftCode: 'Introduza o código do cartão-presente',
    enterCardValue: 'Introduza o valor do cartão',
    physicalDigital: 'Físico ou digital',
    optionalReference: 'Referência opcional',
    giftBrandExample: 'Ex.: Amazon, Apple'
  },
  zh: {
    enterAmount: '请输入金额',
    enterBankName: '请输入银行名称',
    enterAccountName: '请输入账户名称',
    enterAccountNumber: '请输入账号',
    enterBankAddress: '请输入银行地址',
    enterWalletAddress: '请输入钱包地址',
    enterNetwork: '请输入网络',
    enterGiftCode: '请输入礼品卡代码',
    enterCardValue: '请输入礼品卡金额',
    physicalDigital: '实体或数字',
    optionalReference: '选填参考信息',
    giftBrandExample: '例如：Amazon、Apple'
  },
  vi: {
    enterAmount: 'Nhập số tiền',
    enterBankName: 'Nhập tên ngân hàng',
    enterAccountName: 'Nhập tên tài khoản',
    enterAccountNumber: 'Nhập số tài khoản',
    enterBankAddress: 'Nhập địa chỉ ngân hàng',
    enterWalletAddress: 'Nhập địa chỉ ví',
    enterNetwork: 'Nhập mạng',
    enterGiftCode: 'Nhập mã thẻ quà tặng',
    enterCardValue: 'Nhập giá trị thẻ',
    physicalDigital: 'Vật lý hoặc kỹ thuật số',
    optionalReference: 'Thông tin tham chiếu tùy chọn',
    giftBrandExample: 'Ví dụ: Amazon, Apple'
  }
};

for (const [language, values] of Object.entries(extra)) {
  i18n.addResourceBundle(language, 'translation', values, true, true);
}
