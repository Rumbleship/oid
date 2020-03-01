"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scopes_enum_1 = require("./implementations/scopes.enum");
const oid_1 = require("./oid");
/**
 * To add a new scope, declare it as in the CheckdigitScopes enum, and then its shortcode here.
 */
exports.Registry = Object.freeze({
    [scopes_enum_1.BankingScopeNames.AchGateway]: oid_1.Oid.RegisterScope(scopes_enum_1.BankingScopeNames.AchGateway),
    [scopes_enum_1.BankingScopeNames.Batch]: oid_1.Oid.RegisterScope(scopes_enum_1.BankingScopeNames.Batch),
    [scopes_enum_1.BankingScopeNames.BankAccount]: oid_1.Oid.RegisterScope(scopes_enum_1.BankingScopeNames.BankAccount),
    [scopes_enum_1.BankingScopeNames.BankTransaction]: oid_1.Oid.RegisterScope(scopes_enum_1.BankingScopeNames.BankTransaction),
    [scopes_enum_1.CheckdigitScopes.Buyer]: oid_1.Oid.RegisterScope(scopes_enum_1.CheckdigitScopes.Buyer, 'b'),
    [scopes_enum_1.CheckdigitScopes.Company]: oid_1.Oid.RegisterScope(scopes_enum_1.CheckdigitScopes.Company, 'co'),
    [scopes_enum_1.CheckdigitScopes.PlaidItem]: oid_1.Oid.RegisterScope(scopes_enum_1.CheckdigitScopes.PlaidItem, 'pitem'),
    [scopes_enum_1.CheckdigitScopes.BalanceCheck]: oid_1.Oid.RegisterScope(scopes_enum_1.CheckdigitScopes.BalanceCheck, 'bal'),
    [scopes_enum_1.CheckdigitScopes.AchFile]: oid_1.Oid.RegisterScope(scopes_enum_1.CheckdigitScopes.AchFile, 'ach'),
    [scopes_enum_1.BankingScopeNames.OrderReference]: oid_1.Oid.RegisterScope(scopes_enum_1.BankingScopeNames.OrderReference),
    [scopes_enum_1.BankingScopeNames.PaymentRequest]: oid_1.Oid.RegisterScope(scopes_enum_1.BankingScopeNames.PaymentRequest),
    [scopes_enum_1.AlphaHashidScopes.PurchaseOrder]: oid_1.Oid.RegisterScope(scopes_enum_1.AlphaHashidScopes.PurchaseOrder, 'po'),
    [scopes_enum_1.AlphaHashidScopes.Shipment]: oid_1.Oid.RegisterScope(scopes_enum_1.AlphaHashidScopes.Shipment, 'shp'),
    [scopes_enum_1.CheckdigitScopes.Supplier]: oid_1.Oid.RegisterScope(scopes_enum_1.CheckdigitScopes.Supplier, 's'),
    [scopes_enum_1.AlphaHashidScopes.User]: oid_1.Oid.RegisterScope(scopes_enum_1.AlphaHashidScopes.User, 'u'),
    [scopes_enum_1.CheckdigitScopes.DivisionRelationship]: oid_1.Oid.RegisterScope(scopes_enum_1.CheckdigitScopes.DivisionRelationship, 'bsr'),
    [scopes_enum_1.CheckdigitScopes.TermsChoice]: oid_1.Oid.RegisterScope(scopes_enum_1.CheckdigitScopes.TermsChoice, 'tc'),
    [scopes_enum_1.CheckdigitScopes.ShopifyCredential]: oid_1.Oid.RegisterScope(scopes_enum_1.CheckdigitScopes.ShopifyCredential, 'shopifycred'),
    [scopes_enum_1.CheckdigitScopes.WoocommerceCredential]: oid_1.Oid.RegisterScope(scopes_enum_1.CheckdigitScopes.WoocommerceCredential, 'wccred'),
    [scopes_enum_1.CheckdigitScopes.BigcommerceCredential]: oid_1.Oid.RegisterScope(scopes_enum_1.CheckdigitScopes.BigcommerceCredential, 'bccred'),
    [scopes_enum_1.CheckdigitScopes.TradegeckoCredential]: oid_1.Oid.RegisterScope(scopes_enum_1.CheckdigitScopes.TradegeckoCredential, 'tgcred'),
    [scopes_enum_1.CheckdigitScopes.AuditEntry]: oid_1.Oid.RegisterScope(scopes_enum_1.CheckdigitScopes.AuditEntry, 'ae'),
    [scopes_enum_1.CheckdigitScopes.BuyerApplication]: oid_1.Oid.RegisterScope(scopes_enum_1.CheckdigitScopes.BuyerApplication, 'ba'),
    [scopes_enum_1.CheckdigitScopes.DisposedEvent]: oid_1.Oid.RegisterScope(scopes_enum_1.CheckdigitScopes.DisposedEvent, 'de'),
    [scopes_enum_1.CheckdigitScopes.PendingEvent]: oid_1.Oid.RegisterScope(scopes_enum_1.CheckdigitScopes.PendingEvent, 'pe'),
    [scopes_enum_1.CheckdigitScopes.Workflow]: oid_1.Oid.RegisterScope(scopes_enum_1.CheckdigitScopes.Workflow, 'wf'),
    [scopes_enum_1.CheckdigitScopes.NewAchGateway]: oid_1.Oid.RegisterScope(scopes_enum_1.CheckdigitScopes.NewAchGateway, 'gate'),
    [scopes_enum_1.CheckdigitScopes.NewBankAccount]: oid_1.Oid.RegisterScope(scopes_enum_1.CheckdigitScopes.NewBankAccount, 'ba'),
    [scopes_enum_1.CheckdigitScopes.NewBankTransaction]: oid_1.Oid.RegisterScope(scopes_enum_1.CheckdigitScopes.NewBankTransaction, 'bt'),
    [scopes_enum_1.CheckdigitScopes.NewBatch]: oid_1.Oid.RegisterScope(scopes_enum_1.CheckdigitScopes.NewBatch, 'bat'),
    [scopes_enum_1.CheckdigitScopes.NewOrderReference]: oid_1.Oid.RegisterScope(scopes_enum_1.CheckdigitScopes.NewOrderReference, 'or'),
    [scopes_enum_1.CheckdigitScopes.NewPaymentRequest]: oid_1.Oid.RegisterScope(scopes_enum_1.CheckdigitScopes.NewPaymentRequest, 'pr')
});
//# sourceMappingURL=registry.js.map