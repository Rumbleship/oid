import {
  AlphaHashidScopes,
  NoCheckdigitArbiterScopes,
  TildeScopeNames,
  CheckdigitScopes
} from './implementations/scopes.enum';
import { Oid } from './oid';

/**
 * To add a new scope, declare it as in the CheckdigitScopes enum, and then its shortcode here.
 */
export const Registry = {
  [TildeScopeNames.AchGateway]: Oid.RegisterScope(TildeScopeNames.AchGateway),
  [NoCheckdigitArbiterScopes.Activity]: Oid.RegisterScope('Activity', 'act'),
  [TildeScopeNames.BankAccount]: Oid.RegisterScope(TildeScopeNames.BankAccount),
  [TildeScopeNames.BankTransaction]: Oid.RegisterScope(TildeScopeNames.BankTransaction),
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
  [TildeScopeNames.OrderReference]: Oid.RegisterScope(TildeScopeNames.OrderReference),
  [TildeScopeNames.PaymentRequest]: Oid.RegisterScope(TildeScopeNames.PaymentRequest),
  [AlphaHashidScopes.PurchaseOrder]: Oid.RegisterScope(AlphaHashidScopes.PurchaseOrder, 'po'),
  [AlphaHashidScopes.Shipment]: Oid.RegisterScope(AlphaHashidScopes.Shipment, 'shp'),
  [AlphaHashidScopes.Supplier]: Oid.RegisterScope(AlphaHashidScopes.Supplier, 's'),
  [AlphaHashidScopes.User]: Oid.RegisterScope(AlphaHashidScopes.User, 'u'),
  [NoCheckdigitArbiterScopes.Workflow]: Oid.RegisterScope(NoCheckdigitArbiterScopes.Workflow, 'wf')
};
