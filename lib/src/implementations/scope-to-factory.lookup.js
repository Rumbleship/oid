"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkdigit_1 = require("./checkdigit");
const tilde_1 = require("./tilde");
const plain_1 = require("./plain");
const hashidFactory = new checkdigit_1.HashidOidFactory();
const tildeFactory = new tilde_1.TildeOidFactory();
const modernOidFactory = new plain_1.ModernOidFactory();
exports.OidFactoryMapByScope = new Map();
for (const scopeName of Object.keys(tilde_1.TildeScopeNames)) {
    exports.OidFactoryMapByScope.set(scopeName, tildeFactory);
}
for (const scopeName of Object.keys(checkdigit_1.HashidScopeNames)) {
    exports.OidFactoryMapByScope.set(scopeName, hashidFactory);
}
for (const scopeName of Object.keys(plain_1.OidScopeNames)) {
    exports.OidFactoryMapByScope.set(scopeName, modernOidFactory);
}
//# sourceMappingURL=scope-to-factory.lookup.js.map