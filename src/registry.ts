import { Oid } from './oid';

export const Registry = {
  AchGateway: Oid.RegisterScope('AchGateway'),
  Activity: Oid.RegisterScope('Activity', 'act'),
  BankAccount: Oid.RegisterScope('BankAccount'),
  BankTransaction: Oid.RegisterScope('BankTransaction'),
  BusinessApplication: Oid.RegisterScope('BusinessApplication', 'be'),
  Buyer: Oid.RegisterScope('Buyer', 'b'),
  Company: Oid.RegisterScope('Company', 'co'),
  ExternalEvent: Oid.RegisterScope('ExternalEvent', 'ee'),
  OrderReference: Oid.RegisterScope('OrderReference'),
  PaymentRequest: Oid.RegisterScope('PaymentRequest'),
  PurchaseOrder: Oid.RegisterScope('PurchaseOrder', 'po'),
  Shipment: Oid.RegisterScope('Shipment', 'shp'),
  Supplier: Oid.RegisterScope('Supplier', 's'),
  User: Oid.RegisterScope('User', 'u'),
  Workflow: Oid.RegisterScope('Workflow', 'wf')
};
