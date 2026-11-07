import i18n from './i18n';
const words = {
en:{transferFunds:'Transfer Funds',amountUsd:'Amount (USD)',loadingWalletId:'Loading your Wallet ID...',shareWalletId:'Share this ID with people who want to send you money.'},
zh:{transferFunds:'转账',amountUsd:'金额（美元）',loadingWalletId:'正在加载您的钱包 ID...',shareWalletId:'与想向您转账的人分享此 ID。'},
es:{transferFunds:'Transferir fondos',amountUsd:'Importe (USD)',loadingWalletId:'Cargando tu ID de cartera...',shareWalletId:'Comparte este ID con las personas que quieran enviarte dinero.'},
pt:{transferFunds:'Transferir fundos',amountUsd:'Valor (USD)',loadingWalletId:'A carregar o seu ID da carteira...',shareWalletId:'Partilhe este ID com quem quiser enviar-lhe dinheiro.'},
vi:{transferFunds:'Chuyển tiền',amountUsd:'Số tiền (USD)',loadingWalletId:'Đang tải ID ví của bạn...',shareWalletId:'Chia sẻ ID này với những người muốn gửi tiền cho bạn.'}
};
for (const [lang, values] of Object.entries(words)) i18n.addResourceBundle(lang,'translation',values,true,true);
