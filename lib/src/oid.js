"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scope_registry_1 = require("./implementations/scope-registry");
const scope_to_factory_lookup_1 = require("./implementations/scope-to-factory.lookup");
const plain_1 = require("./implementations/plain");
const tilde_1 = require("./implementations/tilde");
function fromBase64(source) {
    return Buffer.from(source, 'base64').toString('ascii');
}
class Oid2 {
    constructor(oid) {
        this.oid = oid;
    }
    static RegisterScope(scope, shortcode) {
        return Oid2.registry.register(scope, shortcode);
    }
    static getFactoryByScopename(scopename) {
        const factory = scope_to_factory_lookup_1.OidFactoryMapByScope.get(scopename) || new plain_1.PlainOidFactory();
        if (!factory) {
            throw new Error('Scope has no corresponding factory. Do you want to create a HashidOid, TildeOid, or ModernOid? (You want the last one).');
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
        const factory = Oid2.getFactoryByScopename(scopename);
        return factory.create(scopename, id);
    }
    unwrap() {
        const factory = Oid2.getFactoryByEncoded(this.oid);
        return factory.unwrap(this);
    }
    static unregisterScopes() {
        Oid2.registry.resetRegistery();
    }
}
exports.Oid2 = Oid2;
Oid2.registry = scope_registry_1.scopeRegistry;
Oid2.RegisterScope('BankAccount');
Oid2.RegisterScope('PurchaseOrder', 'po');
Oid2.RegisterScope('Workflow', 'wf');
//# sourceMappingURL=oid.js.map