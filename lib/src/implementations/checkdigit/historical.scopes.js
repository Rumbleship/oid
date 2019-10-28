"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// scopes that were registered in old Alpha; all have check digits and hash length of 4.
var AlphaHashidScopes;
(function (AlphaHashidScopes) {
    AlphaHashidScopes["Buyer"] = "Buyer";
    AlphaHashidScopes["Supplier"] = "Supplier";
    AlphaHashidScopes["PurchaseOrder"] = "PurchaseOrder";
    AlphaHashidScopes["Shipment"] = "Shipment";
    AlphaHashidScopes["User"] = "User";
})(AlphaHashidScopes = exports.AlphaHashidScopes || (exports.AlphaHashidScopes = {}));
// scopes that were registered in the first version of Arbiter; they do not have checkdigits
var NoCheckdigitArbiterScopes;
(function (NoCheckdigitArbiterScopes) {
    NoCheckdigitArbiterScopes["Workflow"] = "Workflow";
    NoCheckdigitArbiterScopes["Activity"] = "Activity";
    NoCheckdigitArbiterScopes["BusinessApplication"] = "BusinessApplication";
    NoCheckdigitArbiterScopes["ExternalEvent"] = "ExternalEvent";
})(NoCheckdigitArbiterScopes = exports.NoCheckdigitArbiterScopes || (exports.NoCheckdigitArbiterScopes = {}));
//# sourceMappingURL=historical.scopes.js.map