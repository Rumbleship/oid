"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scopes_enum_1 = require("./implementations/scopes.enum");
const oid_1 = require("./oid");
/**
 * To add a new scope, declare it as in the CheckdigitScopes enum, and then its shortcode here.
 */
exports.Registry = {
    [scopes_enum_1.TildeScopeNames.AchGateway]: oid_1.Oid.RegisterScope(scopes_enum_1.TildeScopeNames.AchGateway),
    [scopes_enum_1.NoCheckdigitArbiterScopes.Activity]: oid_1.Oid.RegisterScope('Activity', 'act'),
    [scopes_enum_1.TildeScopeNames.BankAccount]: oid_1.Oid.RegisterScope(scopes_enum_1.TildeScopeNames.BankAccount),
    [scopes_enum_1.TildeScopeNames.BankTransaction]: oid_1.Oid.RegisterScope(scopes_enum_1.TildeScopeNames.BankTransaction),
    [scopes_enum_1.NoCheckdigitArbiterScopes.BusinessApplication]: oid_1.Oid.RegisterScope(scopes_enum_1.NoCheckdigitArbiterScopes.BusinessApplication, 'be'),
    [scopes_enum_1.AlphaHashidScopes.Buyer]: oid_1.Oid.RegisterScope(scopes_enum_1.AlphaHashidScopes.Buyer, 'b'),
    [scopes_enum_1.CheckdigitScopes.Company]: oid_1.Oid.RegisterScope(scopes_enum_1.CheckdigitScopes.Company, 'co'),
    [scopes_enum_1.NoCheckdigitArbiterScopes.ExternalEvent]: oid_1.Oid.RegisterScope(scopes_enum_1.NoCheckdigitArbiterScopes.ExternalEvent, 'ee'),
    [scopes_enum_1.TildeScopeNames.OrderReference]: oid_1.Oid.RegisterScope(scopes_enum_1.TildeScopeNames.OrderReference),
    [scopes_enum_1.TildeScopeNames.PaymentRequest]: oid_1.Oid.RegisterScope(scopes_enum_1.TildeScopeNames.PaymentRequest),
    [scopes_enum_1.AlphaHashidScopes.PurchaseOrder]: oid_1.Oid.RegisterScope(scopes_enum_1.AlphaHashidScopes.PurchaseOrder, 'po'),
    [scopes_enum_1.AlphaHashidScopes.Shipment]: oid_1.Oid.RegisterScope(scopes_enum_1.AlphaHashidScopes.Shipment, 'shp'),
    [scopes_enum_1.AlphaHashidScopes.Supplier]: oid_1.Oid.RegisterScope(scopes_enum_1.AlphaHashidScopes.Supplier, 's'),
    [scopes_enum_1.AlphaHashidScopes.User]: oid_1.Oid.RegisterScope(scopes_enum_1.AlphaHashidScopes.User, 'u'),
    [scopes_enum_1.NoCheckdigitArbiterScopes.Workflow]: oid_1.Oid.RegisterScope(scopes_enum_1.NoCheckdigitArbiterScopes.Workflow, 'wf')
};
//# sourceMappingURL=registry.js.map