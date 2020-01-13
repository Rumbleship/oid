export * from './checkdigit/historical.scopes';
export * from './banking/banking.scopes';

export enum CheckdigitScopes {
  Buyer = 'Buyer',
  Company = 'Company',
  PlaidItem = 'PlaidItem',
  Supplier = 'Supplier',
  DivisionRelationship = 'DivisionRelationship',
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
  BuyerApplication = 'BuyerApplication'
}
