import i18n from './i18n';

const translations = {'en': {'digitalFunding': 'DIGITAL FUNDING', 'copyAccountNumber': 'COPY ACCOUNT NUMBER', 'secureWallet': 'Secure Wallet', 'addFunds': 'Add Funds', 'transactions': 'Transactions', 'giftCards': 'Gift Cards', 'contactAdmin': 'CONTACT ADMIN', 'servicesNotice': 'Deposit, withdrawal and money transfer services must be integrated and secured separately before you can use them.'}, 'zh': {'digitalFunding': '数字资金服务', 'copyAccountNumber': '复制账户号码', 'secureWallet': '安全钱包', 'addFunds': '添加资金', 'transactions': '交易记录', 'giftCards': '礼品卡', 'contactAdmin': '联系管理员', 'servicesNotice': '存款、提款和转账服务必须单独集成并确保安全后才能使用。'}, 'es': {'digitalFunding': 'FINANCIACIÓN DIGITAL', 'copyAccountNumber': 'COPIAR NÚMERO DE CUENTA', 'secureWallet': 'Cartera segura', 'addFunds': 'Añadir fondos', 'transactions': 'Transacciones', 'giftCards': 'Tarjetas de regalo', 'contactAdmin': 'CONTACTAR AL ADMINISTRADOR', 'servicesNotice': 'Los servicios de depósito, retiro y transferencia de dinero deben integrarse y protegerse por separado antes de que puedas utilizarlos.'}, 'pt': {'digitalFunding': 'FINANCIAMENTO DIGITAL', 'copyAccountNumber': 'COPIAR NÚMERO DA CONTA', 'secureWallet': 'Carteira segura', 'addFunds': 'Adicionar fundos', 'transactions': 'Transações', 'giftCards': 'Cartões-presente', 'contactAdmin': 'CONTACTAR O ADMINISTRADOR', 'servicesNotice': 'Os serviços de depósito, levantamento e transferência de dinheiro devem ser integrados e protegidos separadamente antes de poderem ser utilizados.'}, 'vi': {'digitalFunding': 'TÀI TRỢ KỸ THUẬT SỐ', 'copyAccountNumber': 'SAO CHÉP SỐ TÀI KHOẢN', 'secureWallet': 'Ví an toàn', 'addFunds': 'Thêm tiền', 'transactions': 'Giao dịch', 'giftCards': 'Thẻ quà tặng', 'contactAdmin': 'LIÊN HỆ QUẢN TRỊ VIÊN', 'servicesNotice': 'Các dịch vụ nạp tiền, rút tiền và chuyển tiền phải được tích hợp và bảo mật riêng trước khi bạn có thể sử dụng.'}};

Object.entries(translations).forEach(([language, values]) => {
  i18n.addResourceBundle(language, 'translation', values, true, true);
});

const giftTranslations = {
en: {giftCountryInstruction:'Select the country where your gift card was issued.',giftCardLabel:'GIFT CARD'},
zh: {giftCountryInstruction:'请选择礼品卡发行国家或地区。',giftCardLabel:'礼品卡'},
es: {giftCountryInstruction:'Selecciona el país donde se emitió tu tarjeta de regalo.',giftCardLabel:'TARJETA DE REGALO'},
pt: {giftCountryInstruction:'Selecione o país onde o seu cartão-presente foi emitido.',giftCardLabel:'CARTÃO-PRESENTE'},
vi: {giftCountryInstruction:'Chọn quốc gia nơi thẻ quà tặng của bạn được phát hành.',giftCardLabel:'THẺ QUÀ TẶNG'}
};
Object.entries(giftTranslations).forEach(([lang, values]) => {
  i18n.addResourceBundle(lang, 'translation', values, true, true);
});

const giftHistoryTranslations = {
  en: {giftMySubmissions:'My Gift Card Submissions',giftReferenceLabel:'Reference',giftViewPicture:'View my uploaded picture',giftStatus_pending:'Pending',giftStatus_approved:'Approved',giftStatus_rejected:'Rejected'},
  zh: {giftMySubmissions:'我的礼品卡提交记录',giftReferenceLabel:'参考编号',giftViewPicture:'查看我上传的图片',giftStatus_pending:'待审核',giftStatus_approved:'已批准',giftStatus_rejected:'已拒绝'},
  es: {giftMySubmissions:'Mis envíos de tarjetas de regalo',giftReferenceLabel:'Referencia',giftViewPicture:'Ver mi imagen cargada',giftStatus_pending:'Pendiente',giftStatus_approved:'Aprobado',giftStatus_rejected:'Rechazado'},
  pt: {giftMySubmissions:'Os meus envios de cartões-presente',giftReferenceLabel:'Referência',giftViewPicture:'Ver a imagem que enviei',giftStatus_pending:'Pendente',giftStatus_approved:'Aprovado',giftStatus_rejected:'Rejeitado'},
  vi: {giftMySubmissions:'Các thẻ quà tặng tôi đã gửi',giftReferenceLabel:'Mã tham chiếu',giftViewPicture:'Xem hình ảnh tôi đã tải lên',giftStatus_pending:'Đang chờ',giftStatus_approved:'Đã duyệt',giftStatus_rejected:'Bị từ chối'}
};
Object.entries(giftHistoryTranslations).forEach(([lang, values]) => {
  i18n.addResourceBundle(lang, 'translation', values, true, true);
});


const giftFormTranslations = {
  en: {
    giftAmountPlaceholder:'Enter amount in {currency}',
    giftReferencePlaceholder:'Enter reference or identifying code',
    giftPreviewAlt:'Gift card upload preview',
    giftUploadNotice:'Upload a clear picture. Only authorised administrators can review submitted images. Never upload a picture containing a gift card PIN or full redeemable code unless it is specifically required by the authorised redemption process.',
    giftSubmitting:'Submitting...',
    giftExchangeRate:'Exchange rate: 1 {currency} = USD ${rate}'
  },
  zh: {
    giftAmountPlaceholder:'输入金额（{currency}）',
    giftReferencePlaceholder:'输入参考编号或识别码',
    giftPreviewAlt:'礼品卡上传预览',
    giftUploadNotice:'请上传清晰的图片。只有获授权的管理员才能查看提交的图片。除非授权兑换流程明确要求，否则请勿上传包含礼品卡 PIN 码或完整兑换码的图片。',
    giftSubmitting:'正在提交...',
    giftExchangeRate:'汇率：1 {currency} = USD ${rate}'
  },
  es: {
    giftAmountPlaceholder:'Introduce el importe en {currency}',
    giftReferencePlaceholder:'Introduce la referencia o el código de identificación',
    giftPreviewAlt:'Vista previa de la imagen de la tarjeta de regalo',
    giftUploadNotice:'Sube una imagen clara. Solo los administradores autorizados pueden revisar las imágenes enviadas. Nunca subas una imagen que contenga el PIN o el código completo de canje de una tarjeta, salvo que el proceso autorizado lo requiera específicamente.',
    giftSubmitting:'Enviando...',
    giftExchangeRate:'Tipo de cambio: 1 {currency} = USD ${rate}'
  },
  pt: {
    giftAmountPlaceholder:'Introduza o valor em {currency}',
    giftReferencePlaceholder:'Introduza a referência ou o código de identificação',
    giftPreviewAlt:'Pré-visualização da imagem do cartão-presente',
    giftUploadNotice:'Carregue uma imagem nítida. Apenas administradores autorizados podem analisar as imagens enviadas. Nunca carregue uma imagem que contenha o PIN ou o código completo de resgate do cartão, salvo se o processo autorizado o exigir especificamente.',
    giftSubmitting:'A enviar...',
    giftExchangeRate:'Taxa de câmbio: 1 {currency} = USD ${rate}'
  },
  vi: {
    giftAmountPlaceholder:'Nhập số tiền bằng {currency}',
    giftReferencePlaceholder:'Nhập mã tham chiếu hoặc mã nhận dạng',
    giftPreviewAlt:'Xem trước hình ảnh thẻ quà tặng đã tải lên',
    giftUploadNotice:'Tải lên hình ảnh rõ nét. Chỉ quản trị viên được ủy quyền mới có thể xem xét hình ảnh đã gửi. Không tải lên hình ảnh có chứa mã PIN hoặc mã đổi thưởng đầy đủ của thẻ quà tặng, trừ khi quy trình đổi thưởng được ủy quyền yêu cầu cụ thể.',
    giftSubmitting:'Đang gửi...',
    giftExchangeRate:'Tỷ giá: 1 {currency} = USD ${rate}'
  }
};

Object.entries(giftFormTranslations).forEach(([lang, values]) => {
  i18n.addResourceBundle(lang, 'translation', values, true, true);
});


const finalCustomerLabels = {
en: {
 giftSubmitButton:'Submit gift card',
 giftStatusLabel:'Status',
 giftUploadNotice:'Upload a clear picture. Only authorised administrators can review submitted images. Never upload a picture containing a gift card PIN or full redeemable code unless it is specifically required by the authorised redemption process.'
},
zh: {
 giftSubmitButton:'提交礼品卡',
 giftStatusLabel:'状态',
 giftUploadNotice:'请上传清晰的图片。只有获授权的管理员才能审核提交的图片。除非授权兑换流程明确要求，否则请勿上传包含礼品卡 PIN 码或完整兑换码的图片。'
},
es: {
 giftSubmitButton:'Enviar tarjeta de regalo',
 giftStatusLabel:'Estado',
 giftUploadNotice:'Sube una imagen clara. Solo los administradores autorizados pueden revisar las imágenes enviadas. Nunca subas una imagen que contenga el PIN o el código completo de canje de una tarjeta, salvo que el proceso autorizado lo requiera específicamente.'
},
pt: {
 giftSubmitButton:'Enviar cartão-presente',
 giftStatusLabel:'Estado',
 giftUploadNotice:'Carregue uma imagem nítida. Apenas administradores autorizados podem analisar as imagens enviadas. Nunca carregue uma imagem que contenha o PIN ou o código completo de resgate do cartão, salvo se o processo autorizado o exigir especificamente.'
},
vi: {
 giftSubmitButton:'Gửi thẻ quà tặng',
 giftStatusLabel:'Trạng thái',
 giftUploadNotice:'Tải lên hình ảnh rõ nét. Chỉ quản trị viên được ủy quyền mới có thể xem xét hình ảnh đã gửi. Không tải lên hình ảnh có chứa mã PIN hoặc mã đổi thưởng đầy đủ của thẻ quà tặng, trừ khi quy trình được ủy quyền yêu cầu cụ thể.'
}
};

Object.entries(finalCustomerLabels).forEach(([lang, values]) => {
 i18n.addResourceBundle(lang, 'translation', values, true, true);
});


const completeCustomerTranslations = {
en: {
paymentReferenceOptional:'Payment reference (optional)',submitting:'Submitting...',submitDepositRequest:'Submit Deposit Request',viewMyDepositRequests:'View My Deposit Requests',statusLabel:'Status',status_pending:'Pending',status_approved:'Approved',status_rejected:'Rejected',transferSecurely:'Transfer Securely',cancelPinSetup:'Cancel PIN Setup',setUpTransferPin:'Set Up Transfer PIN',createPin:'Create PIN',pinMustBeSixDigits:'Your PIN must contain exactly 6 digits.',pinCreatedNotice:'Transfer PIN created successfully. Keep it private.',enterSixDigitPin:'Enter your 6-digit Transfer PIN.',invalidRecipientAmount:'Enter a valid recipient Wallet ID and amount.',transferFailedNotice:'Transfer could not be completed. Please check your details.',myWalletId:'My Wallet ID',copyWalletId:'Copy Wallet ID',walletIdCopied:'Wallet ID copied successfully!',walletIdLoadFailed:'Could not load your Wallet ID. Please refresh.',walletIdManualCopy:'Please copy your Wallet ID manually: '
},
zh: {
paymentReferenceOptional:'付款参考编号（选填）',submitting:'正在提交...',submitDepositRequest:'提交存款申请',viewMyDepositRequests:'查看我的存款申请',statusLabel:'状态',status_pending:'待处理',status_approved:'已批准',status_rejected:'已拒绝',transferSecurely:'安全转账',cancelPinSetup:'取消 PIN 设置',setUpTransferPin:'设置转账 PIN',createPin:'创建 PIN',pinMustBeSixDigits:'您的 PIN 必须正好包含 6 位数字。',pinCreatedNotice:'转账 PIN 已成功创建。请妥善保管。',enterSixDigitPin:'请输入 6 位转账 PIN。',invalidRecipientAmount:'请输入有效的收款人钱包 ID 和金额。',transferFailedNotice:'转账未能完成。请检查您的信息。',myWalletId:'我的钱包 ID',copyWalletId:'复制钱包 ID',walletIdCopied:'钱包 ID 已成功复制！',walletIdLoadFailed:'无法加载钱包 ID。请刷新页面。',walletIdManualCopy:'请手动复制您的钱包 ID：'
},
es: {
paymentReferenceOptional:'Referencia de pago (opcional)',submitting:'Enviando...',submitDepositRequest:'Enviar solicitud de depósito',viewMyDepositRequests:'Ver mis solicitudes de depósito',statusLabel:'Estado',status_pending:'Pendiente',status_approved:'Aprobado',status_rejected:'Rechazado',transferSecurely:'Transferir de forma segura',cancelPinSetup:'Cancelar configuración del PIN',setUpTransferPin:'Configurar PIN de transferencia',createPin:'Crear PIN',pinMustBeSixDigits:'Tu PIN debe contener exactamente 6 dígitos.',pinCreatedNotice:'El PIN de transferencia se creó correctamente. Guárdalo en privado.',enterSixDigitPin:'Introduce tu PIN de transferencia de 6 dígitos.',invalidRecipientAmount:'Introduce un ID de cartera del destinatario y un importe válidos.',transferFailedNotice:'No se pudo completar la transferencia. Comprueba tus datos.',myWalletId:'Mi ID de cartera',copyWalletId:'Copiar ID de cartera',walletIdCopied:'¡ID de cartera copiado correctamente!',walletIdLoadFailed:'No se pudo cargar tu ID de cartera. Actualiza la página.',walletIdManualCopy:'Copia manualmente tu ID de cartera: '
},
pt: {
paymentReferenceOptional:'Referência de pagamento (opcional)',submitting:'A enviar...',submitDepositRequest:'Enviar pedido de depósito',viewMyDepositRequests:'Ver os meus pedidos de depósito',statusLabel:'Estado',status_pending:'Pendente',status_approved:'Aprovado',status_rejected:'Rejeitado',transferSecurely:'Transferir em segurança',cancelPinSetup:'Cancelar configuração do PIN',setUpTransferPin:'Configurar PIN de transferência',createPin:'Criar PIN',pinMustBeSixDigits:'O seu PIN deve conter exatamente 6 dígitos.',pinCreatedNotice:'O PIN de transferência foi criado com sucesso. Mantenha-o privado.',enterSixDigitPin:'Introduza o seu PIN de transferência de 6 dígitos.',invalidRecipientAmount:'Introduza um ID de carteira do destinatário e um valor válidos.',transferFailedNotice:'Não foi possível concluir a transferência. Verifique os seus dados.',myWalletId:'O meu ID da carteira',copyWalletId:'Copiar ID da carteira',walletIdCopied:'ID da carteira copiado com sucesso!',walletIdLoadFailed:'Não foi possível carregar o ID da carteira. Atualize a página.',walletIdManualCopy:'Copie manualmente o seu ID da carteira: '
},
vi: {
paymentReferenceOptional:'Mã tham chiếu thanh toán (không bắt buộc)',submitting:'Đang gửi...',submitDepositRequest:'Gửi yêu cầu nạp tiền',viewMyDepositRequests:'Xem yêu cầu nạp tiền của tôi',statusLabel:'Trạng thái',status_pending:'Đang chờ',status_approved:'Đã duyệt',status_rejected:'Bị từ chối',transferSecurely:'Chuyển tiền an toàn',cancelPinSetup:'Hủy cài đặt mã PIN',setUpTransferPin:'Thiết lập mã PIN chuyển tiền',createPin:'Tạo mã PIN',pinMustBeSixDigits:'Mã PIN phải có chính xác 6 chữ số.',pinCreatedNotice:'Mã PIN chuyển tiền đã được tạo thành công. Hãy giữ bí mật mã PIN.',enterSixDigitPin:'Nhập mã PIN chuyển tiền gồm 6 chữ số.',invalidRecipientAmount:'Nhập ID ví người nhận và số tiền hợp lệ.',transferFailedNotice:'Không thể hoàn tất giao dịch chuyển tiền. Vui lòng kiểm tra thông tin.',myWalletId:'ID ví của tôi',copyWalletId:'Sao chép ID ví',walletIdCopied:'Đã sao chép ID ví thành công!',walletIdLoadFailed:'Không thể tải ID ví. Vui lòng làm mới trang.',walletIdManualCopy:'Vui lòng sao chép ID ví theo cách thủ công: '
}
};
Object.entries(completeCustomerTranslations).forEach(([lang, values]) => {
  i18n.addResourceBundle(lang, 'translation', values, true, true);
});

const giftFormLabelsAllLanguages = {
en:{giftCountry:'Country or market',giftSelectedCard:'Selected gift card',giftAmount:'Card value',giftUpload:'Upload gift card image',giftAmountPlaceholder:'Enter amount in {{currency}}',giftExchangeRateLine:'Exchange rate: 1 {{currency}} = USD ${{rate}}'},
zh:{giftCountry:'国家或地区',giftSelectedCard:'已选礼品卡',giftAmount:'礼品卡面值',giftUpload:'上传礼品卡图片',giftAmountPlaceholder:'输入{{currency}}金额',giftExchangeRateLine:'汇率：1 {{currency}} = USD ${{rate}}'},
es:{giftCountry:'País o mercado',giftSelectedCard:'Tarjeta regalo seleccionada',giftAmount:'Valor de la tarjeta',giftUpload:'Subir imagen de la tarjeta regalo',giftAmountPlaceholder:'Introduce el importe en {{currency}}',giftExchangeRateLine:'Tipo de cambio: 1 {{currency}} = USD ${{rate}}'},
pt:{giftCountry:'País ou mercado',giftSelectedCard:'Cartão-presente selecionado',giftAmount:'Valor do cartão',giftUpload:'Carregar imagem do cartão-presente',giftAmountPlaceholder:'Introduza o valor em {{currency}}',giftExchangeRateLine:'Taxa de câmbio: 1 {{currency}} = USD ${{rate}}'},
vi:{giftCountry:'Quốc gia hoặc thị trường',giftSelectedCard:'Thẻ quà tặng đã chọn',giftAmount:'Giá trị thẻ',giftUpload:'Tải ảnh thẻ quà tặng lên',giftAmountPlaceholder:'Nhập số tiền bằng {{currency}}',giftExchangeRateLine:'Tỷ giá: 1 {{currency}} = USD ${{rate}}'}
};
Object.entries(giftFormLabelsAllLanguages).forEach(([lang, values]) => i18n.addResourceBundle(lang,'translation',values,true,true));

const welcomeScreenTranslations = {
en:{welcomeHeadline:'Your money. Your control.',welcomeIntro:'Welcome to Easy $ Funding.',createAccountButton:'Create Account',signInButton:'Sign In',accountSecurity:'Account security',protectAccount:'Protect your account with a strong password.',backToWelcome:'Back to welcome',enterDetails:'Enter your details to get started.'},
zh:{welcomeHeadline:'你的资金，由你掌控。',welcomeIntro:'欢迎使用 Easy $ Funding。',createAccountButton:'创建账户',signInButton:'登录',accountSecurity:'账户安全',protectAccount:'请使用强密码保护你的账户。',backToWelcome:'返回欢迎页',enterDetails:'请输入资料以开始使用。'},
es:{welcomeHeadline:'Tu dinero. Tú tienes el control.',welcomeIntro:'Te damos la bienvenida a Easy $ Funding.',createAccountButton:'Crear cuenta',signInButton:'Iniciar sesión',accountSecurity:'Seguridad de la cuenta',protectAccount:'Protege tu cuenta con una contraseña segura.',backToWelcome:'Volver a bienvenida',enterDetails:'Introduce tus datos para comenzar.'},
pt:{welcomeHeadline:'Seu dinheiro. Você no controle.',welcomeIntro:'Boas-vindas ao Easy $ Funding.',createAccountButton:'Criar conta',signInButton:'Entrar',accountSecurity:'Segurança da conta',protectAccount:'Proteja sua conta com uma senha forte.',backToWelcome:'Voltar à página inicial',enterDetails:'Insira seus dados para começar.'},
vi:{welcomeHeadline:'Tiền của bạn. Bạn làm chủ.',welcomeIntro:'Chào mừng bạn đến với Easy $ Funding.',createAccountButton:'Tạo tài khoản',signInButton:'Đăng nhập',accountSecurity:'Bảo mật tài khoản',protectAccount:'Hãy bảo vệ tài khoản bằng mật khẩu mạnh.',backToWelcome:'Quay lại trang chào mừng',enterDetails:'Nhập thông tin để bắt đầu.'}
};
for (const [lang, values] of Object.entries(welcomeScreenTranslations)) i18n.addResourceBundle(lang,'translation',values,true,true);
