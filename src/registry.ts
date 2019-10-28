import {
  AlphaHashidScopes,
  NoCheckdigitArbiterScopes,
  BankingScopeNames,
  CheckdigitScopes
} from './implementations/scopes.enum';
import { Oid } from './oid';

/**
 * To add a new scope, declare it as in the CheckdigitScopes enum, and then its shortcode here.
 */
export const Registry = Object.freeze({
  [BankingScopeNames.AchGateway]: Oid.RegisterScope(BankingScopeNames.AchGateway),
  [NoCheckdigitArbiterScopes.Activity]: Oid.RegisterScope('Activity', 'act'),
  [BankingScopeNames.BankAccount]: Oid.RegisterScope(BankingScopeNames.BankAccount),
  [BankingScopeNames.BankTransaction]: Oid.RegisterScope(BankingScopeNames.BankTransaction),
  [NoCheckdigitArbiterScopes.BusinessApplication]: Oid.RegisterScope(
    NoCheckdigitArbiterScopes.BusinessApplication,
    'be'
  ),
  [AlphaHashidScopes.Buyer]: Oid.RegisterScope(AlphaHashidScopes.Buyer, 'b'),
  [CheckdigitScopes.Company]: Oid.RegisterScope(CheckdigitScopes.Company, 'co'),
  [NoCheckdigitArbiterScopes.ExternalEvent]: Oid.RegisterScope(
    NoCheckdigitArbiterScopes.ExternalEvent,
    'ee'
  ),
  [BankingScopeNames.OrderReference]: Oid.RegisterScope(BankingScopeNames.OrderReference),
  [BankingScopeNames.PaymentRequest]: Oid.RegisterScope(BankingScopeNames.PaymentRequest),
  [AlphaHashidScopes.PurchaseOrder]: Oid.RegisterScope(AlphaHashidScopes.PurchaseOrder, 'po'),
  [AlphaHashidScopes.Shipment]: Oid.RegisterScope(AlphaHashidScopes.Shipment, 'shp'),
  [AlphaHashidScopes.Supplier]: Oid.RegisterScope(AlphaHashidScopes.Supplier, 's'),
  [AlphaHashidScopes.User]: Oid.RegisterScope(AlphaHashidScopes.User, 'u'),
  [NoCheckdigitArbiterScopes.Workflow]: Oid.RegisterScope(NoCheckdigitArbiterScopes.Workflow, 'wf')
});
