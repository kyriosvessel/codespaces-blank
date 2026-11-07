import i18n from './i18n';

const translations = {
  en: { senderName: 'Sender name', senderAccountNumber: 'Sender account number', senderBankName: 'Sender bank name', transactionDate: 'Transaction date' , received: 'Received', sent: 'Sent', adjustment: 'Adjustment', senderInformation: 'Sender information', bankName: 'Bank name', accountNumber: 'Account number', balanceAfter: 'Balance after', transactionReference: 'Transaction reference'},
  zh: { senderName: '汇款人姓名', senderAccountNumber: '汇款人账号', senderBankName: '汇款人银行名称', transactionDate: '交易日期' , received: '收到', sent: '已发送', adjustment: '调整', senderInformation: '发送方信息', bankName: '银行名称', accountNumber: '账号', balanceAfter: '交易后余额', transactionReference: '交易参考'},
  es: { senderName: 'Nombre del remitente', senderAccountNumber: 'Número de cuenta del remitente', senderBankName: 'Banco del remitente', transactionDate: 'Fecha de la transacción' , received: 'Recibido', sent: 'Enviado', adjustment: 'Ajuste', senderInformation: 'Información del remitente', bankName: 'Nombre del banco', accountNumber: 'Número de cuenta', balanceAfter: 'Saldo después', transactionReference: 'Referencia de transacción'},
  pt: { senderName: 'Nome do remetente', senderAccountNumber: 'Número da conta do remetente', senderBankName: 'Banco do remetente', transactionDate: 'Data da transação' , received: 'Recebido', sent: 'Enviado', adjustment: 'Ajuste', senderInformation: 'Informações do remetente', bankName: 'Nome do banco', accountNumber: 'Número da conta', balanceAfter: 'Saldo após', transactionReference: 'Referência da transação'},
  vi: { senderName: 'Tên người gửi', senderAccountNumber: 'Số tài khoản người gửi', senderBankName: 'Tên ngân hàng người gửi', transactionDate: 'Ngày giao dịch' }
};

Object.entries(translations).forEach(([lang, values]) => {
  i18n.addResourceBundle(lang, 'translation', values, true, true);
});
