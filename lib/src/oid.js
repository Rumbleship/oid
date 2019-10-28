"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkdigit_factory_1 = require("./implementations/checkdigit/checkdigit.factory");
const scope_registry_1 = require("./implementations/scope-registry");
const scope_to_factory_lookup_1 = require("./implementations/scope-to-factory.lookup");
const tilde_1 = require("./implementations/tilde");
const errors_1 = require("./errors");
function fromBase64(source) {
    return Buffer.from(source, 'base64').toString('ascii');
}
class Oid {
    constructor(oid) {
        this.oid = oid;
        this.factory = Oid.GetFactoryByEncoded(oid);
        const { id, scope } = this.factory.unwrap(this);
        this.id = id;
        this.scope = scope;
    }
    static RegisterScope(scope, shortcode) {
        return Oid.registry.register(scope, shortcode);
    }
    static UnregisterScopes() {
        Oid.registry.resetRegistery();
    }
    static GetFactoryByScopename(scopename) {
        const factory = scope_to_factory_lookup_1.OidFactoryMapByScope.get(scopename) || new checkdigit_factory_1.CheckdigitOidFactory();
        return factory;
    }
    static GetFactoryByEncoded(external_oid) {
        if (external_oid[0] === `~`) {
            return new tilde_1.TildeOidFactory();
        }
        const matches = scope_registry_1.ScopeRegistry.hashIdRegEx.exec(external_oid);
        if (!matches || (matches && matches.length !== 3)) {
            try {
                const { key } = JSON.parse(fromBase64(external_oid));
                return this.GetFactoryByScopename(scope_registry_1.ScopeRegistry.GetScopename(key));
            }
            catch (e) {
                throw new errors_1.MalformedOidError(`Malformed tilde oid format: ${external_oid}`);
            }
        }
        const [, prefix] = matches;
        const scope = scope_registry_1.ScopeRegistry.GetScopename(prefix);
        return this.GetFactoryByScopename(scope);
    }
    static Create(scopename, id) {
        const factory = Oid.GetFactoryByScopename(scopename);
        const oid = factory.create(scopename, id);
        return oid;
    }
    unwrap() {
        return { id: this.id, scope: this.scope };
    }
    // Overide Object.valueOf so that the GraphQL ID type can convert to the 'primitive' type. In this case a
    // string.
    valueOf() {
        return this.oid;
    }
    toString() {
        return this.oid;
    }
}
exports.Oid = Oid;
Oid.registry = scope_registry_1.scopeRegistry;
Oid.RegisterScope('BankAccount');
Oid.RegisterScope('PurchaseOrder', 'po');
Oid.RegisterScope('Workflow', 'wf');
//# sourceMappingURL=oid.js.map