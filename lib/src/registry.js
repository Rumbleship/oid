"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const oid_1 = require("./oid");
exports.Registry = {
    AchGateway: oid_1.Oid.RegisterScope('AchGateway'),
    Activity: oid_1.Oid.RegisterScope('Activity', 'act'),
    BankAccount: oid_1.Oid.RegisterScope('BankAccount'),
    BankTransaction: oid_1.Oid.RegisterScope('BankTransaction'),
    BusinessApplication: oid_1.Oid.RegisterScope('BusinessApplication', 'be'),
    Buyer: oid_1.Oid.RegisterScope('Buyer', 'b'),
    Company: oid_1.Oid.RegisterScope('Company', 'co'),
    ExternalEvent: oid_1.Oid.RegisterScope('ExternalEvent', 'ee'),
    OrderReference: oid_1.Oid.RegisterScope('OrderReference'),
    PaymentRequest: oid_1.Oid.RegisterScope('PaymentRequest'),
    PurchaseOrder: oid_1.Oid.RegisterScope('PurchaseOrder', 'po'),
    Shipment: oid_1.Oid.RegisterScope('Shipment', 'shp'),
    Supplier: oid_1.Oid.RegisterScope('Supplier', 's'),
    User: oid_1.Oid.RegisterScope('User', 'u'),
    Workflow: oid_1.Oid.RegisterScope('Workflow', 'wf')
};
//# sourceMappingURL=registry.js.map