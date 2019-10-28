"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scopes_enum_1 = require("./scopes.enum");
const checkdigit_1 = require("./checkdigit");
const tilde_1 = require("./tilde");
const checkdigitFactory = new checkdigit_1.CheckdigitOidFactory();
const tildeFactory = new tilde_1.TildeOidFactory();
exports.OidFactoryMapByScope = new Map();
for (const scopeName of Object.keys(tilde_1.TildeScopeNames)) {
    exports.OidFactoryMapByScope.set(scopeName, tildeFactory);
}
for (const scopeName of [
    ...Object.keys(checkdigit_1.AlphaHashidScopes),
    ...Object.keys(checkdigit_1.NoCheckdigitArbiterScopes),
    ...Object.keys(scopes_enum_1.CheckdigitScopes)
]) {
    exports.OidFactoryMapByScope.set(scopeName, checkdigitFactory);
}
//# sourceMappingURL=scope-to-factory.lookup.js.map