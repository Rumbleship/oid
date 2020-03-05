"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./checkdigit/historical.scopes"));
var CheckdigitScopes;
(function (CheckdigitScopes) {
    CheckdigitScopes["Buyer"] = "Buyer";
    CheckdigitScopes["Company"] = "Company";
    CheckdigitScopes["PlaidItem"] = "PlaidItem";
    CheckdigitScopes["BalanceCheck"] = "BalanceCheck";
    CheckdigitScopes["Supplier"] = "Supplier";
    CheckdigitScopes["DivisionRelationship"] = "DivisionRelationship";
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
})(CheckdigitScopes = exports.CheckdigitScopes || (exports.CheckdigitScopes = {}));
//# sourceMappingURL=scopes.enum.js.map