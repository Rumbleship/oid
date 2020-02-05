import { AlphaHashidScopes, BankingScopeNames, CheckdigitScopes } from './implementations/scopes.enum';
/**
 * To add a new scope, declare it as in the CheckdigitScopes enum, and then its shortcode here.
 */
export declare const Registry: Readonly<{
    [BankingScopeNames.AchGateway]: import("./implementations/scope-registry").Scope;
    [BankingScopeNames.Batch]: import("./implementations/scope-registry").Scope;
    [BankingScopeNames.BankAccount]: import("./implementations/scope-registry").Scope;
    [BankingScopeNames.BankTransaction]: import("./implementations/scope-registry").Scope;
    [CheckdigitScopes.Buyer]: import("./implementations/scope-registry").Scope;
    [CheckdigitScopes.Company]: import("./implementations/scope-registry").Scope;
    [CheckdigitScopes.PlaidItem]: import("./implementations/scope-registry").Scope;
    [CheckdigitScopes.BalanceCheck]: import("./implementations/scope-registry").Scope;
    [CheckdigitScopes.AchFile]: import("./implementations/scope-registry").Scope;
    [BankingScopeNames.OrderReference]: import("./implementations/scope-registry").Scope;
    [BankingScopeNames.PaymentRequest]: import("./implementations/scope-registry").Scope;
    [AlphaHashidScopes.PurchaseOrder]: import("./implementations/scope-registry").Scope;
    [AlphaHashidScopes.Shipment]: import("./implementations/scope-registry").Scope;
    [CheckdigitScopes.Supplier]: import("./implementations/scope-registry").Scope;
    [AlphaHashidScopes.User]: import("./implementations/scope-registry").Scope;
    [CheckdigitScopes.DivisionRelationship]: import("./implementations/scope-registry").Scope;
    [CheckdigitScopes.TermsChoice]: import("./implementations/scope-registry").Scope;
    [CheckdigitScopes.ShopifyCredential]: import("./implementations/scope-registry").Scope;
    [CheckdigitScopes.WoocommerceCredential]: import("./implementations/scope-registry").Scope;
    [CheckdigitScopes.BigcommerceCredential]: import("./implementations/scope-registry").Scope;
    [CheckdigitScopes.TradegeckoCredential]: import("./implementations/scope-registry").Scope;
    [CheckdigitScopes.AuditEntry]: import("./implementations/scope-registry").Scope;
    [CheckdigitScopes.BuyerApplication]: import("./implementations/scope-registry").Scope;
    [CheckdigitScopes.DisposedEvent]: import("./implementations/scope-registry").Scope;
    [CheckdigitScopes.PendingEvent]: import("./implementations/scope-registry").Scope;
    [CheckdigitScopes.Workflow]: import("./implementations/scope-registry").Scope;
}>;
