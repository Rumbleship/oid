import { AlphaHashidScopes, NoCheckdigitArbiterScopes, BankingScopeNames, CheckdigitScopes } from './implementations/scopes.enum';
/**
 * To add a new scope, declare it as in the CheckdigitScopes enum, and then its shortcode here.
 */
export declare const Registry: Readonly<{
    [BankingScopeNames.AchGateway]: import("./implementations/scope-registry").Scope;
    [NoCheckdigitArbiterScopes.Activity]: import("./implementations/scope-registry").Scope;
    [BankingScopeNames.BankAccount]: import("./implementations/scope-registry").Scope;
    [BankingScopeNames.BankTransaction]: import("./implementations/scope-registry").Scope;
    [NoCheckdigitArbiterScopes.BusinessApplication]: import("./implementations/scope-registry").Scope;
    [AlphaHashidScopes.Buyer]: import("./implementations/scope-registry").Scope;
    [CheckdigitScopes.Company]: import("./implementations/scope-registry").Scope;
    [NoCheckdigitArbiterScopes.ExternalEvent]: import("./implementations/scope-registry").Scope;
    [BankingScopeNames.OrderReference]: import("./implementations/scope-registry").Scope;
    [BankingScopeNames.PaymentRequest]: import("./implementations/scope-registry").Scope;
    [AlphaHashidScopes.PurchaseOrder]: import("./implementations/scope-registry").Scope;
    [AlphaHashidScopes.Shipment]: import("./implementations/scope-registry").Scope;
    [AlphaHashidScopes.Supplier]: import("./implementations/scope-registry").Scope;
    [AlphaHashidScopes.User]: import("./implementations/scope-registry").Scope;
    [NoCheckdigitArbiterScopes.Workflow]: import("./implementations/scope-registry").Scope;
}>;
