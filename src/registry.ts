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
  [BankingScopeNames.Batch]: Oid.RegisterScope(BankingScopeNames.Batch),
  [NoCheckdigitArbiterScopes.Activity]: Oid.RegisterScope('Activity', 'act'),
  [BankingScopeNames.BankAccount]: Oid.RegisterScope(BankingScopeNames.BankAccount),
  [BankingScopeNames.BankTransaction]: Oid.RegisterScope(BankingScopeNames.BankTransaction),
  [NoCheckdigitArbiterScopes.BusinessApplication]: Oid.RegisterScope(
    NoCheckdigitArbiterScopes.BusinessApplication,
    'be'
  ),
  [CheckdigitScopes.Buyer]: Oid.RegisterScope(CheckdigitScopes.Buyer, 'b'),
  [CheckdigitScopes.Company]: Oid.RegisterScope(CheckdigitScopes.Company, 'co'),
  [CheckdigitScopes.PlaidItem]: Oid.RegisterScope(CheckdigitScopes.PlaidItem, 'pitem'),
  [NoCheckdigitArbiterScopes.ExternalEvent]: Oid.RegisterScope(
    NoCheckdigitArbiterScopes.ExternalEvent,
    'ee'
  ),
  [BankingScopeNames.OrderReference]: Oid.RegisterScope(BankingScopeNames.OrderReference),
  [BankingScopeNames.PaymentRequest]: Oid.RegisterScope(BankingScopeNames.PaymentRequest),
  [AlphaHashidScopes.PurchaseOrder]: Oid.RegisterScope(AlphaHashidScopes.PurchaseOrder, 'po'),
  [AlphaHashidScopes.Shipment]: Oid.RegisterScope(AlphaHashidScopes.Shipment, 'shp'),
  [CheckdigitScopes.Supplier]: Oid.RegisterScope(CheckdigitScopes.Supplier, 's'),
  [AlphaHashidScopes.User]: Oid.RegisterScope(AlphaHashidScopes.User, 'u'),
  [NoCheckdigitArbiterScopes.Workflow]: Oid.RegisterScope(NoCheckdigitArbiterScopes.Workflow, 'wf'),
  [CheckdigitScopes.DivisionRelationship]: Oid.RegisterScope(
    CheckdigitScopes.DivisionRelationship,
    'bsr'
  ),
  [CheckdigitScopes.TermsChoice]: Oid.RegisterScope(CheckdigitScopes.TermsChoice, 'tc')
});
