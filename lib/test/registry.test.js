"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const registry_1 = require("./../src/registry");
const scopes_1 = require("./../src/implementations/scopes");
const all_scopes = [
    ...Object.keys(scopes_1.AlphaHashidScopes),
    ...Object.keys(scopes_1.NoCheckdigitArbiterScopes),
    ...Object.keys(scopes_1.TildeScopeNames),
    ...Object.keys(scopes_1.CheckdigitScopes)
];
test.each(all_scopes)('Declared scope %s is registered', declared_scope => {
    expect(Reflect.get(registry_1.Registry, declared_scope)).toBeTruthy();
});
//# sourceMappingURL=registry.test.js.map