"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckdigitScopes = void 0;
__exportStar(require("./checkdigit/historical.scopes"), exports);
var CheckdigitScopes;
(function (CheckdigitScopes) {
    CheckdigitScopes["ApiKey"] = "ApiKey";
    CheckdigitScopes["Buyer"] = "Buyer";
    CheckdigitScopes["Company"] = "Company";
    CheckdigitScopes["PlaidItem"] = "PlaidItem";
    CheckdigitScopes["BalanceCheck"] = "BalanceCheck";
    CheckdigitScopes["Supplier"] = "Supplier";
    CheckdigitScopes["DivisionRelationship"] = "DivisionRelationship";
    CheckdigitScopes["DivisionUser"] = "DivisionUser";
    CheckdigitScopes["TermsChoice"] = "TermsChoice";
    CheckdigitScopes["ShopifyCredential"] = "ShopifyCredential";
    CheckdigitScopes["WoocommerceCredential"] = "WoocommerceCredential";
    CheckdigitScopes["BigcommerceCredential"] = "BigcommerceCredential";
    CheckdigitScopes["TradegeckoCredential"] = "TradegeckoCredential";
    // Arbiter - choreographer
    CheckdigitScopes["Workflow"] = "Workflow";
    CheckdigitScopes["AuditEntry"] = "AuditEntry";
    CheckdigitScopes["DisposedEvent"] = "DisposedEvent";
    CheckdigitScopes["PendingEvent"] = "PendingEvent";
    // Arbiter - BuyerOnboarding
    CheckdigitScopes["BuyerApplication"] = "BuyerApplication";
    // Arbiter -- RunAchFile
    CheckdigitScopes["AchFile"] = "AchFile";
    // Banking -- transitioned from old ~oids
    CheckdigitScopes["AchGateway"] = "AchGateway";
    CheckdigitScopes["BankAccount"] = "BankAccount";
    CheckdigitScopes["BankTransaction"] = "BankTransaction";
    CheckdigitScopes["Batch"] = "Batch";
    CheckdigitScopes["OrderReference"] = "OrderReference";
    CheckdigitScopes["PaymentRequest"] = "PaymentRequest";
    CheckdigitScopes["PlaidIdentity"] = "PlaidIdentity";
    CheckdigitScopes["PlaidIdentityEntry"] = "PlaidIdentityEntry";
    CheckdigitScopes["PlaidWebhook"] = "PlaidWebhook";
    CheckdigitScopes["PlaidTransaction"] = "PlaidTransaction";
    // Orders
    CheckdigitScopes["Order"] = "Order";
    CheckdigitScopes["Contract"] = "Contract";
    CheckdigitScopes["LineItem"] = "LineItem";
    CheckdigitScopes["LineItemEvent"] = "LineItemEvent";
    CheckdigitScopes["OrderEvent"] = "OrderEvent";
    CheckdigitScopes["Term"] = "Term";
    // Accruals
    CheckdigitScopes["Accrual"] = "Accrual";
    CheckdigitScopes["AccrualEvent"] = "AccrualEvent";
    CheckdigitScopes["JournalEntry"] = "JournalEntry";
    // QueuedSubscriptionManagement (Qsr)
    CheckdigitScopes["QueuedSubscriptionRequest"] = "QueuedSubscriptionRequest";
    CheckdigitScopes["Webhook"] = "Webhook";
    CheckdigitScopes["QsrService"] = "QsrService";
    CheckdigitScopes["QsrCache"] = "QsrCache";
})(CheckdigitScopes = exports.CheckdigitScopes || (exports.CheckdigitScopes = {}));
//# sourceMappingURL=scopes.enum.js.map