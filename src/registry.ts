import {
  AlphaHashidScopes,
  BankingScopeNames,
  CheckdigitScopes
} from './implementations/scopes.enum';
import { Oid } from './oid';

/**
 * To add a new scope, declare it as in the CheckdigitScopes enum, and then its shortcode here.
 */
export const Registry = Object.freeze({
  [BankingScopeNames.AchGateway]: Oid.RegisterScope(BankingScopeNames.AchGateway),
  [BankingScopeNames.Batch]: Oid.RegisterScope(BankingScopeNames.Batch),
  [BankingScopeNames.BankAccount]: Oid.RegisterScope(BankingScopeNames.BankAccount),
  [BankingScopeNames.BankTransaction]: Oid.RegisterScope(BankingScopeNames.BankTransaction),

  [CheckdigitScopes.Buyer]: Oid.RegisterScope(CheckdigitScopes.Buyer, 'b'),
  [CheckdigitScopes.Company]: Oid.RegisterScope(CheckdigitScopes.Company, 'co'),
  [CheckdigitScopes.PlaidItem]: Oid.RegisterScope(CheckdigitScopes.PlaidItem, 'pitem'),
  [CheckdigitScopes.BalanceCheck]: Oid.RegisterScope(CheckdigitScopes.BalanceCheck, 'bal'),
  [CheckdigitScopes.AchFile]: Oid.RegisterScope(CheckdigitScopes.AchFile, 'ach'),
  [BankingScopeNames.OrderReference]: Oid.RegisterScope(BankingScopeNames.OrderReference),
  [BankingScopeNames.PaymentRequest]: Oid.RegisterScope(BankingScopeNames.PaymentRequest),
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
  [CheckdigitScopes.BuyerApplication]: Oid.RegisterScope(CheckdigitScopes.BuyerApplication, 'ba'),
  [CheckdigitScopes.DisposedEvent]: Oid.RegisterScope(CheckdigitScopes.DisposedEvent, 'de'),
  [CheckdigitScopes.PendingEvent]: Oid.RegisterScope(CheckdigitScopes.PendingEvent, 'pe'),
  [CheckdigitScopes.Workflow]: Oid.RegisterScope(CheckdigitScopes.Workflow, 'wf')
});
