import { AlphaHashidScopes, CheckdigitScopes } from './implementations/scopes.enum';
import { Oid } from './oid';

/**
 * To add a new scope, declare it as in the CheckdigitScopes enum, and then its shortcode here.
 */
export const Registry = Object.freeze({
  [CheckdigitScopes.Buyer]: Oid.RegisterScope(CheckdigitScopes.Buyer, 'b'),
  [CheckdigitScopes.Company]: Oid.RegisterScope(CheckdigitScopes.Company, 'co'),
  [CheckdigitScopes.PlaidItem]: Oid.RegisterScope(CheckdigitScopes.PlaidItem, 'pitem'),
  [CheckdigitScopes.BalanceCheck]: Oid.RegisterScope(CheckdigitScopes.BalanceCheck, 'bal'),
  [CheckdigitScopes.AchFile]: Oid.RegisterScope(CheckdigitScopes.AchFile, 'ach'),
  [AlphaHashidScopes.PurchaseOrder]: Oid.RegisterScope(AlphaHashidScopes.PurchaseOrder, 'po'),
  [AlphaHashidScopes.Shipment]: Oid.RegisterScope(AlphaHashidScopes.Shipment, 'shp'),
  [CheckdigitScopes.Supplier]: Oid.RegisterScope(CheckdigitScopes.Supplier, 's'),
  [AlphaHashidScopes.User]: Oid.RegisterScope(AlphaHashidScopes.User, 'u'),
  [CheckdigitScopes.DivisionRelationship]: Oid.RegisterScope(
    CheckdigitScopes.DivisionRelationship,
    'bsr'
  ),
  [CheckdigitScopes.TermsChoice]: Oid.RegisterScope(CheckdigitScopes.TermsChoice, 'tc'),
  [CheckdigitScopes.ShopifyCredential]: Oid.RegisterScope(
    CheckdigitScopes.ShopifyCredential,
    'shopifycred'
  ),
  [CheckdigitScopes.WoocommerceCredential]: Oid.RegisterScope(
    CheckdigitScopes.WoocommerceCredential,
    'wccred'
  ),
  [CheckdigitScopes.BigcommerceCredential]: Oid.RegisterScope(
    CheckdigitScopes.BigcommerceCredential,
    'bccred'
  ),
  [CheckdigitScopes.TradegeckoCredential]: Oid.RegisterScope(
    CheckdigitScopes.TradegeckoCredential,
    'tgcred'
  ),
  [CheckdigitScopes.AuditEntry]: Oid.RegisterScope(CheckdigitScopes.AuditEntry, 'ae'),
  [CheckdigitScopes.BuyerApplication]: Oid.RegisterScope(CheckdigitScopes.BuyerApplication, 'bap'),
  [CheckdigitScopes.DisposedEvent]: Oid.RegisterScope(CheckdigitScopes.DisposedEvent, 'de'),
  [CheckdigitScopes.PendingEvent]: Oid.RegisterScope(CheckdigitScopes.PendingEvent, 'pe'),
  [CheckdigitScopes.Workflow]: Oid.RegisterScope(CheckdigitScopes.Workflow, 'wf'),
  [CheckdigitScopes.AchGateway]: Oid.RegisterScope(CheckdigitScopes.AchGateway, 'gate'),
  [CheckdigitScopes.BankAccount]: Oid.RegisterScope(CheckdigitScopes.BankAccount, 'ba'),
  [CheckdigitScopes.BankTransaction]: Oid.RegisterScope(CheckdigitScopes.BankTransaction, 'bt'),
  [CheckdigitScopes.Batch]: Oid.RegisterScope(CheckdigitScopes.Batch, 'bat'),
  [CheckdigitScopes.OrderReference]: Oid.RegisterScope(CheckdigitScopes.OrderReference, 'or'),
  [CheckdigitScopes.PaymentRequest]: Oid.RegisterScope(CheckdigitScopes.PaymentRequest, 'pr'),
  [CheckdigitScopes.PlaidWebhook]: Oid.RegisterScope(CheckdigitScopes.PlaidWebhook, 'phook'),
  [CheckdigitScopes.PlaidTransaction]: Oid.RegisterScope(CheckdigitScopes.PlaidTransaction, 'ptxn'),
  [CheckdigitScopes.ApiKey]: Oid.RegisterScope(CheckdigitScopes.ApiKey, 'key'),
  [CheckdigitScopes.PlaidIdentity]: Oid.RegisterScope(CheckdigitScopes.PlaidIdentity, 'pident'),
  [CheckdigitScopes.PlaidIdentityEntry]: Oid.RegisterScope(
    CheckdigitScopes.PlaidIdentityEntry,
    'pidentry'
  ),
  [CheckdigitScopes.Order]: Oid.RegisterScope(CheckdigitScopes.Order, 'o'),
  [CheckdigitScopes.QueuedSubscriptionRequest]: Oid.RegisterScope(
    CheckdigitScopes.QueuedSubscriptionRequest,
    'qsr'
  ),
  [CheckdigitScopes.Webhook]: Oid.RegisterScope(CheckdigitScopes.Webhook, 'wh'),
  [CheckdigitScopes.QsrService]: Oid.RegisterScope(CheckdigitScopes.QsrService, 'qsrsrvc'),
  [CheckdigitScopes.QsrCache]: Oid.RegisterScope(CheckdigitScopes.QsrCache, 'QsrCache')
});
