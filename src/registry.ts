import { Services } from './implementations/services.enum';
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
  [BankingScopeNames.AchGateway]: Oid.RegisterScope(
    BankingScopeNames.AchGateway,
    '~',
    Services.banking
  ),
  [BankingScopeNames.Batch]: Oid.RegisterScope(BankingScopeNames.Batch, '~', Services.banking),
  [BankingScopeNames.BankAccount]: Oid.RegisterScope(
    BankingScopeNames.BankAccount,
    '~',
    Services.banking
  ),
  [BankingScopeNames.BankTransaction]: Oid.RegisterScope(
    BankingScopeNames.BankTransaction,
    '~',
    Services.banking
  ),

  [CheckdigitScopes.Buyer]: Oid.RegisterScope(CheckdigitScopes.Buyer, 'b'),
  [CheckdigitScopes.Company]: Oid.RegisterScope(CheckdigitScopes.Company, 'co'),
  [CheckdigitScopes.PlaidItem]: Oid.RegisterScope(
    CheckdigitScopes.PlaidItem,
    'pitem',
    Services.banking
  ),
  [BankingScopeNames.OrderReference]: Oid.RegisterScope(
    BankingScopeNames.OrderReference,
    '~',
    Services.banking
  ),
  [BankingScopeNames.PaymentRequest]: Oid.RegisterScope(
    BankingScopeNames.PaymentRequest,
    '~',
    Services.banking
  ),
  [AlphaHashidScopes.PurchaseOrder]: Oid.RegisterScope(
    AlphaHashidScopes.PurchaseOrder,
    'po',
    Services.alpha
  ),
  [AlphaHashidScopes.Shipment]: Oid.RegisterScope(
    AlphaHashidScopes.Shipment,
    'shp',
    Services.alpha
  ),
  [CheckdigitScopes.Supplier]: Oid.RegisterScope(CheckdigitScopes.Supplier, 's', Services.alpha),
  [AlphaHashidScopes.User]: Oid.RegisterScope(AlphaHashidScopes.User, 'u', Services.alpha),
  [CheckdigitScopes.DivisionRelationship]: Oid.RegisterScope(
    CheckdigitScopes.DivisionRelationship,
    'bsr',
    Services.alpha
  ),
  [CheckdigitScopes.TermsChoice]: Oid.RegisterScope(
    CheckdigitScopes.TermsChoice,
    'tc',
    Services.alpha
  ),
  [CheckdigitScopes.ShopifyCredential]: Oid.RegisterScope(
    CheckdigitScopes.ShopifyCredential,
    'shopifycred',
    Services.mediator
  ),
  [CheckdigitScopes.WoocommerceCredential]: Oid.RegisterScope(
    CheckdigitScopes.WoocommerceCredential,
    'wccred',
    Services.mediator
  ),
  [CheckdigitScopes.BigcommerceCredential]: Oid.RegisterScope(
    CheckdigitScopes.BigcommerceCredential,
    'bccred',
    Services.mediator
  ),
  [CheckdigitScopes.TradegeckoCredential]: Oid.RegisterScope(
    CheckdigitScopes.TradegeckoCredential,
    'tgcred',
    Services.mediator
  ),
  [CheckdigitScopes.AuditEntry]: Oid.RegisterScope(
    CheckdigitScopes.AuditEntry,
    'ae',
    Services.onboarding_buyer
  ),
  [CheckdigitScopes.BuyerApplication]: Oid.RegisterScope(
    CheckdigitScopes.BuyerApplication,
    'ba',
    Services.onboarding_buyer
  ),
  [CheckdigitScopes.DisposedEvent]: Oid.RegisterScope(
    CheckdigitScopes.DisposedEvent,
    'de',
    Services.onboarding_buyer
  ),
  [CheckdigitScopes.PendingEvent]: Oid.RegisterScope(
    CheckdigitScopes.PendingEvent,
    'pe',
    Services.onboarding_buyer
  ),
  [CheckdigitScopes.Workflow]: Oid.RegisterScope(
    CheckdigitScopes.Workflow,
    'wf, Services.onboarding_buyer'
  )
});
