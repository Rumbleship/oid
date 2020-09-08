import { AlphaHashidScopes, CheckdigitScopes } from './implementations/scopes.enum';
/**
 * To add a new scope, declare it as in the CheckdigitScopes enum, and then its shortcode here.
 */
export declare const Registry: Readonly<{
    Buyer: import("./implementations/scope-registry").Scope;
    Company: import("./implementations/scope-registry").Scope;
    PlaidItem: import("./implementations/scope-registry").Scope;
    BalanceCheck: import("./implementations/scope-registry").Scope;
    AchFile: import("./implementations/scope-registry").Scope;
    PurchaseOrder: import("./implementations/scope-registry").Scope;
    Shipment: import("./implementations/scope-registry").Scope;
    Supplier: import("./implementations/scope-registry").Scope;
    User: import("./implementations/scope-registry").Scope;
    DivisionRelationship: import("./implementations/scope-registry").Scope;
    TermsChoice: import("./implementations/scope-registry").Scope;
    ShopifyCredential: import("./implementations/scope-registry").Scope;
    WoocommerceCredential: import("./implementations/scope-registry").Scope;
    BigcommerceCredential: import("./implementations/scope-registry").Scope;
    TradegeckoCredential: import("./implementations/scope-registry").Scope;
    AuditEntry: import("./implementations/scope-registry").Scope;
    BuyerApplication: import("./implementations/scope-registry").Scope;
    DisposedEvent: import("./implementations/scope-registry").Scope;
    PendingEvent: import("./implementations/scope-registry").Scope;
    Workflow: import("./implementations/scope-registry").Scope;
    AchGateway: import("./implementations/scope-registry").Scope;
    BankAccount: import("./implementations/scope-registry").Scope;
    BankTransaction: import("./implementations/scope-registry").Scope;
    Batch: import("./implementations/scope-registry").Scope;
    OrderReference: import("./implementations/scope-registry").Scope;
    PaymentRequest: import("./implementations/scope-registry").Scope;
    PlaidWebhook: import("./implementations/scope-registry").Scope;
    PlaidTransaction: import("./implementations/scope-registry").Scope;
    ApiKey: import("./implementations/scope-registry").Scope;
    PlaidIdentity: import("./implementations/scope-registry").Scope;
    PlaidIdentityEntry: import("./implementations/scope-registry").Scope;
    Order: import("./implementations/scope-registry").Scope;
}>;
