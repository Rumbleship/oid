"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const factories_1 = require("../factories");
const scopes_1 = require("../scopes");
const hashidFactory = new factories_1.HashidOidFactory();
const tildeFactory = new factories_1.TildeOidFactory();
const modernOidFactory = new factories_1.ModernOidFactory();
exports.OidFactoryMapByScope = new Map();
for (const scopeName of Object.keys(scopes_1.TildeScopeNames)) {
    exports.OidFactoryMapByScope.set(scopeName, tildeFactory);
}
for (const scopeName of Object.keys(scopes_1.HashidScopeNames)) {
    exports.OidFactoryMapByScope.set(scopeName, hashidFactory);
}
for (const scopeName of Object.keys(scopes_1.OidScopeNames)) {
    exports.OidFactoryMapByScope.set(scopeName, modernOidFactory);
}
//# sourceMappingURL=scope-to-factory.lookup.js.map