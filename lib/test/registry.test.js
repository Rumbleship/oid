"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const registry_1 = require("./../src/registry");
const scopes_enum_1 = require("../src/implementations/scopes.enum");
const all_scopes_names = [
    ...Object.keys(scopes_enum_1.AlphaHashidScopes),
    ...Object.keys(scopes_enum_1.BankingScopeNames),
    ...Object.keys(scopes_enum_1.CheckdigitScopes)
];
test.each(all_scopes_names)('Declared scope %s is registered', declared_scope => {
    expect(Reflect.get(registry_1.Registry, declared_scope)).toBeTruthy();
});
test.each(Object.keys(registry_1.Registry))('Registered scope %s is declared', registered_scope_name => {
    expect(all_scopes_names.find(scope_name => scope_name === registered_scope_name)).toBeTruthy();
});
//# sourceMappingURL=registry.test.js.map