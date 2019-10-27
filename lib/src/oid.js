"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkdigit_factory_1 = require("./implementations/checkdigit/checkdigit.factory");
const scope_registry_1 = require("./implementations/scope-registry");
const scope_to_factory_lookup_1 = require("./implementations/scope-to-factory.lookup");
const tilde_1 = require("./implementations/tilde");
function fromBase64(source) {
    return Buffer.from(source, 'base64').toString('ascii');
}
class Oid {
    constructor(oid) {
        this.oid = oid;
    }
    // Overide Object.valueOf so that the GraphQL ID type can convert to the 'primitive' type. In this case a
    // string.
    valueOf() {
        return this.oid;
    }
    toString() {
        return this.oid;
    }
    static RegisterScope(scope, shortcode) {
        return Oid.registry.register(scope, shortcode);
    }
    static getFactoryByScopename(scopename) {
        const factory = scope_to_factory_lookup_1.OidFactoryMapByScope.get(scopename) || new checkdigit_factory_1.CheckdigitOidFactory();
        if (!factory) {
            throw new Error('Scope has no corresponding factory.');
        }
        return factory;
    }
    static getFactoryByEncoded(external_oid) {
        if (external_oid[0] === `~`) {
            return new tilde_1.TildeOidFactory();
        }
        const matches = scope_registry_1.ScopeRegistry.hashIdRegEx.exec(external_oid);
        if (!matches || (matches && matches.length !== 3)) {
            try {
                const { key } = JSON.parse(fromBase64(external_oid));
                return this.getFactoryByScopename(scope_registry_1.ScopeRegistry.getScopename(key));
            }
            catch (e) {
                throw new Error(`Malformed oid format: ${external_oid}`);
            }
        }
        const [, prefix] = matches;
        const scope = scope_registry_1.ScopeRegistry.getScopename(prefix);
        return this.getFactoryByScopename(scope);
    }
    static create(scopename, id) {
        const factory = Oid.getFactoryByScopename(scopename);
        return factory.create(scopename, id);
    }
    unwrap() {
        const factory = Oid.getFactoryByEncoded(this.oid);
        return factory.unwrap(this);
    }
    static unregisterScopes() {
        Oid.registry.resetRegistery();
    }
}
exports.Oid = Oid;
Oid.registry = scope_registry_1.scopeRegistry;
Oid.RegisterScope('BankAccount');
Oid.RegisterScope('PurchaseOrder', 'po');
Oid.RegisterScope('Workflow', 'wf');
//# sourceMappingURL=oid.js.map