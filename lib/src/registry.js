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
    [scopes_enum_1.NoCheckdigitArbiterScopes.Activity]: oid_1.Oid.RegisterScope('Activity', 'act'),
    [scopes_enum_1.BankingScopeNames.BankAccount]: oid_1.Oid.RegisterScope(scopes_enum_1.BankingScopeNames.BankAccount),
    [scopes_enum_1.BankingScopeNames.BankTransaction]: oid_1.Oid.RegisterScope(scopes_enum_1.BankingScopeNames.BankTransaction),
    [scopes_enum_1.NoCheckdigitArbiterScopes.BusinessApplication]: oid_1.Oid.RegisterScope(scopes_enum_1.NoCheckdigitArbiterScopes.BusinessApplication, 'be'),
    [scopes_enum_1.CheckdigitScopes.Buyer]: oid_1.Oid.RegisterScope(scopes_enum_1.CheckdigitScopes.Buyer, 'b'),
    [scopes_enum_1.CheckdigitScopes.Company]: oid_1.Oid.RegisterScope(scopes_enum_1.CheckdigitScopes.Company, 'co'),
    [scopes_enum_1.CheckdigitScopes.PlaidItem]: oid_1.Oid.RegisterScope(scopes_enum_1.CheckdigitScopes.PlaidItem, 'pitem'),
    [scopes_enum_1.NoCheckdigitArbiterScopes.ExternalEvent]: oid_1.Oid.RegisterScope(scopes_enum_1.NoCheckdigitArbiterScopes.ExternalEvent, 'ee'),
    [scopes_enum_1.BankingScopeNames.OrderReference]: oid_1.Oid.RegisterScope(scopes_enum_1.BankingScopeNames.OrderReference),
    [scopes_enum_1.BankingScopeNames.PaymentRequest]: oid_1.Oid.RegisterScope(scopes_enum_1.BankingScopeNames.PaymentRequest),
    [scopes_enum_1.AlphaHashidScopes.PurchaseOrder]: oid_1.Oid.RegisterScope(scopes_enum_1.AlphaHashidScopes.PurchaseOrder, 'po'),
    [scopes_enum_1.AlphaHashidScopes.Shipment]: oid_1.Oid.RegisterScope(scopes_enum_1.AlphaHashidScopes.Shipment, 'shp'),
    [scopes_enum_1.CheckdigitScopes.Supplier]: oid_1.Oid.RegisterScope(scopes_enum_1.CheckdigitScopes.Supplier, 's'),
    [scopes_enum_1.AlphaHashidScopes.User]: oid_1.Oid.RegisterScope(scopes_enum_1.AlphaHashidScopes.User, 'u'),
    [scopes_enum_1.NoCheckdigitArbiterScopes.Workflow]: oid_1.Oid.RegisterScope(scopes_enum_1.NoCheckdigitArbiterScopes.Workflow, 'wf')
});
//# sourceMappingURL=registry.js.map