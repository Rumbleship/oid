// scopes that were registered in old Alpha; all have check digits and hash length of 4.
export enum AlphaHashidScopes {
  Buyer = 'Buyer',
  Supplier = 'Supplier',
  PurchaseOrder = 'PurchaseOrder',
  Shipment = 'Shipment',
  User = 'User'
}
// scopes that were registered in the first version of Arbiter; they do not have checkdigits
export enum NoCheckdigitArbiterScopes {
  Workflow = 'Workflow',
  Activity = 'Activity',
  BusinessApplication = 'BusinessApplication',
  ExternalEvent = 'ExternalEvent'
}
