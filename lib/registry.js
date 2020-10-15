"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Registry = void 0;
const scopes_enum_1 = require("./implementations/scopes.enum");
const oid_1 = require("./oid");
/**
 * To add a new scope, declare it as in the CheckdigitScopes enum, and then its shortcode here.
 */
exports.Registry = Object.freeze({
    [scopes_enum_1.CheckdigitScopes.Buyer]: oid_1.Oid.RegisterScope(scopes_enum_1.CheckdigitScopes.Buyer, 'b'),
    [scopes_enum_1.CheckdigitScopes.Company]: oid_1.Oid.RegisterScope(scopes_enum_1.CheckdigitScopes.Company, 'co'),
    [scopes_enum_1.CheckdigitScopes.PlaidItem]: oid_1.Oid.RegisterScope(scopes_enum_1.CheckdigitScopes.PlaidItem, 'pitem'),
    [scopes_enum_1.CheckdigitScopes.BalanceCheck]: oid_1.Oid.RegisterScope(scopes_enum_1.CheckdigitScopes.BalanceCheck, 'bal'),
    [scopes_enum_1.CheckdigitScopes.AchFile]: oid_1.Oid.RegisterScope(scopes_enum_1.CheckdigitScopes.AchFile, 'ach'),
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
    [scopes_enum_1.CheckdigitScopes.BuyerApplication]: oid_1.Oid.RegisterScope(scopes_enum_1.CheckdigitScopes.BuyerApplication, 'bap'),
    [scopes_enum_1.CheckdigitScopes.DisposedEvent]: oid_1.Oid.RegisterScope(scopes_enum_1.CheckdigitScopes.DisposedEvent, 'de'),
    [scopes_enum_1.CheckdigitScopes.PendingEvent]: oid_1.Oid.RegisterScope(scopes_enum_1.CheckdigitScopes.PendingEvent, 'pe'),
    [scopes_enum_1.CheckdigitScopes.Workflow]: oid_1.Oid.RegisterScope(scopes_enum_1.CheckdigitScopes.Workflow, 'wf'),
    [scopes_enum_1.CheckdigitScopes.AchGateway]: oid_1.Oid.RegisterScope(scopes_enum_1.CheckdigitScopes.AchGateway, 'gate'),
    [scopes_enum_1.CheckdigitScopes.BankAccount]: oid_1.Oid.RegisterScope(scopes_enum_1.CheckdigitScopes.BankAccount, 'ba'),
    [scopes_enum_1.CheckdigitScopes.BankTransaction]: oid_1.Oid.RegisterScope(scopes_enum_1.CheckdigitScopes.BankTransaction, 'bt'),
    [scopes_enum_1.CheckdigitScopes.Batch]: oid_1.Oid.RegisterScope(scopes_enum_1.CheckdigitScopes.Batch, 'bat'),
    [scopes_enum_1.CheckdigitScopes.OrderReference]: oid_1.Oid.RegisterScope(scopes_enum_1.CheckdigitScopes.OrderReference, 'or'),
    [scopes_enum_1.CheckdigitScopes.PaymentRequest]: oid_1.Oid.RegisterScope(scopes_enum_1.CheckdigitScopes.PaymentRequest, 'pr'),
    [scopes_enum_1.CheckdigitScopes.PlaidWebhook]: oid_1.Oid.RegisterScope(scopes_enum_1.CheckdigitScopes.PlaidWebhook, 'phook'),
    [scopes_enum_1.CheckdigitScopes.PlaidTransaction]: oid_1.Oid.RegisterScope(scopes_enum_1.CheckdigitScopes.PlaidTransaction, 'ptxn'),
    [scopes_enum_1.CheckdigitScopes.ApiKey]: oid_1.Oid.RegisterScope(scopes_enum_1.CheckdigitScopes.ApiKey, 'key'),
    [scopes_enum_1.CheckdigitScopes.PlaidIdentity]: oid_1.Oid.RegisterScope(scopes_enum_1.CheckdigitScopes.PlaidIdentity, 'pident'),
    [scopes_enum_1.CheckdigitScopes.PlaidIdentityEntry]: oid_1.Oid.RegisterScope(scopes_enum_1.CheckdigitScopes.PlaidIdentityEntry, 'pidentry'),
    [scopes_enum_1.CheckdigitScopes.Order]: oid_1.Oid.RegisterScope(scopes_enum_1.CheckdigitScopes.Order, 'o'),
    [scopes_enum_1.CheckdigitScopes.Contract]: oid_1.Oid.RegisterScope(scopes_enum_1.CheckdigitScopes.Contract, 'con'),
    [scopes_enum_1.CheckdigitScopes.LineItem]: oid_1.Oid.RegisterScope(scopes_enum_1.CheckdigitScopes.LineItem, 'li'),
    [scopes_enum_1.CheckdigitScopes.LineItemEvent]: oid_1.Oid.RegisterScope(scopes_enum_1.CheckdigitScopes.LineItemEvent, 'lie'),
    [scopes_enum_1.CheckdigitScopes.OrderEvent]: oid_1.Oid.RegisterScope(scopes_enum_1.CheckdigitScopes.OrderEvent, 'oe'),
    [scopes_enum_1.CheckdigitScopes.Term]: oid_1.Oid.RegisterScope(scopes_enum_1.CheckdigitScopes.Term, 'term'),
    [scopes_enum_1.CheckdigitScopes.QueuedSubscriptionRequest]: oid_1.Oid.RegisterScope(scopes_enum_1.CheckdigitScopes.QueuedSubscriptionRequest, 'qsr'),
    [scopes_enum_1.CheckdigitScopes.Webhook]: oid_1.Oid.RegisterScope(scopes_enum_1.CheckdigitScopes.Webhook, 'wh'),
    [scopes_enum_1.CheckdigitScopes.QsrService]: oid_1.Oid.RegisterScope(scopes_enum_1.CheckdigitScopes.QsrService, 'qsrsrvc'),
    [scopes_enum_1.CheckdigitScopes.QsrCache]: oid_1.Oid.RegisterScope(scopes_enum_1.CheckdigitScopes.QsrCache, 'QsrCache')
});
//# sourceMappingURL=registry.js.map