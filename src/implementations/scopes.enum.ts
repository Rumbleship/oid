export * from './checkdigit/historical.scopes';

export enum CheckdigitScopes {
  ApiKey = 'ApiKey',
  Buyer = 'Buyer',
  Company = 'Company',
  PlaidItem = 'PlaidItem',
  BalanceCheck = 'BalanceCheck',
  Supplier = 'Supplier',
  DivisionRelationship = 'DivisionRelationship',
  DivisionUser = 'DivisionUser',
  TermsChoice = 'TermsChoice',
  ShopifyCredential = 'ShopifyCredential',
  WoocommerceCredential = 'WoocommerceCredential',
  BigcommerceCredential = 'BigcommerceCredential',
  TradegeckoCredential = 'TradegeckoCredential',
  // Arbiter - choreographer
  Workflow = 'Workflow',
  AuditEntry = 'AuditEntry',
  DisposedEvent = 'DisposedEvent',
  PendingEvent = 'PendingEvent',
  // Arbiter - BuyerOnboarding
  BuyerApplication = 'BuyerApplication',
  // Arbiter -- RunAchFile
  AchFile = 'AchFile',
  // Banking -- transitioned from old ~oids
  AchGateway = 'AchGateway',
  BankAccount = 'BankAccount',
  BankTransaction = 'BankTransaction',
  Batch = 'Batch',
  OrderReference = 'OrderReference',
  PaymentRequest = 'PaymentRequest',
  PlaidIdentity = 'PlaidIdentity',
  PlaidIdentityEntry = 'PlaidIdentityEntry',
  PlaidWebhook = 'PlaidWebhook',
  PlaidTransaction = 'PlaidTransaction',
  // Orders
  Order = 'Order',
  Contract = 'Contract',
  LineItem = 'LineItem',
  LineItemEvent = 'LineItemEvent',
  OrderEvent = 'OrderEvent',
  Term = 'Term',
  // Accruals
  Accrual = 'Accrual',
  AccrualEvent = 'AccrualEvent',
  JournalEntry = 'JournalEntry',
  // QueuedSubscriptionManagement (Qsr)
  QueuedSubscriptionRequest = 'QueuedSubscriptionRequest',
  Webhook = 'Webhook',
  QsrService = 'QsrService',
  QsrCache = 'QsrCache'
}
